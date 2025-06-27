import { Request, Response } from "express";
import { PokemonDto } from "../dtos/Pokemon.dto";
import { CreatePokemonUseCase } from "../use-cases/createPokemon.useCase";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { getConnection } from "../db";

export const createPokemonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const pokemonDto = req.body as PokemonDto;

    const connection = await getConnection();

    const response = await new CreatePokemonUseCase(
      new PokemonRepository(connection)
    ).execute(pokemonDto);

    connection.commit();

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}