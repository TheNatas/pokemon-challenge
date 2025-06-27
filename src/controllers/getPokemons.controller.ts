import { Request, Response } from "express";
import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { getConnection } from "../db";
import { UpdatePokemonUseCase } from "../use-cases/updatePokemon.useCase";
import { DeletePokemonUseCase } from "../use-cases/deletePokemon.useCase";
import { GetPokemonUseCase } from "../use-cases/getPokemon.useCase";
import { GetPokemonsUseCase } from "../use-cases/getPokemons.useCase";

export const getPokemonsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const connection = await getConnection();

    const pokemons = await new GetPokemonsUseCase(
      new PokemonRepository(connection)
    ).execute();

    res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error getting Pokemons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}