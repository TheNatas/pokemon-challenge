import { Request, Response } from "express";
import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { UpdatePokemonUseCase } from "../use-cases/updatePokemon.useCase";
import { BattleOfPokemonsUseCase } from "../use-cases/battleOfPokemons.useCase";
import { DuplicateIdError } from "../errors/duplicateId.error";
import { connection } from "../db";

export const battleOfPokemonsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const pokemonAId = parseInt(req.params.pokemonAId);
    const pokemonBId = parseInt(req.params.pokemonBId);

    const result = await new BattleOfPokemonsUseCase(
      new PokemonRepository(connection)
    ).execute(pokemonAId, pokemonBId);

    res.status(200).json(result);
  } catch (error: DuplicateIdError | any) {
    if (error instanceof DuplicateIdError) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(404).json({ error: "Internal Server Error" });
    }
  }
}