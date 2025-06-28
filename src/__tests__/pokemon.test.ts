// tests/pokemon.integration.test.ts

import request from 'supertest';
import { Server } from 'http'; 
import { app } from '..';

interface Pokemon {
  id: number;
  tipo: 'pikachu' | 'charizard' | 'mewtwo';
  treinador: string;
  nivel: number;
}

describe('API de Pokémons - Testes de Integração (TypeScript)', () => {
  let server: Server;
  let pokemonCriadoId: number;

  beforeAll((done) => {
    server = app.listen(4001, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  // =================================================================
  // SUÍTE DE TESTES PARA O CRUD (/pokemons)
  // =================================================================
  describe('Endpoints do CRUD - /pokemons', () => {
    it('POST /pokemons - Deve criar um novo Pokémon com sucesso', async () => {
      const novoPokemon = {
        tipo: 'pikachu',
        treinador: 'Ash',
      };

      const response = await request(server)
        .post('/pokemons')
        .send(novoPokemon);

      const pokemonRetornado: Pokemon = response.body;

      expect(response.status).toBe(201);
      expect(pokemonRetornado.id).toBeDefined();
      expect(pokemonRetornado.tipo).toBe(novoPokemon.tipo);
      expect(pokemonRetornado.treinador).toBe(novoPokemon.treinador);
      expect(pokemonRetornado.nivel).toBe(1);

      pokemonCriadoId = pokemonRetornado.id;
    });

    it('POST /pokemons - Deve retornar erro 400 ao tentar criar um Pokémon com tipo inválido', async () => {
      const response = await request(server)
        .post('/pokemons')
        .send({ tipo: 'bulbasaur', treinador: 'Misty' });

      expect(response.status).toBe(400);
    });

    it('POST /pokemons - Deve retornar erro 400 se faltar o campo "treinador"', async () => {
        const response = await request(server)
          .post('/pokemons')
          .send({ tipo: 'charizard' });
  
        expect(response.status).toBe(400);
      });

    it('GET /pokemons - Deve listar todos os Pokémons', async () => {
      // Cria um segundo pokémon para garantir que a lista tenha mais de um item
      await request(server)
        .post('/pokemons')
        .send({ tipo: 'charizard', treinador: 'Red' });
      
      const response = await request(server).get('/pokemons');
      const listaPokemons: Pokemon[] = response.body;

      expect(response.status).toBe(200);
      expect(Array.isArray(listaPokemons)).toBe(true);
      expect(listaPokemons.length).toBeGreaterThanOrEqual(2);
      expect(listaPokemons[0]).toHaveProperty('id');
    });

    it('GET /pokemons/:id - Deve carregar um Pokémon específico', async () => {
      const response = await request(server).get(`/pokemons/${pokemonCriadoId}`);
      const pokemonRetornado: Pokemon = response.body;

      expect(response.status).toBe(200);
      expect(pokemonRetornado.id).toBe(pokemonCriadoId);
      expect(pokemonRetornado.tipo).toBe('pikachu');
    });

    it('GET /pokemons/:id - Deve retornar erro 404 para um ID inexistente', async () => {
      const response = await request(server).get('/pokemons/99999');
      expect(response.status).toBe(404);
    });

    it('PUT /pokemons/:id - Deve alterar o treinador de um Pokémon', async () => {
      const novoTreinador = { treinador: 'Thiago' };

      const responsePut = await request(server)
        .put(`/pokemons/${pokemonCriadoId}`)
        .send(novoTreinador);

      expect(responsePut.status).toBe(204);

      // Verifica se a alteração foi realmente salva
      const responseGet = await request(server).get(`/pokemons/${pokemonCriadoId}`);
      expect(responseGet.body.treinador).toBe(novoTreinador.treinador);
    });

    it('PUT /pokemons/:id - Deve ignorar outras propriedades além de "treinador"', async () => {
      const dadosUpdate = { treinador: 'Brock', nivel: 100 }; // Tenta mudar o nível

      await request(server).put(`/pokemons/${pokemonCriadoId}`).send(dadosUpdate);
      
      const responseGet = await request(server).get(`/pokemons/${pokemonCriadoId}`);
      const pokemonAtualizado: Pokemon = responseGet.body;

      expect(pokemonAtualizado.treinador).toBe('Brock');
      expect(pokemonAtualizado.nivel).not.toBe(100);
    });

    it('DELETE /pokemons/:id - Deve deletar um Pokémon', async () => {
        // Cria um pokemon temporário para ser deletado
        const pokemonParaDeletarRes = await request(server)
            .post('/pokemons')
            .send({ tipo: 'mewtwo', treinador: 'Gary' });
        
        const idParaDeletar = pokemonParaDeletarRes.body.id;

        const responseDelete = await request(server).delete(`/pokemons/${idParaDeletar}`);
        expect(responseDelete.status).toBe(204);

        // Tenta buscar o Pokémon deletado e espera um erro 404
        const responseGet = await request(server).get(`/pokemons/${idParaDeletar}`);
        expect(responseGet.status).toBe(404);
    });
  });

  // =================================================================
  // SUÍTE DE TESTES PARA A BATALHA (/batalhar)
  // =================================================================
  describe('Endpoint de Batalha - /batalhar', () => {
    let pokemonAId: number;
    let pokemonBId: number;

    // Cria dois pokémons novos para a batalha antes de cada teste desta suíte
    beforeEach(async () => {
        const resA = await request(server).post('/pokemons').send({ tipo: 'pikachu', treinador: 'PlayerA' });
        const resB = await request(server).post('/pokemons').send({ tipo: 'mewtwo', treinador: 'PlayerB' });
        pokemonAId = resA.body.id;
        pokemonBId = resB.body.id;
    });

    it('POST /batalhar/:pokemonAId/:pokemonBId - Deve executar uma batalha e deletar o perdedor', async () => {
      const response = await request(server).post(`/batalhar/${pokemonAId}/${pokemonBId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('vencedor');
      expect(response.body).toHaveProperty('perdedor');

      const { vencedor, perdedor }: { vencedor: Pokemon, perdedor: Pokemon } = response.body;
      
      // Valida a lógica de níveis
      expect(vencedor.nivel).toBe(2); // Vencedor sobe de 1 para 2
      expect(perdedor.nivel).toBe(0); // Perdedor desce de 1 para 0

      // Verifica se os níveis foram atualizados no banco (ou no que sobrou)
      const resVencedor = await request(server).get(`/pokemons/${vencedor.id}`);
      expect(resVencedor.body.nivel).toBe(2);

      // Verifica se o perdedor foi deletado da base
      const resPerdedor = await request(server).get(`/pokemons/${perdedor.id}`);
      expect(resPerdedor.status).toBe(404);
    });

    it('POST /batalhar - Deve retornar 404 se um dos pokémons não existir', async () => {
        const response = await request(server).post(`/batalhar/${pokemonAId}/99999`);
        expect(response.status).toBe(404);
    });

    it('POST /batalhar - Deve retornar 400 se os IDs forem iguais', async () => {
        const response = await request(server).post(`/batalhar/${pokemonAId}/${pokemonAId}`);
        expect(response.status).toBe(400);
    });
  });
});