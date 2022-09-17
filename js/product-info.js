let userMenu = document.getElementById("userMenu")
let localuser = localStorage.getItem("usuario")
userMenu.innerHTML += `<a class="nav-link" href="my-profile.html">${localuser}</a>`;

let products =  localStorage.getItem('ProductID')
const linkProduct = "https://japceibal.github.io/emercado-api/products/" + products + ".json";



document.addEventListener("DOMContentLoaded", async function() {
    const lista = document.querySelector('.producto-list-container');
    const listarproducto = await getJSONData(linkProduct);
    console.log(listarproducto)
    lista.innerHTML += getHTML(products)


});

function getHTML(products) {
    return `
    <div class="row border border-warning overflow-hidden mb-3 bg-white">
            <div class="col-3 p-0">
              <img class="img-fluid" src="${products.image}" alt="">
            </div>
            <div style="color:rgb(255, 255, 255); background-color:rgb(31, 31, 31);"  class="col-9 d-flex flex-column justify-content-between">
               <div class="d-flex justify-content-between">
                <h3>${products.name}</h3>
                    <div class="Cantvent">
                        <p>Vendidos:  <span class="cantven">${products.soldCount}</span></p>
                    </div>        
                </div>  
              <div class="d-flex justify-content-between">
               <p>${products.description}</p>
                <div class="Precio">
                  <span class="moneda">${products.currency}</span>
                  <span class="Precio">${products.cost}</span>
                </div>
             </div>
            </div>
         </div>
    `;
}