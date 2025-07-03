type UpdatableFields = 'treinador' | 'nivel'
export type UpdatableFieldObject = {
  key: UpdatableFields;
  value: string | number;
}

export class Pokemon {
  readonly id?: number;
  readonly tipo: string;
  readonly treinador: string;
  readonly nivel: number;

  constructor(tipo: string, treinador: string, nivel: number, id?: number) {
    this.id = id;
    this.tipo = tipo;
    this.treinador = treinador;
    this.nivel = nivel;
  }

  static createNew(tipo: string, treinador: string): Pokemon {
    if (!['charizard', 'mewtwo', 'pikachu'].includes(tipo)) {
      throw new Error('Invalid Pokemon type');
    }
    const nivel = 1; // domain rule enforced here
    return new Pokemon(tipo, treinador, nivel);
  }

  static getInsertQuery(pokemon : Pokemon): string {
    return `INSERT INTO pokemon (tipo, treinador, nivel) VALUES ('${pokemon.tipo}', '${pokemon.treinador}', ${pokemon.nivel}) RETURNING *`;
  }

  static getUpdateQuery(id: number, fieldsToUpdate: UpdatableFieldObject[]): string {
    return `UPDATE pokemon SET ${fieldsToUpdate.map(field => `${field.key} = '${field.value}'`).join(',')} WHERE id = ${id} RETURNING *`;
  }

  static getSelectQuery(id?: number): string {
    return 'SELECT * FROM pokemon' + (id ? ` WHERE id = ${id}` : '');
  }

  static getDeleteQuery(id: number): string {
    return `DELETE FROM pokemon WHERE id = ${id} RETURNING *`;
  }
}
