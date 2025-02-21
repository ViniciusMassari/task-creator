import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../../db/prisma/prisma';
import { Prisma } from '@prisma/client';
const updateParamValidation = z.object({
  id: z.string(),
});

const updateBodyValidation = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
});
export async function updateTask(req: FastifyRequest, rep: FastifyReply) {
  const { id } = updateParamValidation.parse(req.params);
  const body = updateBodyValidation.parse(req.body);

  const updateBody = Object.fromEntries(
    Object.entries(body).filter(([_, value]) => {
      return value !== null;
    })
  );
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      return rep.status(400).send({
        message: 'Task not found',
      });
    }

    await prisma.task.update({
      where: {
        id,
      },
      data: updateBody,
    });
    return rep.status(200).send({
      message: 'Task updated',
    });
  } catch (error) {
    return rep.status(500).send({
      message: 'It was not possible to delete the task',
    });
  }
}
