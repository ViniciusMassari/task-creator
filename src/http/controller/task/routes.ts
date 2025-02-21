import { FastifyInstance } from 'fastify';
import { createTask } from './createTask';
import { getTasks } from './getTasks';
import { updateTask } from './updateTask';
import { deleteTask } from './deleteTask';
import { markTaskAsCompleted } from './markTaskAsCompleted';
import { uploadTasks } from './uploadTasks';

export async function taskRoutes(app: FastifyInstance) {
  app.get('/tasks', getTasks);
  app.post('/tasks', createTask);
  app.put('/tasks/:id', updateTask);
  app.delete('/tasks/:id', deleteTask);
  app.patch('/tasks/:id/complete', markTaskAsCompleted);
  app.post('/tasks/upload', uploadTasks);
}
