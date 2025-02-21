import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../../db/prisma/prisma';

const taskValidation = z.object({
  title: z.string({
    required_error: 'A title is required',
    invalid_type_error: 'Title should be a string',
    message: 'Invalid Title',
  }),
  description: z.string({
    required_error: 'A description is required',
    invalid_type_error: 'Description should be a string',
    message: 'Invalid Description',
  }),
});

export async function createTask(req: FastifyRequest, rep: FastifyReply) {
  const { description, title } = taskValidation.parse(req.body);

  try {
    await prisma.task.create({ data: { title, description } });
    rep.status(201).send({
      message: 'Task created',
    });
  } catch (error) {
    rep.status(500).send({
      message: 'It was not possible to create a new task',
    });
  }
}
