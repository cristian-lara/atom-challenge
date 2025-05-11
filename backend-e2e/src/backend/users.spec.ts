import axios from 'axios';

describe('Users API', () => {
  const testUser = {
    email: `test-${Date.now()}@example.com`
  };

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await axios.post('/api/users', testUser);
      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        email: testUser.email,
        createdAt: expect.any(String),
        role: 'user',
        active: true
      });
    });

    it('should return existing user if email already exists', async () => {
      // Primera creación
      const firstResponse = await axios.post('/api/users', testUser);
      expect(firstResponse.status).toBe(201);

      // Segunda creación con el mismo email
      const secondResponse = await axios.post('/api/users', testUser);
      expect(secondResponse.status).toBe(200);
      expect(secondResponse.data.email).toBe(testUser.email);
    });

    it('should validate email format', async () => {
      try {
        await axios.post('/api/users', { email: 'invalid-email' });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('errors');
      }
    });

    it('should require email field', async () => {
      try {
        await axios.post('/api/users', {});
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('errors');
      }
    });
  });

  describe('GET /api/users/:email', () => {
    it('should return a user by email', async () => {
      // Primero creamos el usuario
      await axios.post('/api/users', testUser);

      // Luego lo buscamos
      const response = await axios.get(`/api/users/${testUser.email}`);
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        email: testUser.email,
        createdAt: expect.any(String),
        role: 'user',
        active: true
      });
    });

    it('should return 404 for non-existent user', async () => {
      try {
        await axios.get('/api/users/non-existent@example.com');
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });

    it('should validate email format in URL', async () => {
      try {
        await axios.get('/api/users/invalid-email');
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });
  });
}); 