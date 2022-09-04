let categories =  localStorage.getItem('catID')
const link = "https://japceibal.github.io/emercado-api/cats_products/" + categories + ".json";

let userMenu = document.getElementById("userMenu")
let localuser = localStorage.getItem("usuario")
userMenu.innerHTML += `<a class="nav-link" href="my-profile.html">${localuser}</a>`

document.addEventListener('DOMContentLoaded', async function() {
    const lista = document.querySelector('.product-list-container');

    const listaproductos = await getJSONData(link);

    for (let products of listaproductos.data.products) {
        lista.innerHTML += getHTML(products)
    }
});

function getHTML(producto) {
    return `
    <div class="row border border-warning overflow-hidden mb-3 bg-white">
        <div class="col-3 p-0">
          <img class="img-fluid" src="${producto.image}" alt="">
        </div>
        <div style="color:rgb(255, 255, 255); background-color:rgb(31, 31, 31);"  class="col-9 d-flex flex-column justify-content-between">
           <div class="d-flex justify-content-between">
            <h3>${producto.name}</h3>
                <div class="Cantvent">
                    <p>Vendidos:  <span class="cantven">${producto.soldCount}</span></p>
                </div>        
            </div>  
          <div class="d-flex justify-content-between">
           <p>${producto.description}</p>
            <div class="Precio">
              <span class="moneda">${producto.currency}</span>
              <span class="Precio">${producto.cost}</span>
            </div>
         </div>
        </div>
    </div>
    `;
}

