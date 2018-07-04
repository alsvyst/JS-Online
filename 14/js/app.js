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
  http.get(request, function (err, res) {
    if (!err) {
      // Преобразовываем из JSON в объект
      const response = JSON.parse(res);
      // Очищаем разметку
      ui.clearContainer();
      // Перебираем новости из поля articles в объекте response
      response.articles.forEach(news => ui.addNews(news));
    } else {
      // Выводим ошибку
      ui.showError(err);
    }

  })
}

function onChangeCategory(e) {
  ui.showLoader();
  resouces.options.selectedIndex = 0;
  $(document).ready(function () {
    $('select').formSelect();
  });

  let request = (select.options.selectedIndex) ? `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?category=${category.value}&apiKey=${apiKey}`;

  http.get(request, function (err, res) {
    if (!err) {
      const response = JSON.parse(res);

      ui.clearContainer();

      response.articles.forEach(news => ui.addNews(news));
    } else {
      ui.showError(err);
    }

  })
}

function onChangeResource(e) {
  ui.showLoader();
  select.options.selectedIndex = 0;
  category.options.selectedIndex = 0;
  $(document).ready(function () {
    $('select').formSelect();
  });

  http.get(`https://newsapi.org/v2/top-headlines?sources=${resouces.value}&apiKey=${apiKey}`, function (err, res) {
    if (!err) {
      const response = JSON.parse(res);

      ui.clearContainer();

      response.articles.forEach(news => ui.addNews(news));
    } else {
      ui.showError(err);
    }

  })
}

function onSearch(e) {
  // Делаем запрос на получение новостей из инпута
  http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
    if (err) return ui.showError(err);

    const response = JSON.parse(res);

    if (response.totalResults) {
      // Очищаем разметку
      ui.clearContainer();
      // Перебираем новости из поля articles в объекте response
      response.articles.forEach(news => ui.addNews(news));
    } else {
      ui.showInfo("Новостей по вашему запросу не найдено.");
    }

  });
}

function createOptions(e) {
  // Делаем запрос на получение ресурсов
  http.get(`https://newsapi.org/v2/sources?language=ru&apiKey=${apiKey}`, function (err, res) {
    if (err) return ui.showError(err);

    const response = JSON.parse(res);
    response.sources.forEach(resource => ui.addResourceToSelect(resource));
    $(document).ready(function () {
      $('select').formSelect();
    });
  });
}