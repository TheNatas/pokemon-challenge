import { Request, Response } from "express";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { GetPokemonsUseCase } from "../use-cases/getPokemons.useCase";
import { connection } from "../db";

export const getPokemonsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const pokemons = await new GetPokemonsUseCase(
      new PokemonRepository(connection)
    ).execute();

    res.status(200).json(pokemons);

    return pokemons;
  } catch (error) {
    console.error("Error retrieving pokemons:", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
}