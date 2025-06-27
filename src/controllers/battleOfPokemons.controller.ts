import { Request, Response } from "express";
import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { getConnection } from "../db";
import { UpdatePokemonUseCase } from "../use-cases/updatePokemon.useCase";
import { BattleOfPokemonsUseCase } from "../use-cases/battleOfPokemons.useCase";

export const battleOfPokemonsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const pokemonAId = parseInt(req.params.pokemonAId);
    const pokemonBId = parseInt(req.params.pokemonBId);

    const connection = await getConnection();

    const result = await new BattleOfPokemonsUseCase(
      new PokemonRepository(connection)
    ).execute(pokemonAId, pokemonBId);

    connection.commit();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error on battle between pokemons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}