let productos = [];
let productosOrdenados=[];

function showProductsList(array){
    let htmlContentToAppend = "";


    for (let i = 0; i < array.length; i++){ 
        let producto = array[i];
        
        htmlContentToAppend += `
        <div onclick="setCatID(${producto.id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ producto.name + " - " + producto.currency + " " + producto.cost + `</h4> 
                        <p> `+ producto.description +`</p> 
                        </div>
                        <small class="text-muted">` + producto.soldCount + ` ventas</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}
function filtrarRango(){
    let rango=[];
    precioMinimo=document.getElementById('precioMinimo').value;
    precioMaximo=document.getElementById('precioMaximo').value;
    if (precioMinimo==undefined || precioMinimo==""){
        precioMinimo=0;
        precioMaximo=parseInt(precioMaximo);
        rango=productos.filter(precio => precio.cost >= precioMinimo && precio.cost <= precioMaximo);
    } else if (precioMaximo==undefined || precioMaximo==""){
        precioMinimo=parseInt(precioMinimo);
        rango=productos.filter(precio => precio.cost >= precioMinimo);
    } else {
        precioMinimo=parseInt(precioMinimo);
        precioMaximo=parseInt(precioMaximo);
        rango=productos.filter(precio => precio.cost >= precioMinimo && precio.cost <= precioMaximo);
    }
    rango.sort((producto1,producto2)=>producto1.cost-producto2.cost);
    showProductsList(rango);
}
function limpiarRango(){
    document.getElementById('precioMinimo').value=""; 
    document.getElementById('precioMaximo').value=""; 
    showProductsList(productos);   
}
function precioDescendente(){
    productosOrdenados=productos.slice(0,productos.length);
    productosOrdenados.sort((producto1,producto2)=>producto2.cost-producto1.cost);  
    showProductsList(productosOrdenados);   
}
function precioAscendente(){
    productosOrdenados=productos.slice(0,productos.length);
    productosOrdenados.sort((producto1,producto2)=>producto1.cost-producto2.cost);  
    showProductsList(productosOrdenados);
}
function Relevancia(){
    productosOrdenados=productos.slice(0,productos.length);
    productosOrdenados.sort((producto1,producto2)=>producto2.soldCount-producto1.soldCount);  
    showProductsList(productosOrdenados);
}
function setCatID(id) {
    localStorage.setItem("idProducto", id);
    location.href = "product-info.html";
}




document.addEventListener("DOMContentLoaded", function(e){

    id=localStorage.getItem('catID');

    getJSONData(PRODUCTS_URL+id+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            document.getElementById('presentacion').innerHTML="Verás aquí todos los productos de la categoría " + resultObj.data.catName;
            productos = resultObj.data.products;
            showProductsList(productos);
        }
    });

    document.getElementById('filtrarRango').addEventListener('click', ()=> { 
        filtrarRango();
    })

     document.getElementById('limpiarRango').addEventListener('click',()=> {
        limpiarRango();
    
    })

    document.getElementById('precioDescendente').addEventListener('click', ()=> { 
        precioDescendente();
    })

    document.getElementById('precioAscendente').addEventListener('click', ()=> { 
        precioAscendente();
    })
    
    document.getElementById('Relevancia').addEventListener('click', ()=> { 
        Relevancia();
    })
    
})
