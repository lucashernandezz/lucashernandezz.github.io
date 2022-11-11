let categories =  localStorage.getItem('catID');
const link = "https://japceibal.github.io/emercado-api/cats_products/" + categories + ".json";

const ORDER_ASC_BY_PRICE = "1-9";
const ORDER_DESC_BY_PRICE = "9-1";
const ORDER_BY_SOLD_COUNT = "Vendidos";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
const lista = document.querySelector('.product-list-container');

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

   //funcion que clasifica segun el criterio seleccionado
function sortCategories(criteria, array){
    
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
};

   //Toma el id del producto seleccionado para dirigirnos a la pagina de dicho producto
function setProductID(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
}

   //Imprime los productos en base al orden de criterio
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let product = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row border border-warning overflow-hidden mb-3 bg-white">
            <div class="col-3 p-0">
              <img class="img-fluid" src="${product.image}" alt="">
            </div>
            <div style="color:rgb(255, 255, 255); background-color:rgb(31, 31, 31);"  class="col-9 d-flex flex-column justify-content-between">
               <div class="d-flex justify-content-between">
                <h3>${product.name}</h3>
                    <div class="Cantvent">
                        <p>Vendidos:  <span class="cantven">${product.soldCount}</span></p>
                    </div>        
                </div>  
              <div class="d-flex justify-content-between">
               <p>${product.description}</p>
                <div class="Precio">
                  <span class="moneda">${product.currency}</span>
                  <span class="Precio">${product.cost}</span>
                </div>
             </div>
            </div>
            </div>
        </div>
        `;
        }

        lista.innerHTML = htmlContentToAppend;
    }
};


function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(link).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products
            showProductsList()
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();

    });
});
