import {elements} from "./base";

export const renderList = listItem => {
  const markup = `
    <li class="shopping__item" data-shopping__id="${listItem.id}">
        <p class="shopping__description">${listItem.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
  `;

  elements.shoppingList.insertAdjacentHTML('afterbegin', markup);
};

export const deleteFromList = item => {
  item.remove();
};