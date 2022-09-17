let userMenu = document.getElementById("userMenu")
let localuser = localStorage.getItem("usuario")
userMenu.innerHTML += `<a class="nav-link" href="my-profile.html">${localuser}</a>`;

let products =  localStorage.getItem('ProductID')
const linkProduct = "https://japceibal.github.io/emercado-api/products/" + products + ".json";
const linkcomentarios = "https://japceibal.github.io/emercado-api/products_comments/" + products + ".json";



document.addEventListener("DOMContentLoaded", async function() {
    const lista = document.querySelector('.producto-list-container');
    const comentarios = document.querySelector('.comentario-list-container');
    const listarproducto = await getJSONData(linkProduct);
    const listarcomentario = await getJSONData(linkcomentarios);
    lista.innerHTML += getHTMLP(listarproducto.data)

        listarproducto.data.images.forEach(img => {
      lista.innerHTML += `<div class="d-flex row border border-warning overflow-hidden mb-3 bg-white"><img class="img-fluid" src="${img}" alt="" width="500" height="600"></div>`
    });

    listarcomentario.data.forEach(com => {
      comentarios.innerHTML += getHTMLC(com)
    });
});

function estrellitas(num) {
  let starAgregar = ""
  const starCompleta = `<span class="fa fa-star checked"></span>`;
  const starVacia = `<span class="fa fa-star"></span>`;
  starAgregar = starCompleta.repeat(num) + starVacia.repeat(5-num)
  return starAgregar
};

function getHTMLP(producto) {
    return `
         <br>
         <h2>${producto.name}</h2>
         <hr>
         <b>Precio:</b>
         <p>$${producto.cost}</p>
         <b>Descripción:</b>
         <p>${producto.description}</p>
         <b>Categoría:</b>
         <p>${producto.category}</p>
         <b>Cantidad de vendidos:</b>
         <p>${producto.soldCount}</p>
         <b>Imágenes ilustrativas:</b>
    `;
};

function getHTMLC(product) {
  return `
  <div class="row border border-warning overflow-hidden mb-3 bg-white">
  <br>
  <div>
  <b><span>${product.user}</span></b>
  <span> (${product.dateTime}) </span>
</div>
<div>
<b><span>Opinión:</span></b>
<span>${product.description}</span>
</div>
<div>
<b><span>Puntuación:</span></b>
<span>${estrellitas(product.score)}</span>
${product.score}
</div>
</div>
  `;
};