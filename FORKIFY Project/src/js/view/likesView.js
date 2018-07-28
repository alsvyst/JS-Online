import {elements} from "./base";

export const renderLike = (likeItem) => {
  const markup = `
    <li class="likes__item">
        <a class="likes__link" href="#${likeItem.id}">
            <figure class="likes__fig">
                <img src="${likeItem.image}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${likeItem.title}</h4>
                <p class="likes__author">${likeItem.author}</p>
            </div>
        </a>
        <button class="likes__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
  `;

  elements.likesList.insertAdjacentHTML('afterbegin', markup);
};

export const deleteFromLikes = item => {
  item.remove();
};