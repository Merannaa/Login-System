var emailInput=document.querySelector('#emailInput')
var passwordInput=document.querySelector('#passwordInput')
var signin=document.querySelector('#loginButton')
var container=document.querySelector('.container')
var loginButtonLink = document.querySelector("#loginButtonLink");
var signupButtonLink = document.querySelector("#signupButtonLink")

var paragraphRequired = document.querySelector(".p-required");
var paragraphIncorrect = document.querySelector(".p-incorrect");
var paragraphUser = document.querySelector(".p-user");
var emailWrong = document.querySelector(".email-wrong");
var passwordWrong = document.querySelector(".password-wrong");


var emailRegex =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

var user_array= [];

if (JSON.parse(localStorage.getItem("user")) != null) {
    user_array = JSON.parse(localStorage.getItem("user"));

    console.log(user_array);
}

//check if there's no any value
signin.addEventListener('click',function(){
    // console.log('hi');
    if (emailInput.value == "" || passwordInput.value == "") {
        paragraphRequired.classList.replace("d-none", "d-block");
        } else {
        if (user_array.length == 0) {
            paragraphUser.classList.replace("d-none", "d-block");
            paragraphRequired.classList.replace("d-block", "d-none");
        } else {
            paragraphUser.classList.replace("d-block", "d-none");
            paragraphRequired.classList.replace("d-block", "d-none");
            signinForm();
        }
    }
})

signupButtonLink.addEventListener('click',function(){
    signupButtonLink.setAttribute("href", "signup.html");
})

// Validate Email
emailInput.addEventListener("keyup", function () {
    if (emailRegex.test(emailInput.value) == false) {
        emailInput.classList.add("is-invalid");
        emailInput.classList.add("form-control-wrong");
        emailWrong.classList.replace("d-none", "d-block");
    } else {
        emailInput.classList.replace("is-invalid", "is-valid");
        emailWrong.classList.replace("d-block", "d-none");
        emailInput.classList.replace("form-control-wrong", "form-control-right");
    }
});

  // Validate Password
passwordInput.addEventListener("keyup", function () {
    if (passwordRegex.test(passwordInput.value) == false) {
        passwordInput.classList.add("is-invalid");
        passwordInput.classList.add("form-control-wrong");
        passwordWrong.classList.replace("d-none", "d-block");
    } else {
        passwordInput.classList.replace("form-control-wrong", "form-control-right");
        passwordInput.classList.replace("is-invalid", "is-valid");
        passwordWrong.classList.replace("d-block", "d-none");
    }
});



function signinForm() {
    if (isExist() == true) {
        paragraphIncorrect.classList.replace("d-block", "d-none");
        paragraphRequired.classList.replace("d-block", "d-none");
        loginButtonLink.setAttribute("href", "home.html");
    } else {
        paragraphRequired.classList.replace("d-block", "d-none");
        paragraphIncorrect.classList.replace("d-none", "d-block");
    }
}

// Check if user exists
function isExist() {
    for (let i = 0; i < user_array.length; i++) {
        if (
            emailInput.value.toLowerCase() == user_array[i].email.toLowerCase() &&
            passwordInput.value == user_array[i].password
    ) {
        localStorage.setItem("username", user_array[i].name);
        return true;
        }
    }
}

