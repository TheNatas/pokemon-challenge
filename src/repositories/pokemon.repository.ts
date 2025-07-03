import { Pokemon, UpdatableFieldObject } from '../entities/Pokemon';
import { Pool } from 'pg';

export class PokemonRepository {
  constructor(
    private readonly db: Pool
  ) {}

  async create(pokemon : Pokemon) {
    const { rows } = await this.db.query(
      Pokemon.getInsertQuery(pokemon)
    );
    return rows[0] as Pokemon;
  }

  async update(id: number, fieldsToUpdate: UpdatableFieldObject[]) {
    const { rows } = await this.db.query(
      Pokemon.getUpdateQuery(id, fieldsToUpdate)
    );
    return rows;
  }

  async delete(id : number) {
    await this.db.query(
      Pokemon.getDeleteQuery(id)
    );
  }

  async findById(id : number) {
    const { rows } = await this.db.query(
      Pokemon.getSelectQuery(id)
    )
    const pokemons = rows as Pokemon[];
    return pokemons?.length ? pokemons[0] : null;
  }

  async findAll() {
    const { rows } = await this.db.query(
      Pokemon.getSelectQuery()
    );

    const pokemons = rows as Pokemon[];
    return pokemons;
  }
}