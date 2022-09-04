let email = document.getElementById('correo');
let password = document.getElementById('contra');
let boton = document.getElementById('regBtn')



function redirect() {
    if (email.value.length >= 1 && password.value.length >= 1 ) {
        window.location.replace('/home.html')
    } else{
        showAlertError()
    }
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.addEventListener("DOMContentLoaded", function () {
    boton.addEventListener("click", function() {
        localStorage.setItem("usuario", email.value);
    });
});