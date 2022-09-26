let producto=[];
let comentarios=[];

function mostrarProducto(){
    let agregarHTML="";

    document.getElementById('nombreProducto').innerHTML=producto.name;

    agregarHTML = `
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                  ${carrusel(producto.images)}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            `
    document.getElementById('carrusel').innerHTML=agregarHTML;

    document.getElementById('precio').innerHTML=producto.currency + " " + producto.cost;

    document.getElementById('descripcion').innerHTML=producto.description;

    document.getElementById('categoria').innerHTML=producto.category;

    document.getElementById('cantidadVendidos').innerHTML=producto.soldCount;



}

function mostrarProductoRelacionado(){
    let agregarHTML="";
    for (let prodRelacionado of producto.relatedProducts) {
        agregarHTML+= `
                <div onclick="setCatID(${prodRelacionado.id})" class="col-md-4 cursor-active">
                     <div class="card mb-4 shadow-sm">
                        <img class="card-img-top" style="height: 250px; width: 100%; display: block;" src="${prodRelacionado.image}" data-holder-rendered="true">
                         <div class="card-body">
                            <h4>${prodRelacionado.name}</h4>
                        </div>
                     </div>
                </div>`
        
    }
    document.getElementById('prodRel').innerHTML=agregarHTML;
}

function carrusel(arrayImagenes){
    let htmlCarrusel="";
    let i=0;
    for (let imagen of arrayImagenes) {
        if (i==0){
            htmlCarrusel+= `
            <div class="carousel-item active">
            <img src="${imagen}" class="d-block w-100" alt="...">
         </div>`;
        } else {
            htmlCarrusel+= ` <div class="carousel-item">
            <img src="${imagen}" class="d-block w-100" alt="...">
        </div> `;
        }
        i++;

        
    }
    return htmlCarrusel;

}

function botonesCarrusel(arrayImagenes){
    let htmlBotones="";
    for (let i = 0; i < arrayImagenes.length; i++) {
        if (i==0){
            htmlBotones+= `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`
        } else {
             htmlBotones+= `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`
        }
        
    }
    return htmlBotones;

}

function mostrarComentarios(array){
    let agregarHTML="";
    for (let comentario of array) {
        agregarHTML+= `<li class="list-group-item"> <strong>${comentario.user}</strong> - ${comentario.dateTime} - ${estrellas(comentario.score)} <br> ${comentario.description} </li> `
 
    }
    document.getElementById('listaComentarios').innerHTML=agregarHTML;


}

function estrellas(puntuacion){
    let agregarEstrellas="";
    for (let i = 1; i <=5; i++) {
        if(puntuacion>=i){
            agregarEstrellas+= `<i class="fas fa-star checked"></i>`
        } else {
            agregarEstrellas+= `<i class="far fa-star"></i>`
        }
        
    }
    return agregarEstrellas;

}

function conseguirFecha(){
    let fecha="";
    let dateTime= new Date();
    let año= dateTime.getFullYear();
    let mes= dateTime.getMonth()+1;
    let dia= dateTime.getDate();
    let hora= dateTime.getHours();
    let minutos= dateTime.getMinutes();
    let segundos= dateTime.getSeconds();
    if (mes<10){
        mes= "0"+mes;
    }
    if (dia<10){
        mes="0"+dia;
    }
    if (hora<10){
        hora= "0"+hora;
    }
    if (minutos<10){
        minutos= "0"+minutos;
    }
    if (segundos<10){
        segundos= "0"+segundos;
    }
    fecha= año + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;
    return fecha;

}

function añadirComentario(){
    let nuevoComentario={};
    let opcionElegida="";

    let selectPuntaje = document.getElementById('puntaje');
    opcionElegida = selectPuntaje.options[selectPuntaje.selectedIndex].text;

    nuevoComentario.score=opcionElegida;
    nuevoComentario.description=document.getElementById('comentario').value;
    nuevoComentario.user=sessionStorage.getItem('email');
    nuevoComentario.dateTime=conseguirFecha();
    comentarios.push(nuevoComentario);
    mostrarComentarios(comentarios);
    document.getElementById('comentario').value="";
}

function setCatID(id) {
    localStorage.setItem("idProducto", id);
    location.href = "product-info.html";
}

document.addEventListener('DOMContentLoaded',()=> {
    id=localStorage.getItem('idProducto');

    getJSONData(PRODUCT_INFO_URL+id+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok") {

            producto = resultObj.data;
            mostrarProducto();
            mostrarProductoRelacionado();
        }
       
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL+id+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok") {

            comentarios = resultObj.data;
            mostrarComentarios(comentarios);
        }
       
    });

    document.getElementById('enviarComentario').addEventListener('click',()=>{
        añadirComentario();
    })



})