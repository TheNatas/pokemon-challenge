import { Request, Response } from "express";
import { app } from "../..";

app.post('/pokemons', (req: Request, res: Response) => {
  res.status(201).json({
    "id": 1,
    "tipo": "pikachu",
    "treinador": "Thiago",
    "nivel": 1
  });
});

app.put('/pokemons/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204);
});

app.delete('/pokemons/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204);
});

app.get('/pokemons/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    "id": id,
    "tipo": "pikachu",
    "treinador": "Thiago",
    "nivel": 1
  });
});

app.get('/pokemons', (req: Request, res: Response) => {
  res.status(200).json([
    {
      "id": 1,
      "tipo": "pikachu",
      "treinador": "Thiago",
      "nivel": 1
    },
    {
      "id": 2,
      "tipo": "charizard",
      "treinador": "Renato",
      "nivel": 1
    }
  ]);
});