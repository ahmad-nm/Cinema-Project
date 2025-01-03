function myFunction() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

document.getElementById("Login").addEventListener('click', (e) => {
    e.preventDefault();

    let password = document.getElementById("Password").value;
    let email = document.getElementById("Username").value;
    let alertDiv = document.getElementById("alert");

    document.getElementById("Password").style.border = "";
    document.getElementById("Username").style.border = "";
    alertDiv.innerHTML = "";
    let alertEmailDiv = document.getElementById("email-alert");

    if (!email) {
        document.getElementById("Username").style.border = "2px solid red";
        alertEmailDiv.style.display = "block";
        alertEmailDiv.innerHTML = "Username / Email is required";
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

    window.location.href = "../Project.html";
});