import { Request, Response } from "express";
import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { UpdatePokemonUseCase } from "../use-cases/updatePokemon.useCase";
import { connection } from "../db";

export const updatePokemonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const pokemonDto : PokemonDto = { id: parseInt(req.params.id), ...req.body };

    await new UpdatePokemonUseCase(
      new PokemonRepository(connection)
    ).execute(pokemonDto);

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
  }
}