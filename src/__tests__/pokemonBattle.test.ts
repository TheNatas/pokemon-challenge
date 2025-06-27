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

test('POST /batalhar should calculate result, update levels and return winner/loser', async () => {
  const connection = await getConnection();
  await connection.query('INSERT INTO pokemon (id, tipo, treinador, nivel) VALUES (?, ?, ?, ?)', [1, 'pikachu', 'carlos', 1]);
  await connection.query('INSERT INTO pokemon (id, tipo, treinador, nivel) VALUES (?, ?, ?, ?)', [2, 'charizard', 'natanael', 999]);
  const res = await request(app).post('/batalhar/1/2').send();
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('vencedor');
  expect(res.body.vencedor.nivel).toBe(1000);
  expect(res.body).toHaveProperty('perdedor');
  expect(res.body.vencedor.nivel).toBe(0);
});

test('POST /batalhar should delete loser if its level gets to 0', async () => {
  const connection = await getConnection();
  const [result] = await connection.query('SELECT 1 FROM pokemon WHERE id = 1');
  expect(result).toHaveLength(0);
});
