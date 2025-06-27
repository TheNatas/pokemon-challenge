import { Request, Response, Router } from "express";
import { battleOfPokemonsController } from "../../controllers/battleOfPokemons.controller";

export const pokemonBattleRoutes = (
  router: Router
) => {
  router.post('/batalhar/:pokemonAId/:pokemonBId', (req: Request, res: Response) => {
    battleOfPokemonsController(req, res);
  });
}