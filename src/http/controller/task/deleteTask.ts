import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../../db/prisma/prisma';
const deleteParamValidation = z.object({
  id: z.string(),
});
export async function deleteTask(req: FastifyRequest, rep: FastifyReply) {
  const { id } = deleteParamValidation.parse(req.params);
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      return rep.status(400).send({
        message: 'Task not found',
      });
    }

    await prisma.task.delete({ where: { id } });
    return rep.status(200).send({
      message: 'Task deleted',
    });
  } catch (error) {
    return rep.status(500).send({
      message: 'It was not possible to delete the task',
    });
  }
}
