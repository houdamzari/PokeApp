import axios from 'axios';

let element = '';
const grid = document.querySelector('.grid');
const gridLogic = (data) => {
  element += `<div class="grid-item">
 <img class="pokeimg" src=${data.sprites.front_default} />
  <h3 class="pokename">${data.species.name}</h3>
  <div class="buttonContainer"><button>Comments</button><button>Reservation</button></div>
  </div>`;
  grid.innerHTML = element;
};

export const fetchData = () => {
  axios
    .get(' https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
    .then((res) => {
      const data = res.data.results;

      data.forEach((el) => {
        axios.get(el.url).then((res) => gridLogic(res.data));
      });
    });
};
