const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');
const Todo = require('../models/Todo');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
    await Todo.deleteMany(); // Clean up the database between tests
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Todo API Tests', () => {
    test('GET /api/todos - should return an empty list initially', async () => {
        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body.headers.responseCode).toBe(200);
        expect(res.body.body).toEqual([]);
    });

    test('POST /api/todos - should create a new todo', async () => {
        const newTodo = { title: 'Learn Testing' };
        const res = await request(app).post('/api/todos').send(newTodo);
        expect(res.statusCode).toBe(201);
        expect(res.body.headers.responseCode).toBe(201);
        expect(res.body.body).toMatchObject({
            title: 'Learn Testing',
            completed: false,
        });
    });

    test('POST /api/todos - should fail when title is missing', async () => {
        const res = await request(app).post('/api/todos').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.headers.responseCode).toBe(400);
        expect(res.body.body.errors.title).toBe('Title is required and must be a string.');
    });

    test('PUT /api/todos/:id - should update an existing todo', async () => {
        const todo = await Todo.create({ title: 'Test Todo' });
        const updatedData = { title: 'Updated Test Todo', completed: true };

        const res = await request(app).put(`/api/todos/${todo.id}`).send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.headers.responseCode).toBe(200);
        expect(res.body.body).toMatchObject(updatedData);
    });

    test('PUT /api/todos/:id - should return 404 if todo not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).put(`/api/todos/${nonExistentId}`).send({ title: 'Test' });
        expect(res.statusCode).toBe(404);
        expect(res.body.headers.responseCode).toBe(404);
        expect(res.body.body).toEqual({});
    });

    test('DELETE /api/todos/:id - should delete an existing todo', async () => {
        const todo = await Todo.create({ title: 'Test Todo' });
        const res = await request(app).delete(`/api/todos/${todo.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.headers.responseCode).toBe(200);
        expect(res.body.body).toMatchObject({
            id: todo.id,
            title: 'Test Todo',
            completed: false,
        });
    });

    test('DELETE /api/todos/:id - should return 404 if todo not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).delete(`/api/todos/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.headers.responseCode).toBe(404);
        expect(res.body.body).toEqual({});
    });
});
