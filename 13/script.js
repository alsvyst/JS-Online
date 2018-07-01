class Http {
    constructor() {
        this.http = new XMLHttpRequest();
    }

    get(url, callback) {
        this.http.open("GET", url);
        const self = this; // сохранение контекста вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200) {
                callback(null, self.http.responseText);
            } else {
                callback(`Error: ${self.http.status}`, null)
            }
        });

        this.http.send();
    }

    post(url, data, callback) {
        if (!data) return callback('Error: Data undefined');

        this.http.open("POST", url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранение контекста вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, self.http.responseText); // вызов callback после ответа сервера
            } else {
                callback(`Error: ${self.http.status}`, null)
            }
        });

        this.http.send(JSON.stringify(data));
    }

    put(url, data, callback) {
        if (!data) return callback('Error: Data undefined');

        this.http.open("PUT"``, url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранение контекста вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, self.http.responseText); // вызов callback после ответа сервера
            } else {
                callback(`Error: ${self.http.status}`, null)
            }
        });

        this.http.send(JSON.stringify(data));
    }

    delete(url, callback) {
        this.http.open("DELETE"``, url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранение контекста вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, "Post deleted"); // вызов callback после ответа сервера
            } else {
                callback(`Error: ${self.http.status}`, null)
            }
        });

        this.http.send();

    }
}

const btn = document.querySelector("button");
const ul = document.querySelector("ul");
const div = document.querySelector(".user__info");

let users;
const http = new Http();
http.get("https://jsonplaceholder.typicode.com/users", function (err, res) {
    users = JSON.parse(res);
});

btn.addEventListener("click", function () {
    ul.textContent = "";

    users.forEach(function (user) {
        ul.insertAdjacentHTML("beforeend", `
        <li class="user">${user.name}</li>
        `);
    });
});

ul.addEventListener("click", function(e) {
    if (e.target.classList.contains("user")) {
        showUserInfo(e.target.textContent);
    }
});

div.addEventListener("click", function(e) {
    if (e.target.classList.contains("close")) {
        div.textContent = "";
    }
});

function showUserInfo(userName) {
    div.textContent = "";
    let job = "";
    let email = "";

    users.forEach(function (user) {
        if (user.name.indexOf(userName) !== -1) {
            job = user.company.name;
            email = user.email;
        }
    });

    const userInfo = `
    <div class="show">
        <span>name: ${userName}</span>
        <span>job: ${job}</span>
        <span>email: ${email}</span>
        <span class="close">&times;</span>
    </div>
    `;
    div.insertAdjacentHTML("afterbegin", userInfo);
}
