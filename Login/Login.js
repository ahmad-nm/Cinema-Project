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
    let alertDiv = document.getElementById("password-alert");

    document.getElementById("password-input").style.border = "";
    document.getElementById("login-input").style.border = "";
    alertDiv.innerHTML = "";

    let userInfo = localStorage.getItem("user");

    if(userInfo === null){
        alertDiv.style.display = "block";
        alertDiv.innerHTML = "User not found";
        return false;
    }
    else{
        userInfo = JSON.parse(userInfo);
        if(userInfo.password !== password){
            alertDiv.style.display = "block";
            alertDiv.innerHTML = "Incorrect password";
            return false;
        }
        if(userInfo.username !== username){
            alertDiv.style.display = "block";
            alertDiv.innerHTML = "Incorrect username";
            return false;
        }

        const sessionData = {
            username: username,
            loggedIn: true,
            loginTime: new Date().getTime(),
            expiresAt: new Date().getTime() + (365 * 24 * 60 * 60 * 1000)
        };
        console.log(sessionData);
        localStorage.setItem('sessionData', JSON.stringify(sessionData));
        window.location.href = "../Project.html";
    }
});