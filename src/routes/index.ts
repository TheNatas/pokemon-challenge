import { Router } from "express";
import { pokemonCrudRoutes } from "./crud";
import { pokemonBattleRoutes } from "./battles";

/**
 * Registers CRUD routes for managing Pokémon resources.
 *
 * @param router - The Express router instance to which the routes will be attached.
 *
 * @route POST /pokemons
 * @description Creates a new Pokémon.
 * @param req.body - The Pokémon data to create.
 * @returns 201 - Created Pokémon object.
 * @returns 400 - Validation error.
 *
 * @route PUT /pokemons/:id
 * @description Updates an existing Pokémon by its ID.
 * @param req.params.id - The ID of the Pokémon to update.
 * @param req.body - The updated Pokémon data.
 * @returns 200 - Updated Pokémon object.
 * @returns 404 - Pokémon not found.
 *
 * @route DELETE /pokemons/:id
 * @description Deletes a Pokémon by its ID.
 * @param req.params.id - The ID of the Pokémon to delete.
 * @returns 204 - No content, successful deletion.
 * @returns 404 - Pokémon not found.
 *
 * @route GET /pokemons/:id
 * @description Retrieves a Pokémon by its ID.
 * @param req.params.id - The ID of the Pokémon to retrieve.
 * @returns 200 - Pokémon object.
 * @returns 404 - Pokémon not found.
 *
 * @route GET /pokemons
 * @description Retrieves a list of all Pokémon.
 * @returns 200 - Array of Pokémon objects.
 */

export const routes = (
  router: Router
) => {
  /**
   * @swagger
   * /pokemons:
   *   get:
   *     summary: Retrieve a list of all Pokémon
   *     responses:
   *       200:
   *         description: Array of Pokémon objects
   *   post:
   *     summary: Create a new Pokémon
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               tipo:
   *                 type: string
   *                 description: The name of the Pokémon
   *               treinador:
   *                 type: string
   *                 description: The type of the Pokémon
   *     responses:
   *       201:
   *         description: Created Pokémon object
   *       400:
   *         description: Validation error
   *
   * /pokemons/{id}:
   *   put:
   *     summary: Update an existing Pokémon by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the Pokémon to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               treinador:
   *                 type: string
   *     responses:
   *       204:
   *         description: Updated Pokémon object
   *       404:
   *         description: Pokémon not found
   *
   *   delete:
   *     summary: Delete a Pokémon by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the Pokémon to delete
   *     responses:
   *       204:
   *         description: No content, successful deletion
   *       404:
   *         description: Pokémon not found
   *
   *   get:
   *     summary: Retrieve a Pokémon by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the Pokémon to retrieve
   *     responses:
   *       200:
   *         description: Pokémon object
   *       404:
   *         description: Pokémon not found
   *
   *
   * /batalhar/{pokemonAId}/{pokemonBId}:
   *   post:
   *     summary: Initiate a Pokémon battle between two Pokémon
   *     parameters:
   *       - in: path
   *         name: pokemonAId
   *         required: true
   *         schema:
   *           type: number
   *         description: The ID of the Pokémon A to battle
   *       - in: path
   *         name: pokemonBId
   *         required: true
   *         schema:
   *           type: number
   *         description: The ID of the Pokémon B to battle
   *     responses:
   *       200:
   *         description: Result of the Pokémon battle
   */

  pokemonCrudRoutes(router);
  pokemonBattleRoutes(router);
}