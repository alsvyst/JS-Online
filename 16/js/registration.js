// Init Auth
const auth = new Auth();

// Init Elements
const form = document.forms['registration_form'];
const email = form.elements['email'];
const password = form.elements['password'];
const container = document.querySelector(".error-container");

// Check auth state
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    window.location = 'index.html';
  }
});

form.addEventListener('submit', onRegister);

function onRegister(e) {
  e.preventDefault();

  if (email.value && password.value) {
    auth.register(email.value, password.value)
      .then(() => {
        window.location = "index.html";
      })
      .catch(err => {
        const errorMessage = err.message;
        container.innerHTML = "";

        const template = `
            <div class="card red lighten-1">
                <div class="card-content">
                    <span class="card-title">Error:</span>
                    <p>${errorMessage}</p>
                </div>
            </div>
          `;

        container.insertAdjacentHTML("beforeend", template);
      })
  }
}