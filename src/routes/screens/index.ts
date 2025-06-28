import { Request, Response, Router } from "express";
import { battleOfPokemonsController } from "../../controllers/battleOfPokemons.controller";
import { getPokemonsController } from "../../controllers/getPokemons.controller";

export const screensRoutes = (
  router: Router
) => {
  router.get('/screen/home', async (req: Request, res: Response) => {
    const pokemons = await getPokemonsController(req, res);

    return `
      <html>
        <head>
          <title>Home</title>
        </head>
        <body>
          <h1>Welcome to the Pokémon Battle App!</h1>
          <p>Use the API to battle your Pokémon.</p>
          <p>Check out the documentation for more details.</p>
          <ul>
            ${pokemons.map(pokemon => `<li>${pokemon.treinador} - ${pokemon.tipo} (Level: ${pokemon.nivel})</li>`).join('')}
          </ul>
        </body>
      </html>
    `
  });
}