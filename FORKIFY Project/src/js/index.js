// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import Store from './Store';
import {elements, renderLoader, clearLoader} from "./view/base";
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';

/*Global state of the app
- Search object
- Current recipe object
- Shopping list
- Favorite recipe object*/

const state = {};

// Search controller

const controlSearch = async () => {
  // получаем данные из view
  const query = searchView.getSearchInputValue();

  if (query) {
    // создаем новый объект Search
    state.search = new Search(query);

    // Подготавливаем UI для результата
    searchView.clearForm();
    searchView.clearResult();
    renderLoader(elements.searchRes);

    // Дераем поиск
    await state.search.getResult();

    // render result
    searchView.renderResult(state.search.result);
    clearLoader();
  }
};

// Set events
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResult();
    searchView.renderResult(state.search.result, goToPage);
  }
});


// Recipe controller

const controlRecipe = async () => {
  // get id from url
  const id = window.location.hash.replace('#', '');

  if (id) {

    if (state.search) searchView.highLightSelected(id);
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // create new recipe obj
    state.recipe = new Recipe(id);

    // get recipe data
    await state.recipe.getRecipe();

    clearLoader();
    recipeView.renderRecipe(state.recipe.result);
  }
};

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);


// List controller
const controlList = () => {
  if (!state.list) {
    state.list = new List();
  }

  state.recipe.result.ingredients.forEach(ingredient => {
    state.list.addItem(ingredient);
    listView.renderList(state.list.items[state.list.items.length-1]);
  });
};

elements.recipe.addEventListener('click', (e) => {
  const btn = e.target.closest('.recipe__btn') && e.target.closest('.recipe__ingredients');
  if (btn) {
    controlList();
  }
});

elements.shoppingList.addEventListener('click', (e) => {
  if (e.target.closest('.shopping__delete')) {
    const deleteItem = e.target.closest('.shopping__item');

    if (deleteItem) {
      state.list.deleteItem(deleteItem.dataset.shopping__id);
      listView.deleteFromList(deleteItem);
    }
  }
});


// Likes controller

const controlLikes = () => {
  const store = new Store;
  if (!state.likes) {
    state.likes = new Likes();
  }
  const id = window.location.hash.replace('#', '');

  if (state.likes.checkItem(id)) {
    state.likes.addItem(state.recipe.result, id);
    likesView.renderLike(state.likes.items[state.likes.items.length-1]);
    store.addFavorite(state.likes.items[state.likes.items.length-1]);
  }
};

elements.recipe.addEventListener('click', (e) => {
  const btn = e.target.closest('.recipe__love');
  if (btn) {
    controlLikes();
  }
});

elements.likesList.addEventListener('click', e => {
  const store = new Store;

  if (e.target.closest('.likes__delete')) {
    const deleteItem = e.target.closest('.likes__item');
    const id = deleteItem.querySelector('a').hash.replace('#', '');

    if (deleteItem) {
      state.likes.deleteItem(id);
      likesView.deleteFromLikes(deleteItem);
      store.removeFavorite(id);
    }
  }
});

window.addEventListener('load', () => {
  if (!state.likes) {
    state.likes = new Likes();
  }
  const store = new Store;

  store.getFavorites().forEach(el => {
    state.likes.addItem(el, el.id);
    likesView.renderLike(el);
  });
});