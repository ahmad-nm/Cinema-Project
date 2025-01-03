function showPassword() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showConfirmationPassword() {
    var x = document.getElementById("Confirm-Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

document.getElementById("SignUp").addEventListener('click', (e) => {
    e.preventDefault();

    let password = document.getElementById("Password").value;
    let confirmPassword = document.getElementById("Confirm-Password").value;
    let email = document.getElementById("Email").value;
    let Username = document.getElementById("Username").value;
    let alertDiv = document.getElementById("password-alert");
    let alertEmailDiv = document.getElementById("email-alert");
    let alertUsernameDiv = document.getElementById("username-alert");
    let alertConfirmPasswordDiv = document.getElementById("confirm-alert");

    document.getElementById("Password").style.border = "";
    document.getElementById("Username").style.border = "";
    alertDiv.innerHTML = "";

    if (!Username){
        document.getElementById("Username").style.border = "2px solid red";
        alertUsernameDiv.style.display = "block";
        alertUsernameDiv.innerHTML = "Username is required";
        return false;
    }

    if (!email) {
        document.getElementById("Username").style.border = "2px solid red";
        alertEmailDiv.style.display = "block";
        alertEmailDiv.innerHTML = "Email is required";
        return false;
    }

    if (!password) {
        document.getElementById("Password").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password is required";
        return false;
    }

    if(password.length < 8 || password.length > 16){
        document.getElementById("Password").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password must be 8 - 16 characters long";
        return false;
    }
    else if(!password.match(/[A-Z]/)){
        document.getElementById("Password").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password must contain at least one uppercase letter";
        return false;
    }
    else if(!password.match(/[0-9]/)){
        document.getElementById("Password").style.border = "2px solid red";
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "Password must contain at least one number";
        return false;
    }

    if (password !== confirmPassword) {
        document.getElementById("Password").style.border = "2px solid red";
        document.getElementById("Confirm-Password").style.border = "2px solid red";
        alertConfirmPasswordDiv.style.display = "block";
        alertConfirmPasswordDiv.innerHTML = "Passwords does not match";
        return false;
    }

    window.location.href = "../Project.html";
});