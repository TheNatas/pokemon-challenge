import { Request, Response, Router } from "express";
import { battleOfPokemonsController } from "../../controllers/battleOfPokemons.controller";

/**
 * Registers the Pokémon battle route on the provided router.
 *
 * @param router - The Express router instance to attach the battle route to.
 *
 * @remarks
 * This function sets up a POST endpoint at `/batalhar/:pokemonAId/:pokemonBId`
 * which initiates a battle between two Pokémon identified by their respective IDs.
 * The request is handled by the `battleOfPokemonsController`.
 *
 * @example
 * ```typescript
 * import { Router } from 'express';
 * import { pokemonBattleRoutes } from './battles';
 *
 * const router = Router();
 * pokemonBattleRoutes(router);
 * ```
 */
export const pokemonBattleRoutes = (
  router: Router
) => {

  router.post('/batalhar/:pokemonAId/:pokemonBId', (req: Request, res: Response) => {
    battleOfPokemonsController(req, res);
  });
}