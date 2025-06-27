import request from 'supertest';
import { getConnection } from '../db';
import { app } from '..';

beforeAll(async () => {
  const connection = await getConnection();
  await connection.query(`CREATE TABLE IF NOT EXISTS pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255),
    treinador VARCHAR(255),
    nivel INT
  )`);
});

beforeEach(async () => {
  const connection = await getConnection();
  await connection.query('DELETE FROM pokemon');
});

test('POST /pokemons should insert a record', async () => {
  const res = await request(app).post('/pokemons').send({ tipo: 'charizard', treinador: 'ash' });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body.nivel).toBe(1);
});

test('POST /pokemons should not insert a record', async () => {
  const res = await request(app).post('/pokemons').send({ tipo: 'charmander', treinador: 'ash' });
  expect(res.status).toBe(500);
});

test('GET /pokemons should return all records', async () => {
  const connection = await getConnection();
  await connection.query('INSERT INTO pokemon (tipo, treinador, nivel) VALUES (?, ?, ?)', ['pikachu', 'carlos', 1]);

  const res = await request(app).get('/pokemons');
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0]).toHaveProperty('id');
  expect(res.body[0].tipo).toBe('pikachu');
});
