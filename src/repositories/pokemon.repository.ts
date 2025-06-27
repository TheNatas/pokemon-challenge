import mysql, { ResultSetHeader } from 'mysql2/promise';
import { Pokemon, UpdatableFieldObject } from '../entities/Pokemon';

export class PokemonRepository {
  constructor(
    private readonly db: mysql.Connection
  ) {}

  async create(pokemon : Pokemon) {
    const [result] = await this.db.execute(
      Pokemon.getInsertQuery(pokemon)
    );
    return result as ResultSetHeader;
  }

  async update(id: number, fieldsToUpdate: UpdatableFieldObject[]) {
    const [result] = await this.db.execute(
      Pokemon.getUpdateQuery(id, fieldsToUpdate)
    );
    return result as ResultSetHeader;
  }

  async delete(id : number) {
    await this.db.execute(
      Pokemon.getDeleteQuery(id)
    );
  }

  async findById(id : number) {
    const [rows] = await this.db.query(
      Pokemon.getSelectQuery(id)
    )
    const pokemons = rows as Pokemon[];
    return pokemons?.length ? pokemons[0] : null;
  }

  async findAll() {
    const [rows] = await this.db.query(
      Pokemon.getSelectQuery()
    );
    const pokemons = rows as Pokemon[];
    return pokemons;
  }
}