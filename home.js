var home = document.querySelector(".home");

var username = localStorage.getItem("username");

home.innerHTML += `<h1 class="text">Hello ${username}</h1>`;