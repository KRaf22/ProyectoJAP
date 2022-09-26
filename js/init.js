const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function despegable(usuario){
  let menuDespegable= `
              <div class="btn-group">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ${usuario}
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/WorkSpace/cart.html"">Mi Carrito</a></li>
                  <li><a class="dropdown-item" href="/WorkSpace/my-profile.html">Mi Perfil</a></li>
                  <li><a class="dropdown-item" href="/WorkSpace/login.html" id="cerrar-sesion">Cerrar sesión</a></li>
                </ul>
              </div>`

document.getElementById('despegable').innerHTML=menuDespegable;
}

document.addEventListener('DOMContentLoaded',()=>{

  let correo=sessionStorage.getItem('email');

    if(correo===null){

        alert('Debe iniciar sesión');
        location.href='login.html'
    } else {
        despegable(correo);
    }
    document.getElementById('cerrar-sesion').addEventListener('click', ()=> {
        alert('Cierro sesión');
        sessionStorage.clear();

    })
})