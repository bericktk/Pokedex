const pokemonImage = document.querySelector('.pokemon-image')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonName = document.querySelector('.pokemon-name')

const input = document.querySelector('.buscar')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')
const form = document.querySelector('.form')

let pokemonAtual = 1

async function loadPokemon(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function renderPokemon(pokemon){
    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = ''

    const data = await loadPokemon(pokemon)
    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        //pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonImage.src = data['sprites']['other']['official-artwork']['front_default']
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        }
}
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        renderPokemon(input.value.toLowerCase());
    });

    btnPrev.addEventListener('click', () => {
        if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        }
    });

    btnNext.addEventListener('click', () => {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    });
            
renderPokemon(pokemonAtual)
