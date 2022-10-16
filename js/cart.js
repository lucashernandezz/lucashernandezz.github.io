let userID = 25801
const lista = document.querySelector('.producto-list-container');
const link = "https://japceibal.github.io/emercado-api/user_cart/" + userID + ".json";
let listarproducto = []

let userMenu = document.getElementById("userMenu")
let localuser = localStorage.getItem("usuario")
userMenu.innerHTML += `${localuser}`
let cerrarSesion = document.getElementById('cerrarSesion')
document.addEventListener("DOMContentLoaded", function () {
    cerrarSesion.addEventListener("click", function() {
        localStorage.removeItem("usuario");
    });
});

document.addEventListener("DOMContentLoaded", async function() {
    
    listarproducto = await getJSONData(link);

    listarproducto.data.articles.forEach(com => {
      lista.innerHTML += getHTMLC(com)
    });

});

function getHTMLC(producto) {
    return `
    <div class="list-group producto-list-container  ">
      <div class="cart-group-item cart-group-item-action ">

        <div class="row border border-warning overflow-hidden bg-white col-10 d-flex mx-auto">
        <div style="color:rgb(255, 255, 255); background-color:rgb(31, 31, 31);"  class="">
          <div class="d-flex justify-content-between mx-auto">
            <img class="img-fluid col-1" src="${producto.image}" alt="">
            <p>${producto.name}</p>
            <p>${producto.currency}${producto.unitCost}</p>
            <input id="cantidadCarrito" type="number" min="0" value="${producto.count}" onchange="actualizarPrecio()">
            <p>${producto.currency}${producto.unitCost * producto.count}</p>
          </div>
        </div>
        </div>
    </div>
    </div>
    `;
  };

function actualizarPrecio(){
  listarproducto.data.articles[0].count = document.getElementById("cantidadCarrito").value
  listarproducto.data.articles.forEach(com => {
    lista.innerHTML = getHTMLC(com)
  });
}

