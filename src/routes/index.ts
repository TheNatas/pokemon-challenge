import { Router } from "express";
import { pokemonCrudRoutes } from "./crud";
import { pokemonBattleRoutes } from "./battles";

export const routes = (
  router: Router
) => {
  pokemonCrudRoutes(router);
  pokemonBattleRoutes(router);
}