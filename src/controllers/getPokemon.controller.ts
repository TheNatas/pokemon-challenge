import { Request, Response } from "express";
import { PokemonDto } from "../dtos/Pokemon.dto";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { getConnection } from "../db";
import { UpdatePokemonUseCase } from "../use-cases/updatePokemon.useCase";
import { DeletePokemonUseCase } from "../use-cases/deletePokemon.useCase";
import { GetPokemonUseCase } from "../use-cases/getPokemon.useCase";

export const getPokemonController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id : number = parseInt(req.params.id);

    const connection = await getConnection();

    await new GetPokemonUseCase(
      new PokemonRepository(connection)
    ).execute(id);

    res.status(204);
  } catch (error) {
    console.error("Error getting Pokemon:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}