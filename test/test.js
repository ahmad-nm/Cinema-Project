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