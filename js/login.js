const email = document.getElementById('correo');
const password = document.getElementById('contra');

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