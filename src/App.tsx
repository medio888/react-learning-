import { useState } from 'react'
import Header from './components/Header'
import PokemonCard from './components/PokemonCard';

function App() {
  const [name, setName] = useState("Meder")
  const [pokemon, setPokemon] = useState(null);


  const loadPokemon = async nameOrId => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = await response.json();

    setPokemon({
      name: data.name,
      image: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name),
    })
  };
  
  const handleSearchPokemon = () => {
    loadPokemon(name);
  }

  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    loadPokemon(randomId);
  }

  return (
    <>
      <Header />

      <div className='controls'>
        <input id='pokemonInput' type='text' placeholder='Например: pikachu' onChange={(e) => setName(e.target.value)}/>
        <button id='loadBtn' onClick={handleSearchPokemon}>Загрузит</button>
        <button id='randomBtn' onClick={handleRandomPokemon}>🎲 Random</button>
      </div>

      <p id='status' className='status'></p>

      <div id='card' className='card-container'>
        {pokemon ? <PokemonCard data={pokemon} /> : 'пусто'}
      </div>
    </>
  );
}


export default App