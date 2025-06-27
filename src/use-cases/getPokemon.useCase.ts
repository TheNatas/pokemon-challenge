import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";

export class GetPokemonUseCase {
  constructor(
    private readonly pokemonRepository : PokemonRepository
  ) {}

  async execute(
    id: number,
  ) : Promise<PokemonDto> {
    if (!id) {
      throw new Error('ID is required');
    }

    const dbResponse = await this.pokemonRepository.findById(
      id
    );

    if (!dbResponse) {
      throw new Error('Pokemon not found');
    }

    return {
      id: dbResponse.id,
      tipo: dbResponse.tipo,
      treinador: dbResponse.treinador,
      nivel: dbResponse.nivel,
    };
  }
}