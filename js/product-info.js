let userMenu = document.getElementById("userMenu");
let localuser = localStorage.getItem("usuario");
userMenu.innerHTML += `${localuser}`
let cerrarSesion = document.getElementById('cerrarSesion');
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

let products =  localStorage.getItem('ProductID');
const linkProduct = "https://japceibal.github.io/emercado-api/products/" + products + ".json";
const linkcomentarios = "https://japceibal.github.io/emercado-api/products_comments/" + products + ".json";



document.addEventListener("DOMContentLoaded", async function() {
    const lista = document.querySelector('.producto-list-container');
    const comentarios = document.querySelector('.comentario-list-container');
    const relacionados = document.querySelector('.relacionados-list-container');
    const listarproducto = await getJSONData(linkProduct);
    const listarcomentario = await getJSONData(linkcomentarios);
    lista.innerHTML += getHTMLP(listarproducto.data)

        listarproducto.data.images.forEach(img => {
      lista.innerHTML += `<div class="d-flex row border border-warning overflow-hidden mb-3 bg-white"><img class="img-fluid" src="${img}" alt="" width="500" height="600"></div>`
    });

    listarcomentario.data.forEach(com => {
      comentarios.innerHTML += getHTMLC(com)
    });

    listarproducto.data.relatedProducts.forEach(rel => {
      relacionados.innerHTML += getHTMLrel(rel)
    });
});

   //La funcion se encarga de imprimir la cantidad de estrellas en base al valor que tome
function estrellitas(num) {
  let starAgregar = ""
  const starCompleta = `<span class="fa fa-star checked"></span>`;
  const starVacia = `<span class="fa fa-star"></span>`;
  starAgregar = starCompleta.repeat(num) + starVacia.repeat(5-num)
  return starAgregar
};

   //Imprime los productos
function getHTMLP(producto) {
    return `
         <br>
         <h2>${producto.name}</h2>
         <hr>
         <b>Precio:</b>
         <p>$${producto.cost}</p>
         <b>Descripci??n:</b>
         <p>${producto.description}</p>
         <b>Categor??a:</b>
         <p>${producto.category}</p>
         <b>Cantidad de vendidos:</b>
         <p>${producto.soldCount}</p>
         <b>Im??genes ilustrativas:</b>
    `;
};

   //Imprime los comentarios
function getHTMLC(product) {
  return `
  <div class="row border border-warning overflow-hidden mb-3 bg-white">
  <br>
  <div>
  <b><span>${product.user}</span></b>
  <span> (${product.dateTime}) </span>
</div>
<div>
<b><span>Opini??n:</span></b>
<span>${product.description}</span>
</div>
<div>
<b><span>Puntuaci??n:</span></b>
<span>${estrellitas(product.score)}</span>
${product.score}
</div>
</div>
  `;
};

   //Imprime los productos relacionados
function getHTMLrel(rel) {
  return `
       <br>
       <div onclick="setRelID(${rel.id})" class="card border-warning cursor-active" width: 18rem;">
      <img src="${rel.image}" class="card-img-top" alt="...">
      <div class="card-body">
      <hr>
      <h3 style="text-align: center ;">${rel.name}</h3>
      </div>
      </div>
       
  `;
};

   //Toma el id del producto relacionado para dirigirnos a la pagina de dicho producto
function setRelID(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html"
};