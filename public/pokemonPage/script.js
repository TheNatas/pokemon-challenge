(async () => {
  const pokemonResponse = await fetch(`/pokemons/${window.location.pathname.split('/').pop()}`);

  if (!pokemonResponse.ok) {
    console.error('Failed to fetch pokemon');
    return;
  }

  const pokemon = await pokemonResponse.json();

  const div = document.querySelector('div');
  div.innerHTML = '';
  div.innerHTML += `
    <h1>${pokemon.tipo}</h1>
    <p>Nível: ${pokemon.nivel}</p>
    <p>Treinador: ${pokemon.treinador}</p>
  `;

  // const container = document.createElement('div');
  // container.className = 'container';

  // pokemon.forEach(pokemon => {
  //   const pokemonElement = document.createElement('div');
  //   pokemonElement.className = 'card';
  //   pokemonElement.innerHTML = `
  //     <h2>${pokemon.tipo}</h2>
  //     <p>Nível: ${pokemon.nivel}</p>
  //     <p>Treinador: ${pokemon.treinador}</p>
  //   `;
  //   container.appendChild(pokemonElement);
  // });

  // document.body.appendChild(container);
})()