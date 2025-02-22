import { FastifyInstance } from 'fastify';
import { createTask } from './createTask';
import { getTasks } from './getTasks';
import { updateTask } from './updateTask';
import { deleteTask } from './deleteTask';
import { markTaskAsCompleted } from './markTaskAsCompleted';
import { uploadTasks } from './uploadTasks';

export async function taskRoutes(app: FastifyInstance) {
  app.get(
    '/tasks',
    {
      schema: {
        description: 'Get all tasks saved in database',
        tags: ['task'],
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              completed_at: { type: 'string', format: 'date-time' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
    getTasks
  );
  app.post(
    '/tasks',
    {
      schema: {
        description: 'Save a new task in database',
        tags: ['task'],
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Unsuccessful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    createTask
  );
  app.put(
    '/tasks/:id',
    {
      schema: {
        description: 'Update a task in database',
        tags: ['task'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Task Id to identify a specific task in database',
            },
          },
        },
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Task not found response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Unsuccessful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    updateTask
  );
  app.delete(
    '/tasks/:id',
    {
      schema: {
        description: 'delete a task in database',
        tags: ['task'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Task Id to identify a specific task in database',
            },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Task not found response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Unsuccessful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteTask
  );
  app.patch(
    '/tasks/:id/complete',
    {
      schema: {
        description: 'Mark a task as completed in database',
        tags: ['task'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Task Id to identify a specific task in database',
            },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Task not found response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Unsuccessful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    markTaskAsCompleted
  );
  app.post(
    '/tasks/upload',
    {
      schema: {
        description: 'Upload a csv of tasks to database',
        tags: ['task'],
        body: {
          type: 'string',
          format: 'binary',
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Task not found response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Unsuccessful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    uploadTasks
  );
}
