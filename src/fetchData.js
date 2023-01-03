import axios from 'axios';

const gridLogic = (data) => {
  let element = '';
  element += `<div>
  <div class="imageContainer"><img src=${data.sprites.front_default} /></div>
  <h3>${data.species.name}</h3>
  <div class="buttonContainer"><button>Comments</button><button>Reservation</button></div>
  </div>`;
  grid.innerHtml = element;
};

export const fetchData = () => {
  const grid = document.querySelector('.grid');
  axios
    .get(' https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
    .then((res) => {
      const data = res.data.results;

      data.forEach((el) => {
        axios.get(el.url).then((res) => console.log(res.data));
      });
    });
};
