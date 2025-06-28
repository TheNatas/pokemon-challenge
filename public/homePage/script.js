(async () => {
  const pokemonsResponse = await fetch('/pokemons');

  if (!pokemonsResponse.ok) {
    console.error('Failed to fetch pokemons');
    return;
  }

  const pokemons = await pokemonsResponse.json();

  document.body.innerHTML = `
    <h1>Pokemons</h1>
    <p>Total: ${pokemons.length}</p>
  `;

  const container = document.createElement('div');
  container.className = 'container';

  pokemons.forEach(pokemon => {
    const pokemonElement = document.createElement('a');
    pokemonElement.className = 'card';
    pokemonElement.href = `/pokemon/${pokemon.id}`;
    pokemonElement.innerHTML = `
      <h2>${pokemon.tipo}</h2>
      <p>Nível: ${pokemon.nivel}</p>
      <p>Treinador: ${pokemon.treinador}</p>
    `;
    container.appendChild(pokemonElement);
  });

  document.body.appendChild(container);
})()