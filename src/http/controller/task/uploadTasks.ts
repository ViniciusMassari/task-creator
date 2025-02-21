import { FastifyReply, FastifyRequest } from 'fastify';
import { parse } from '@fast-csv/parse';
import { prisma } from '../../../db/prisma/prisma';
import { Readable } from 'stream';

export async function uploadTasks(req: FastifyRequest, rep: FastifyReply) {
  try {
    // @ts-ignore
    const stream = Readable.from(req.body);
    const tasks: Promise<any>[] = [];

    stream
      .pipe(parse({ headers: true }))
      .on('data', (row: { title: string; description: string }) => {
        tasks.push(prisma.task.create({ data: row }));
      })
      .on('end', async () => {
        await Promise.all(tasks); // Aguarda todas as inserções
      })
      .on('error', (error) => {
        throw new Error('Error during tasks upload');
      });

    rep.status(201).send({ message: 'Tasks created' });
  } catch (error) {
    console.error('Erro inesperado:', error);
    if (!rep.sent)
      return rep
        .status(500)
        .send({ message: 'Erro inesperado ao processar requisição' });
  }
}
