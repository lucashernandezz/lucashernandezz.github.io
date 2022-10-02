document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

let userMenu = document.getElementById("userMenu")
let localuser = localStorage.getItem("usuario")
userMenu.innerHTML += `${localuser}`

let cerrarSesion = document.getElementById('cerrarSesion')
document.addEventListener("DOMContentLoaded", function () {
    cerrarSesion.addEventListener("click", function() {
        localStorage.removeItem("usuario");
    });
});