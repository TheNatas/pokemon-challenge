import { PokemonDto } from "../dtos/Pokemon.dto";
import { DuplicateIdError } from "../errors/duplicateId.error";
import { PokemonRepository } from "../repositories/pokemon.repository";

export class BattleOfPokemonsUseCase {
  constructor(
    private readonly pokemonRepository : PokemonRepository
  ) {}

  async execute(
    pokemonAId: number,
    pokemonBId: number
  ) {
    if (!pokemonAId) {
      throw new Error('Pokemon A ID is required');
    }
    if (!pokemonBId) {
      throw new Error('Pokemon B ID is required');
    }

    if (pokemonAId === pokemonBId) {
      console.log(`Both Pokemons have the same ID: ${pokemonAId}`);
      throw new DuplicateIdError(pokemonAId);
    }

    const pokemonA = await this.pokemonRepository.findById(pokemonAId);
    if (!pokemonA) {
      throw new Error(`Pokemon A with ID ${pokemonAId} not found`);
    }
    const pokemonB = await this.pokemonRepository.findById(pokemonBId);
    if (!pokemonB) {
      throw new Error(`Pokemon B with ID ${pokemonBId} not found`);
    }

    const sumOfPokemonsLevels = pokemonA.nivel + pokemonB.nivel;
    const randomResult = Math.random() * sumOfPokemonsLevels;

    const [winner, loser] = randomResult < pokemonA.nivel ? [pokemonA, pokemonB] : [pokemonB, pokemonA];

    const newWinnerLevel = winner.nivel + 1;
    const newLoserLevel = loser.nivel - 1;

    await this.pokemonRepository.update(
      winner.id!,
      [{ key: 'nivel', value: newWinnerLevel }]
    );
    if (newLoserLevel > 0) {
      await this.pokemonRepository.update(
        loser.id!,
        [{ key: 'nivel', value: newLoserLevel }]
      );
    } else {
      await this.pokemonRepository.delete(loser.id!);
    }

    return {
      vencedor: { ...winner, nivel: newWinnerLevel } as PokemonDto,
      perdedor: { ...loser, nivel: newLoserLevel } as PokemonDto
    }
  }
}