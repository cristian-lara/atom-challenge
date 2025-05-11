import axios from 'axios';
import { Task } from '@atom-challenge/shared';

describe('Tasks API', () => {
  let createdTaskId: string;
  const testTask = {
    title: 'Test Task',
    description: 'This is a test task for e2e testing'
  };

  // Limpiar datos después de las pruebas
  afterAll(async () => {
    if (createdTaskId) {
      try {
        await axios.delete(`/api/tasks/${createdTaskId}`);
      } catch (error) {
        console.error('Error cleaning up test task:', error);
      }
    }
  });

  describe('GET /api/tasks', () => {
    it('should return an array of tasks', async () => {
      const response = await axios.get('/api/tasks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await axios.post('/api/tasks', testTask);
      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        id: expect.any(String),
        title: testTask.title,
        description: testTask.description,
        completed: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      });
      createdTaskId = response.data.id;
    });

    it('should validate required fields', async () => {
      try {
        await axios.post('/api/tasks', {});
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('errors');
      }
    });

    it('should validate field lengths', async () => {
      try {
        await axios.post('/api/tasks', {
          title: 'ab', // demasiado corto
          description: 'short' // demasiado corto
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('errors');
      }
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a task by id', async () => {
      const response = await axios.get(`/api/tasks/${createdTaskId}`);
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        id: createdTaskId,
        title: testTask.title,
        description: testTask.description
      });
    });

    it('should return 404 for non-existent task', async () => {
      try {
        await axios.get('/api/tasks/non-existent-id');
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', async () => {
      const updates = {
        title: 'Updated Task',
        description: 'This task has been updated',
        completed: true
      };

      const response = await axios.put(`/api/tasks/${createdTaskId}`, updates);
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        id: createdTaskId,
        ...updates
      });
    });

    it('should validate updates', async () => {
      try {
        await axios.put(`/api/tasks/${createdTaskId}`, {
          title: 'ab' // demasiado corto
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('errors');
      }
    });

    it('should return 404 for non-existent task', async () => {
      try {
        await axios.put('/api/tasks/non-existent-id', { title: 'New Title' });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const response = await axios.delete(`/api/tasks/${createdTaskId}`);
      expect(response.status).toBe(204);
      
      // Verificar que la tarea ya no existe
      try {
        await axios.get(`/api/tasks/${createdTaskId}`);
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });

    it('should return 404 for non-existent task', async () => {
      try {
        await axios.delete('/api/tasks/non-existent-id');
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });
}); 