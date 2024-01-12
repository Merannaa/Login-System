//Dom elements
var userInput=document.querySelector('#userInput')
var emailInput=document.querySelector('#emailInput')
var passwordInput=document.querySelector('#passwordInput')
var signup=document.querySelector('#logupButton')
var container=document.querySelector('.container')
var signupButtonLink = document.querySelector("#signupButtonLink");
var signupButton = document.querySelector("#signupButton")

// Message elements
var paragraphIncorrect = document.querySelector(".p-incorrect");
var paragraphRequired = document.querySelector(".p-required");
var paragraphSuccess = document.querySelector(".p-success");
var paragraphExists = document.querySelector(".p-exists");
var nameWrong = document.querySelector(".name-wrong");
var emailWrong = document.querySelector(".email-wrong");

// Regex patterns
var passwordWrong = document.querySelector(".password-wrong");
var emailRegex =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

var user_array = [];

if (JSON.parse(localStorage.getItem("user")) != null) {
    user_array = JSON.parse(localStorage.getItem("user"));

    console.log(user_array);
}

//check if no value
signup.addEventListener('click', function(){
    // console.log('hi');
    // container.classList.add("sign-up-mode")
    if(userInput.value == "" || 
    emailInput.value == "" || 
    passwordInput.value == ""){
        paragraphRequired.classList.replace('d-none','d-block')
    }else{
        paragraphRequired.classList.replace('d-block','d-none');
        signUpForm()
    }
})
signinButton.addEventListener('click',function(){
    signinButton.setAttribute("href", "index.html");
})

  // Validate Name
userInput.addEventListener("keyup", function () {
    if (userInput.value.length < 3) {
        userInput.classList.add("is-invalid");
        userInput.classList.add("form-control-wrong");
        nameWrong.classList.replace("d-none", "d-block");
    } else {
        userInput.classList.replace("is-invalid", "is-valid");
        nameWrong.classList.replace("d-block", "d-none");
        userInput.classList.replace("form-control-wrong", "form-control-right");
    }
});

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

  // Validate password
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

//function to sign-up
function signUpForm(){
    if (
        userInput.value.length < 3 ||
        emailRegex.test(emailInput.value) == false ||
        passwordRegex.test(passwordInput.value) == false
    ) {
        paragraphIncorrect.classList.replace("d-none", "d-block");
    } else {
        if (checkForm() == false) {
            paragraphExists.classList.replace("d-none", "d-block");
            paragraphSuccess.classList.replace("d-block", "d-none");
        } else {
    var user = {
        name: userInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    user_array.push(user)
    localStorage.setItem('user',JSON.stringify(user_array))
    clearForm()
    signupButtonLink.setAttribute("href", "index.html");
    paragraphExists.classList.replace("d-block", "d-none");
    paragraphSuccess.classList.replace("d-none", "d-block");
    console.log(user_array);
        }
    }
}
function clearForm(){
    userInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    userInput.classList.remove("is-valid");
    emailInput.classList.remove("is-valid");
    passwordInput.classList.remove("is-valid");
    userInput.classList.remove("form-control-right");
    emailInput.classList.remove("form-control-right");
    passwordInput.classList.remove("form-control-right");
}

// Check if user exist
function checkForm() {
    for (let i = 0; i < user_array.length; i++) {
        if (emailInput.value.toLowerCase() == user_array[i].email.toLowerCase()) {
        return false;
        }
    }
}
