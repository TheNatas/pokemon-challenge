import { Request, Response } from "express";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { connection } from "../db";
import { DeletePokemonUseCase } from "../use-cases/deletePokemon.useCase";

export const deletePokemonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id : number = parseInt(req.params.id);

    await new DeletePokemonUseCase(
      new PokemonRepository(connection)
    ).execute(id);

    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
  }
}