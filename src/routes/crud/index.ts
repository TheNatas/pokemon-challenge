import { Request, Response, Router } from "express";
import { createPokemonController } from "../../controllers/createPokemon.controller";
import { getConnection } from "../../db";
import { updatePokemonController } from "../../controllers/updatePokemon.controller";
import { deletePokemonController } from "../../controllers/deletePokemon.controller";
import { getPokemonController } from "../../controllers/getPokemon.controller";
import { getPokemonsController } from "../../controllers/getPokemons.controller";

export const pokemonCrudRoutes = (
  router: Router
) => {
  router.post('/pokemons', (req: Request, res: Response) => {
    createPokemonController(req, res);
  });

  router.put('/pokemons/:id', (req: Request, res: Response) => {
    updatePokemonController(req, res);
  });

  router.delete('/pokemons/:id', (req: Request, res: Response) => {
    deletePokemonController(req, res);
  });

  router.get('/pokemons/:id', (req: Request, res: Response) => {
    getPokemonController(req, res);
  });

  router.get('/pokemons', async (req: Request, res: Response) => {
    getPokemonsController(req, res);
  });
}