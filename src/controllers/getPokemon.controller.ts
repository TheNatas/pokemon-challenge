import { Request, Response } from "express";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { connection } from "../db";
import { GetPokemonUseCase } from "../use-cases/getPokemon.useCase";

export const getPokemonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id : number = parseInt(req.params.id);

    const pokemon = await new GetPokemonUseCase(
      new PokemonRepository(connection)
    ).execute(id);

    res.status(200).json(pokemon);
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
  }
}