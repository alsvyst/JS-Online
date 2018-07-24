class UI {

  constructor() {
    this.container = document.querySelector(".news-container .container .row");
    this.resouces = document.getElementById("resources");
  }

  addNews(news, index) {
    const wrapper = document.createElement("div");
    wrapper.classList.add('col', 's12', 'm6');

    wrapper.innerHTML = `
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                  <button data-index="${index}" class="waves-effect waves-light btn add-favorite">Add to favorite</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
    `;

    wrapper.style.opacity = 0;
    wrapper.style.transform = 'translateY(10px)';

    this.container.insertAdjacentElement("beforeend", wrapper);

    return wrapper;
  }

  addFavoriteNews(news, id) {
    const wrapper = document.createElement("div");
    wrapper.classList.add('col', 's12', 'm6');

    wrapper.innerHTML = `
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <p><a href="${news.url}">Read more</a></p>
                  <button data-id="${id}" class="waves-effect waves-light btn remove-favorite red lighten-2">Remove</button>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
    `;

    wrapper.style.opacity = 0;
    wrapper.style.transform = 'translateY(10px)';

    this.container.insertAdjacentElement("beforeend", wrapper);
    return wrapper;
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showLoader() {
    this.clearContainer();

    const template = `
      <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                  <div class="circle"></div>
              </div>
              <div class="gap-patch">
                  <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                  <div class="circle"></div>
              </div>
          </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);

  }

  showInfo(msg) {
    this.clearContainer();

    const template = `
      <div class="card blue lighten-4">
          <div class="card-content">
              <p>${msg}</p>
          </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);

  }

  showError(err) {
    this.clearContainer();

    const template = `
      <div class="card red lighten-1">
          <div class="card-content">
              <span class="card-title">Error:</span>
              <p>${err}</p>
          </div>
      </div>
    `;

    this.container.insertAdjacentHTML("beforeend", template);

  }

  addResourceToSelect(resource) {
    const option = document.createElement('option');
    this.resouces[this.resouces.options.length] = new Option(resource.name, resource.id);
  }

  deleteNews(id) {
    const card = document.querySelector(`button[data-id="${id}"]`).parentElement.closest(".col");
    card.remove();
  }

  showEmptyFavoriteNews() {
    const template = "<h4>List is empty</h4>";
    this.container.insertAdjacentHTML("beforeend", template);
  }

  showMessage(message) {
    const alert = this.createAlert(message);

    this.fadeElement(alert);
    this.moveElement(alert);

    setTimeout(this.deleteMessage, 5000);

  };

  deleteMessage() {
    document.querySelectorAll('.alert')[0].remove();
  }

  fadeElement(element) {
    let fadeStep = 0;
    function animateAction(time) {
      fadeStep += 0.05;
      element.style.opacity = fadeStep;
      const raf = requestAnimationFrame(animateAction);

      if (parseFloat(element.style.opacity) >= 1) {
        cancelAnimationFrame(raf);
      }
    }
    animateAction();
  };

  moveElement(element) {
    // шаг изменения свойства
    let pointMove = 10;
    function animateAction(time) {
      pointMove -= 1;
      element.style.transform = `translateY(${pointMove}px)`;
      const raf = requestAnimationFrame(animateAction);

      if (parseFloat(pointMove) <= 0) {
        cancelAnimationFrame(raf);
      }
    }

    animateAction();
  };

  createAlert(msg) {
    // Проверяем высоту уже созданных алертов
    const allAlerts = document.body.querySelectorAll('.alert');
    let fullAlertsHeight = 10;
    if (allAlerts.length) {
      allAlerts.forEach(al => fullAlertsHeight += al.offsetHeight + 10);
    }

    const alert = document.createElement('div');
    alert.classList.add('alert', 'grey', 'white-text', `z-depth-2`);
    alert.textContent = msg;
    alert.style.position = 'fixed';
    alert.style.top = `${fullAlertsHeight}px`;
    alert.style.right = '30px';
    alert.style.opacity = 0;
    alert.style.transform = 'translateY(30px)';
    alert.style.padding = "15px";
    alert.style.zIndex = 999;

    document.body.insertAdjacentElement('afterbegin', alert);

    return alert;
  }
}