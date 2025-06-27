import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";

export class DeletePokemonUseCase {
  constructor(
    private readonly pokemonRepository : PokemonRepository
  ) {}

  async execute(
    id: number,
  ) {
    if (!id) {
      throw new Error('ID is required');
    }

    await this.pokemonRepository.delete(
      id
    );
  }
}