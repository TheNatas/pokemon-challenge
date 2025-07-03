import { PokemonDto } from "../dtos/Pokemon.dto";
import { Pokemon } from "../entities/Pokemon";
import { PokemonRepository } from "../repositories/pokemon.repository";

export class CreatePokemonUseCase {
  constructor(
    private readonly pokemonRepository : PokemonRepository
  ) {}

  async execute(
    pokemonDto: PokemonDto
  ) {
    // Validate the input data
    if (!pokemonDto.tipo) {
      throw new Error('Tipo is required');
    }
    if (!pokemonDto.treinador) {
      throw new Error('Treinador is required');
    }

    // Create a new Pokemon using the repository
    const dbResponse : Pokemon = await this.pokemonRepository.create(
      Pokemon.createNew(pokemonDto.tipo, pokemonDto.treinador)
    );

    const newPokemon = dbResponse ? await this.pokemonRepository.findById(
      dbResponse?.id!
    ) : null;
    
    // Return the created Pokemon
    return newPokemon;
  }
}