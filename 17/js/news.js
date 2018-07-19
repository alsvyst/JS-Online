class FavoriteNews {
  constructor() {
    this.db = FirestoreInit.getInstance().getDb();
    this.collectionName = "favorit-news";
  }

  getFavoriteNews() {
    return new Promise((resolve, reject) => {
      this.db.collection(this.collectionName).get()
        .then((querySnapshot) => resolve(querySnapshot))
        .catch(err => reject(err));
    })
  }

  addFavoriteNews(news) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.collectionName).add(news)
        .then(docRef => resolve(docRef))
        .catch(err => reject(err));
    })
  }

  removeFavoriteNews(id) {
    this.db.collection(this.collectionName).doc(id).delete()
      .catch(err => reject(err));
  }
}