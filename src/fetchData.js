import axios from 'axios';

let element = '';
const grid = document.querySelector('.grid');
const gridLogic = (data) => {
  element += `<div class="grid-item">
 <img class="pokeimg" src=${data.sprites.other['official-artwork'].front_default} />
  <h3 class="pokename">${data.species.name}</h3>
  <div class="buttonContainer"><button>Comments</button></div>
  </div>`;
  grid.innerHTML = element;
};

export const fetchData = () => {
  axios
    .get(' https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')
    .then((res) => {
      const data = res.data.results;

      data.forEach((el) => {
        axios.get(el.url).then((res) => gridLogic(res.data));
      });
    });
};
