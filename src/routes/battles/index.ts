import { Request, Response } from "express";
import { app } from "../..";

app.post('/batalhar/:pokemonAId/:pokemonBId', (req: Request, res: Response) => {
  const { pokemonAId, pokemonBId } = req.params;
  res.status(200).json({
    "vencedor": {
      "id": 1,
      "tipo": "pikachu",
      "treinador": "Thiago",
      "nivel": 2 // Subiu de nível
    },
    "perdedor": {
      "id": 2,
      "tipo": "charizard",
      "treinador": "Renato",
      "nivel": 0 // Morreu e foi deletado da tabela
    }
  });
});