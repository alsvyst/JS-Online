// Init http
const http = new Http();
// Init ui
const ui = new UI();
// Api key
const apiKey = "83ddce57840d4db9854ba94978e6cd2a";

// Init elements
const select = document.getElementById("country");
const category = document.getElementById("category");
const resouces = document.getElementById("resources");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

// Events
window.addEventListener("load", createOptions);
select.addEventListener("change", onChangeCountry);
category.addEventListener("change", onChangeCategory);
resouces.addEventListener("change", onChangeResource);
searchBtn.addEventListener("click", onSearch);

// Events handlers
function onChangeCountry(e) {
  // Показываем прелоадер
  ui.showLoader();
  resouces.options.selectedIndex = 0;
  $(document).ready(function () {
    $('select').formSelect();
  });
  let request = (category.options.selectedIndex) ? `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?country=${select.value}&apiKey=${apiKey}`;
    // Делаем запрос на получение новостей

  NewsRequestHandler(request);
}

function onChangeCategory(e) {
  ui.showLoader();
  resouces.options.selectedIndex = 0;
  $(document).ready(function () {
    $('select').formSelect();
  });

  let request = (select.options.selectedIndex) ? `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?category=${category.value}&apiKey=${apiKey}`;

  NewsRequestHandler(request);
}

function onChangeResource(e) {
  ui.showLoader();
  select.options.selectedIndex = 0;
  category.options.selectedIndex = 0;
  $(document).ready(function () {
    $('select').formSelect();
  });

  NewsRequestHandler(`https://newsapi.org/v2/top-headlines?sources=${resouces.value}&apiKey=${apiKey}`);
}

function onSearch(e) {
  // Делаем запрос на получение новостей из инпута
  http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
    .then(data => {
      ui.clearContainer();
      data.articles.forEach(news => ui.addNews(news));
    })
    .catch(err => {
      ui.showInfo("Новостей по вашему запросу не найдено.");
    })
}

function createOptions(e) {
  // Делаем запрос на получение ресурсов
  http.get(`https://newsapi.org/v2/sources?language=ru&apiKey=${apiKey}`)
    .then(data => {
      data.sources.forEach(resource => ui.addResourceToSelect(resource));
      $(document).ready(function () {
        $('select').formSelect();
      });
    });
}

function NewsRequestHandler(url) {
  http.get(url)
    .then(data => {
      ui.clearContainer();
      data.articles.forEach(news => ui.addNews(news));
    })
    .catch(err => {
      ui.showError(err);
    });
}