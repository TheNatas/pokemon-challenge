import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";

export class GetPokemonsUseCase {
  constructor(
    private readonly pokemonRepository : PokemonRepository
  ) {}

  async execute() : Promise<PokemonDto[]> {
    const dbResponse = await this.pokemonRepository.findAll();

    if (!dbResponse) {
      throw new Error('Pokemon not found');
    }

    return dbResponse.map(pokemon => ({
      id: pokemon.id,
      tipo: pokemon.tipo,
      treinador: pokemon.treinador,
      nivel: pokemon.nivel,
    }));
  }
}