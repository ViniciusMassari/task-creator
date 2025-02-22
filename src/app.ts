// ESM
import Fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { taskRoutes } from './http/controller/task/routes';
import { fromError } from 'zod-validation-error';
import multipart from '@fastify/multipart';
import { parse } from '@fast-csv/parse';

import fastifySwagger from '@fastify/swagger';
import fastifyUi from '@fastify/swagger-ui';

export const app = Fastify({
  logger: true,
});

app.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [{ name: 'task', description: 'Task related end-points' }],
  },
});

app.register(fastifyUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
app.register(taskRoutes);

const stream = parse({ headers: true });

app.addContentTypeParser('*', function (_, payload, done) {
  stream
    .on('data', (row) => console.log(row))
    .on('end', (count: number) => done(null, count));

  payload.on('data', (chunk) => done(null, chunk));
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    const validationError = fromError(error);
    return reply.status(400).send({
      message: 'Validation error.',
      issues: validationError.toString(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    //  log to an external tool
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
