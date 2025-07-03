import { Request, Response } from "express";
import { PokemonDto } from "../dtos/Pokemon.dto";
import { CreatePokemonUseCase } from "../use-cases/createPokemon.useCase";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { connection } from "../db";

export const createPokemonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const pokemonDto = req.body as PokemonDto;

    const response = await new CreatePokemonUseCase(
      new PokemonRepository(connection)
    ).execute(pokemonDto);

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating Pokemon:", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
}