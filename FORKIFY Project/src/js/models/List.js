import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(ingredient) {
    const newItem = {
      id: uniqid(),
      ingredient
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
}