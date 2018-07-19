// Init ui
const ui = new UI();
// Init auth
const auth = new Auth();
// Init Favorite news
const favoriteNews = new FavoriteNews();
// Init News store
const newsStore = NewsStore.getInstance();

const newsContainer = document.querySelector(".news-container");
const logoutBtn = document.querySelector(".logout");

window.addEventListener("load", onLoad);
newsContainer.addEventListener("click", removeFavorite);
logoutBtn.addEventListener("click", onLogout);

function onLoad(e) {
  favoriteNews.getFavoriteNews()
    .then(favoriteNews => {
      if (favoriteNews.empty) {
        ui.showEmptyFavoriteNews();
      }
      favoriteNews.forEach((doc) => {
        ui.addFavoriteNews(doc.data(), doc.id);
      });
    })
    .catch(err => {
      console.log(err);
    })
}

function removeFavorite(e) {
  if (e.target.classList.contains('remove-favorite')) {
    const id = e.target.dataset.id;
    favoriteNews.removeFavoriteNews(id);
    ui.deleteNews(id);
    ui.showToast('News deleted');
  }
}

function onLogout() {
  auth.logout()
    .then(() => window.location = 'login.html')
    .catch(err => console.log(err));
}