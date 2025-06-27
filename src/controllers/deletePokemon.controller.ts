import { Request, Response } from "express";
import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { getConnection } from "../db";
import { DeletePokemonUseCase } from "../use-cases/deletePokemon.useCase";

export const deletePokemonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id : number = parseInt(req.params.id);

    const connection = await getConnection();

    await new DeletePokemonUseCase(
      new PokemonRepository(connection)
    ).execute(id);

    connection.commit();

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting Pokemon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}