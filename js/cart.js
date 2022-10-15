let userID = 25801
const link = "https://japceibal.github.io/emercado-api/user_cart/" + userID + ".json";

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
    const lista = document.querySelector('.producto-list-container');
    const listarproducto = await getJSONData(link);

    lista.innerHTML += getHTMLC(listarproducto.data)

});

function getHTMLC(producto) {
    return `
    <div class="list-group producto-list-container">
      <div class="cart-group-item cart-group-item-action">
        <div class="row border border-warning overflow-hidden bg-white">
        <div style="color:rgb(255, 255, 255); background-color:rgb(31, 31, 31);"  class="">
          <div class="d-flex justify-content-between mx-auto">
            <img class="img-fluid" src="${producto.image}" alt="">
            <p>${producto.name}</p>
            <p>${producto.currency}${producto.unitCost}</p>
            <p>${producto.count}</p>
            <p>${producto.unitCost}</p>
          </div>
        </div>
        </div>
    </div>
    </div>
    `;
  };



