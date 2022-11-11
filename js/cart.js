let userID = 25801
const lista = document.querySelector('.producto-list-container');
const link = "https://japceibal.github.io/emercado-api/user_cart/" + userID + ".json";
let listarproducto = []
let botonCompra = document.getElementById("finalizarCompra");
let radioInputs = document.getElementById("radio-inputs");
let inputCalle = document.getElementById("inputCalle");
let inputEsquina = document.getElementById("inputEsquina");
let inputNumero = document.getElementById("inputNumero");
let formaPago = document.getElementById("formaPago");
let gridTarjeta = document.getElementById("gridTarjeta");
let gridTransferencia = document.getElementById("gridTransferencia");
let cardNum = document.getElementById("cardNum");
let cardSeg = document.getElementById("cardSeg");
let cardExp = document.getElementById("cardExp");
let bankNum = document.getElementById("bankNum");
let formModal = document.getElementById("form-modal");
let seleccionarPago = document.getElementById("seleccionarPago");
let innerForma = document.getElementById("innerForma");
subtotal = document.getElementById("subtotal");
envioUSD = document.getElementById("envioUSD");
totalUSD = document.getElementById("totalUSD");
let impuestoEnvio
let form = document.getElementById("form");
let userMenu = document.getElementById("userMenu");
let localuser = localStorage.getItem("usuario");
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


document.addEventListener("DOMContentLoaded", async function() {
    
    listarproducto = await getJSONData(link);
    
    listarproducto.data.articles.forEach(com => {
     getHTMLC(com)
    });
    
});

   //Actualiza segun la seleccion de envio
document.getElementById("gridPremium").addEventListener("click", () => {
  impuestoEnvio = 0.15
  envioUSD.innerHTML = Math.round(listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value * 0.15)
  totalUSD.innerHTML =  (listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value) + Math.round(listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value * impuestoEnvio)
})

document.getElementById("gridExpress").addEventListener("click", () => {
  impuestoEnvio = 0.07
  envioUSD.innerHTML = Math.round(listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value * 0.07)
  totalUSD.innerHTML =  (listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value) + Math.round(listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value * impuestoEnvio)
})

document.getElementById("gridStandard").addEventListener("click", () => {
  impuestoEnvio = 0.05
  envioUSD.innerHTML = Math.round(listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value * 0.05)
  totalUSD.innerHTML =  (listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value) + Math.round(listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value * impuestoEnvio)
})

   //Imprime los productos
function getHTMLC(producto) {
  
  lista.innerHTML = `
    <div class="list-group producto-list-container  ">
      <div class="cart-group-item cart-group-item-action ">

        <div class="row border border-warning overflow-hidden bg-white col-10 d-flex mx-auto">
        <div style="color:rgb(255, 255, 255); background-color:rgb(31, 31, 31);"  class="">
          <div class="d-flex justify-content-between mx-auto">
            <img class="img-fluid col-1" src="${producto.image}" alt="">
            <p>${producto.name}</p>
            <p>${producto.currency}${producto.unitCost}</p>
            <input id="cantidadCarrito" type="number" min="1" value="${producto.count}" onchange="actualizarPrecio()">
            <p>${producto.currency}${producto.unitCost * producto.count}</p>
          </div>
        </div>
        </div>
    </div>
    </div>
    `;
    subtotal.innerHTML =  (producto.unitCost * document.getElementById("cantidadCarrito").value)
  
  };


function actualizarPrecio(){
  listarproducto.data.articles[0].count = document.getElementById("cantidadCarrito").value
  listarproducto.data.articles.forEach(com => {
   getHTMLC(com)
    
  });
  subtotal.innerHTML =  (listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value)
  envioUSD.innerHTML = Math.round(listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value * impuestoEnvio)
  totalUSD.innerHTML =  (listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value) + Math.round(listarproducto.data.articles[0].unitCost * document.getElementById("cantidadCarrito").value * impuestoEnvio)
};


function chequearInputs() {
  if (inputCalle.value === ""){
    inputCalle.classList.add("is-invalid")
  }else {
    inputCalle.classList.remove("is-invalid")
    inputCalle.classList.add("is-valid")
  }

  if (inputEsquina.value === ""){
    inputEsquina.classList.add("is-invalid")
  }else {
    inputEsquina.classList.remove("is-invalid")
    inputEsquina.classList.add("is-valid")
  }

  if (inputNumero.value === ""){
    inputNumero.classList.add("is-invalid")
  }else {
    inputNumero.classList.remove("is-invalid")
    inputNumero.classList.add("is-valid")
  }
};

   //Desactiva la otra forma de pago
gridTarjeta.addEventListener("click", () => {
  bankNum.setAttribute("disabled", "")
  bankNum.value = ""
  
  cardExp.removeAttribute("disabled")
  cardNum.removeAttribute("disabled")
  cardSeg.removeAttribute("disabled")
  innerForma.innerHTML = "Tarjeta de crédito"
})

   //Desactiva la otra forma de pago
gridTransferencia.addEventListener("click", () => {
  bankNum.removeAttribute("disabled")
  cardExp.setAttribute("disabled", "")
  cardNum.setAttribute("disabled", "")
  cardSeg.setAttribute("disabled", "")
  cardExp.value = ""
  cardNum.value = ""
  cardSeg.value = ""
  innerForma.innerHTML = "Transferencia bancaria"

});

  //Al hacer click en el boton revisa la validez del form 
form.addEventListener("submit", (e) => {
  e.preventDefault()  

  if (!form.checkValidity()){
    chequearInputs()
    seleccionarPago.innerHTML = "Debe seleccionar una forma de pago y completar los datos correspondientes.";
    seleccionarPago.style.color = 'red';
  } 

  if(form.checkValidity() && formModal.checkValidity()) {
    chequearInputs()
    document.getElementById("alert-success").classList.add("show");
    seleccionarPago.innerHTML = "";
  }
});