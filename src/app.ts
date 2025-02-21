// ESM
import Fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { taskRoutes } from './http/controller/task/routes';
import { fromError } from 'zod-validation-error';
import multipart from '@fastify/multipart';
import multer from 'fastify-multer';
import { parse } from '@fast-csv/parse';

export const app = Fastify({
  logger: true,
});

app.register(multipart);
app.register(taskRoutes);

const stream = parse({ headers: true });

app.addContentTypeParser('*', function (request, payload, done) {
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
