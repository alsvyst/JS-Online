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
  ui.showLoader();
  favoriteNews.getFavoriteNews()
    .then(favoriteNews => {
      ui.clearContainer();
      if (favoriteNews.empty) {
        ui.showEmptyFavoriteNews();
      }
      let timeout = 0;

      favoriteNews.forEach((doc) => {
        const card = ui.addFavoriteNews(doc.data(), doc.id);

        setTimeout(() => {
          ui.fadeElement(card);
          ui.moveElement(card);
        }, timeout);

        timeout += 400;
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
    ui.showMessage({
      text: 'News deleted',
      error: false
    });
    if (document.querySelector('.news-container .container .row.center-align').childElementCount === 0) {
      ui.showEmptyFavoriteNews();
    }
  }
}

function onLogout() {
  auth.logout()
    .then(() => window.location = 'login.html')
    .catch(err => console.log(err));
}