import uniqid from 'uniqid';

export default class Likes {
  constructor() {
    this.items = [];
  }

  addItem(recipe, id) {
    const newItem = {
      id,
      image: recipe.image_url,
      author: recipe.publisher,
      title: recipe.title
    };
    this.items.push(newItem);
  }

  deleteItem(id) {
    this.items.forEach((el, pos) => {
      if (el.id === id) {
        this.items.splice(pos, 1);
      }
    });
  }

  checkItem(id) {
    let currentValue = 1;
    this.items.forEach(el => {
      if (+el.id === +id) currentValue = 0;
    });
    return currentValue;
  }
}