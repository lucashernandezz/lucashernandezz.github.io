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


let localuser = localStorage.getItem("user")

function link() {
    var a = document.createElement('a');
    var linkText = document.createTextNode(localuser);
    a.appendChild(linkText);
    a.href = "my-profile.html";
    document.body.appendChild(a);
}
link()