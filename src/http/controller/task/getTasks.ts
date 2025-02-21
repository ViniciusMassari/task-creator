import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../db/prisma/prisma';

export async function getTasks(req: FastifyRequest, rep: FastifyReply) {
  try {
    const tasks = await prisma.task.findMany();
    return rep.status(200).send(tasks);
  } catch (error) {
    return rep.status(400).send({
      message: 'It was not possible to retrieve tasks',
    });
  }
}
