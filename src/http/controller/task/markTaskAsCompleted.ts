import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../../db/prisma/prisma';

const markCompletedParamValidation = z.object({
  id: z.string(),
});
export async function markTaskAsCompleted(
  req: FastifyRequest,
  rep: FastifyReply
) {
  const { id } = markCompletedParamValidation.parse(req.params);
  try {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return rep.status(400).send({
        message: 'Task not found',
      });
    }

    if (!task.completed_at) {
      await prisma.task.update({
        where: { id },
        data: { completed_at: new Date() },
      });

      return rep.status(200).send({
        message: 'Task completed',
      });
    }
    return rep.status(400).send({
      message: 'Task already completed',
    });
  } catch (error) {
    return rep.status(500).send({
      message: 'It was not possible to complete the task',
    });
  }
}
