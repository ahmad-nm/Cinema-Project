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

function confirmPasswordToggle() {
    let confirmPasswordInput = document.getElementById("confirm-password-input");
    let confirmtogglelink = document.getElementById("confirm-pass-toggle");

    if (confirmPasswordInput.type === "password") {
        confirmtogglelink.innerHTML = "Hide <i class='bx bx-hide'></i>";
        confirmPasswordInput.type = "text";
    } else {
        confirmtogglelink.innerHTML = "Show <i class='bx bx-show-alt'></i>";
        confirmPasswordInput.type = "password";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pass-toggle").addEventListener("click", togglePassword);
    document.getElementById("confirm-pass-toggle").addEventListener("click", confirmPasswordToggle);
});

document.getElementById("signup-button").addEventListener('click', (e) => {
    e.preventDefault();

    let password = document.getElementById("password-input").value;
    let username = document.getElementById("signup-input").value;
    let email = document.getElementById("email-input").value;
    let confirmPassword = document.getElementById("confirm-password-input").value;
    let Useralert = document.getElementById("username-alert");
    let alertDiv = document.getElementById("password-alert");
    let alertEmailDiv = document.getElementById("email-alert");
    let alertConfirmPasswordDiv = document.getElementById("confirm-password-alert");

    document.getElementById("password-input").style.border = "";
    document.getElementById("signup-input").style.border = "";
    document.getElementById("email-input").style.border = "";
    document.getElementById("confirm-password-input").style.border = "";
    alertDiv.innerHTML = "";

    if(username === "") {
        document.getElementById("signup-input").style.border = "2px solid red";
        Useralert.style.display = "block";
        Useralert.innerHTML = "⚠️ Username cannot be empty";
        return false;
    }
    else {
        Useralert.style.display = "none";
    }

    if(email === "") {
        document.getElementById("email-input").style.border = "2px solid red";
        alertEmailDiv.style.display = "block";
        alertEmailDiv.innerHTML = "⚠️ Email cannot be empty";
        return false;
    }
    else if(email.includes("@") === false || email.includes(".") === false) {
        document.getElementById("email-input").style.border = "2px solid red";
        alertEmailDiv.style.display = "block";
        alertEmailDiv.innerHTML = "⚠️ Email is invalid";
        return false;
    }
    else {
        alertEmailDiv.style.display = "none";
    }

    if(password === "") {
        document.getElementById("password-input").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "⚠️ Password cannot be empty";
        return false;
    }
    else {
        alertDiv.style.display = "none";
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
        alertDiv.innerHTML = "Password must contain at least one uppercase";
        return false;
    }
    else if(!password.match(/[0-9]/)){
        document.getElementById("password-input").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password must contain at least one number";
        return false;
    }
    else {
        alertDiv.style.display = "none";
    }

    if (password !== confirmPassword) {
        document.getElementById("password-input").style.border = "2px solid red";
        document.getElementById("confirm-password-input").style.border = "2px solid red";
        alertConfirmPasswordDiv.style.display = "block";
        alertConfirmPasswordDiv.innerHTML = "⚠️ Passwords do not match";
        return false;
    }
    else {
        alertConfirmPasswordDiv.style.display = "none";
    }

    window.location.href = "../Project.html";
});