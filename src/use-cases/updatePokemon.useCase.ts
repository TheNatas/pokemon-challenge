import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";

export class UpdatePokemonUseCase {
  constructor(
    private readonly pokemonRepository : PokemonRepository
  ) {}

  async execute(
    pokemonDto: PokemonDto
  ) {
    if (!pokemonDto.id) {
      throw new Error('ID is required');
    }
    if (!pokemonDto.treinador) {
      throw new Error('Treinador is required');
    }

    await this.pokemonRepository.update(
      pokemonDto.id,
      [{ key: 'treinador', value: pokemonDto.treinador }]
    );
  }
}