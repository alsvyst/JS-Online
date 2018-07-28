export default class Store {
  constructor() {

}
  getFavorites() {
    let favorites;
    if(!localStorage.getItem('favorites')) {
      favorites = [];
    } else {
      favorites = JSON.parse(localStorage.getItem('favorites'));
    }

    return favorites;
  }

  addFavorite(favorite) {
    const favorites = this.getFavorites();
    favorites.unshift(favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  removeFavorite(id) {
    const favorites = this.getFavorites();
    favorites.forEach((el, pos) => {
      if (el.id === id) {
        favorites.splice(pos, 1);
      }
    });
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};