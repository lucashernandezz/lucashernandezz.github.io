let userMenu = document.getElementById("userMenu")
let localuser = localStorage.getItem("usuario")
userMenu.innerHTML += `${localuser}`
let cerrarSesion = document.getElementById('cerrarSesion')
document.addEventListener("DOMContentLoaded", function () {
    cerrarSesion.addEventListener("click", function() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("PrimerNombre");
        localStorage.removeItem("SegundoNombre");
        localStorage.removeItem("PrimerApellido");
        localStorage.removeItem("SegundoApellido");
        localStorage.removeItem("Telefono");


    });
});

let primerNombre = document.getElementById("primerNombre");
let segundoNombre = document.getElementById("segundoNombre");
let primerApellido = document.getElementById("primerApellido");
let segundoApellido = document.getElementById("segundoApellido");
let email = document.getElementById("email");
let telefono = document.getElementById("telefono");
let guardarCambios = document.getElementById("guardarCambios");
let form = document.getElementById("form");
let localPrimerN = localStorage.getItem("PrimerNombre");
let localSegundoN = localStorage.getItem("SegundoNombre");
let localPrimerA = localStorage.getItem("PrimerApellido");
let localSegundoA = localStorage.getItem("SegundoApellido");
let localTelefono = localStorage.getItem("Telefono");


email.value = localuser
primerNombre.value = localPrimerN
segundoNombre.value = localSegundoN
primerApellido.value = localPrimerA
segundoApellido.value = localSegundoA
telefono.value = localTelefono


function chequearInputs() {
    if (primerNombre.value === ""){
      primerNombre.classList.add("is-invalid")
    }else {
      primerNombre.classList.remove("is-invalid")
      primerNombre.classList.add("is-valid")
    }
  
    if (primerApellido.value === ""){
      primerApellido.classList.add("is-invalid")
    }else {
      primerApellido.classList.remove("is-invalid")
      primerApellido.classList.add("is-valid")
    }
  
    if (email.value === ""){
      email.classList.add("is-invalid")
    }else {
      email.classList.remove("is-invalid")
      email.classList.add("is-valid")
    }

    if (telefono.value === ""){
        telefono.classList.add("is-invalid")
      }else {
        telefono.classList.remove("is-invalid")
        telefono.classList.add("is-valid")
      }
  };

    //Al hacer click en el boton revisa la validez del form 
  form.addEventListener("submit", (e) => {
    e.preventDefault()  
  
    if (!form.checkValidity()) {
      chequearInputs()  
    } 
  
    if(form.checkValidity()) {
      chequearInputs()
      localStorage.setItem("usuario", email.value)
      localStorage.setItem("PrimerNombre", primerNombre.value)
      localStorage.setItem("SegundoNombre", segundoNombre.value)
      localStorage.setItem("PrimerApellido", primerApellido.value)
      localStorage.setItem("SegundoApellido", segundoApellido.value)
      localStorage.setItem("Telefono", telefono.value)
    }
  });