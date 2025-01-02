function togglePassword() {
    let passwordInput = document.getElementById("password-input");
    let toggleLink = document.getElementById("pass-toggle");

    if (passwordInput.type === "password") {
        toggleLink.innerHTML = "Hide <i class='bx bx-hide'></i>";
        passwordInput.type = "text";
    } else {
        toggleLink.innerHTML = "Show <i class='bx bx-show-alt'></i>";
        passwordInput.type = "password";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pass-toggle").addEventListener("click", togglePassword);
});

document.getElementById("login-button").addEventListener('click', (e) => {
    e.preventDefault();

    let password = document.getElementById("password-input").value;
    let username = document.getElementById("login-input").value;
    let Useralert = document.getElementById("username-alert");
    let alertDiv = document.getElementById("password-alert");

    document.getElementById("password-input").style.border = "";
    document.getElementById("login-input").style.border = "";
    alertDiv.innerHTML = "";

    if(username === "") {
        document.getElementById("login-input").style.border = "2px solid red";
        Useralert.style.display = "block";
        Useralert.innerHTML = "Username cannot be empty";
        return false;
    }

    if(password === "") {
        document.getElementById("password-input").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password cannot be empty";
        return false;
    }

    if(password.length < 8 || password.length > 16){
        document.getElementById("password-input").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password must be 8 - 16 characters long";
        return false;
    }
    else if(!password.match(/[A-Z]/)){
        document.getElementById("password-input").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password must contain at least one uppercase letter";
        return false;
    }
    else if(!password.match(/[0-9]/)){
        document.getElementById("password-input").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password must contain at least one number";
        return false;
    }

    window.location.href = "../Project.html";
});