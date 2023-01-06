import axios from 'axios';
import itemsCounter from './itemsCounter.js';

let element = '';
const grid = document.querySelector('.grid');
const appId = '91WxoTjxGWkdx6jiMCZQ';
const select = document.querySelector('.counter');
const baseURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}`;
const SubmitBtn = document.querySelector('.submit-comment');
const Name = document.querySelector('#name');
const Comment = document.querySelector('#comment');
const PopUp = document.querySelector('.popup');
const CloseBtn = document.querySelector('.closebtn');
const MainBody = document.querySelector('.main');
const NewComments = document.querySelector('.newComment');
const ModalDetails = document.querySelector('.pokedetails');

//* **Count comments*/
const countComments = (item) => {
  document.querySelector('#commentcount').innerHTML = `Comments (${item})`;
};

//* ***fetch comment and show to the popup */
const fetchComment = async (itemId) => {
  const response = await fetch(`${baseURL}/comments?item_id=${itemId}`);
  const data = await response.json();
  const Comments = await data;
  NewComments.innerHTML = '';
  if (response.status === 200) {
    Comments.forEach((element) => {
      NewComments.innerHTML += `
            <li>${element.creation_date} ${element.username} : ${element.comment}</li>
            `;
      // **Count comments */
      countComments(Comments.length);
    });
  } else {
    NewComments.innerHTML = '';
    document.querySelector('#commentcount').innerHTML = 'Comments (0)';
  }
};

//* **Add comment function*/
const addComment = async (itemId, username, comment) => {
  await fetch(`${baseURL}/comments?item_id=${itemId}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      item_id: itemId,
      username,
      comment,
    }),
  });
  fetchComment(itemId);
};

//* **Send comments to the API : depends on addComment function*/
SubmitBtn.addEventListener('click', () => {
  const reqId = SubmitBtn.getAttribute('id');
  addComment(reqId, Name.value, Comment.value);
  Name.value = '';
  Comment.value = '';
});

//* **Close button behaviour */
CloseBtn.addEventListener('click', () => {
  PopUp.classList.remove('showpop');
  NewComments.innerHTML = '';
  MainBody.style.filter = 'blur(0)';
});

//* **Load data after fetching data from Poke API */
const gridLogic = (data) => {
  const numberlikes = JSON.parse(localStorage.getItem('likes'));
  const postLikes = Array.isArray(numberlikes) ? numberlikes : [];
  let postLikeNumber;
  // eslint-disable-next-line no-return-assign
  postLikes.forEach((like) => (parseInt(like.item_id, 10) === data.id ? (postLikeNumber = like.likes) : ''));

  axios
    .get(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`,
    )
    .then((res) => localStorage.setItem('likes', JSON.stringify(res.data)));
  element += `<div class="grid-item">
 <img class="pokeimg" src=${
  data.sprites.other['official-artwork'].front_default
} />
  <h3 class="pokename">${data.species.name} </h3>
  <div class="likesContainer"><button class="likeButton" id=${
  data.id
}>&#x2764;</button><p>  ${postLikeNumber || '0'} Likes</p></div>

  <div class="buttonContainer"><button class="commentbtn" id="${
  data.species.name
}">Comment</button></div>
  </div>`;
  grid.innerHTML = element;
  const commentButton = document.querySelectorAll('.commentbtn');
  const likeButton = document.querySelectorAll('.likeButton');
  const likingHandle = () => {
    likeButton.forEach((button) => button.addEventListener('click', () => {
      axios
        .post(
          `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`,
          { item_id: button.id },
        )
        .then(() => setTimeout(() => {
          element = '';
          // eslint-disable-next-line no-use-before-define
          fetchData();
        }, 1000));
      setTimeout(() => {
        element = '';
        // eslint-disable-next-line no-use-before-define
        fetchData();
      }, 1000);
    }));
  };
  likingHandle();

  select.innerHTML = `(${itemsCounter('.grid-item')})`;

  //* **Comment button behaviour inside the Pokemon Cards */
  commentButton.forEach((element) => element.addEventListener('click', (e) => {
    const commentId = e.target.id;
    PopUp.classList.add('showpop');
    MainBody.style.filter = 'blur(10px)';
    fetchComment(commentId);
    SubmitBtn.setAttribute('id', commentId);
    ModalDetails.innerHTML = `
    <img class="pokeimg-details"
                src="${e.target.parentElement.parentElement.firstElementChild.src}"
                alt="popup-image">
            <h3>${e.target.id}</h3>
           
                <p><strong>Special Ability : </strong>${e.target.parentElement.parentElement.firstElementChild.id}</p>
    `;
  }));
};

//* **Fetch Pokemons from Poke API */
export const fetchData = () => {
  axios
    .get(' https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    .then((res) => {
      const data = res.data.results;
      data.forEach((el) => {
        axios.get(el.url).then((res) => gridLogic(res.data));
      });
    });
};