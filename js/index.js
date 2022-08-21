document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    let correo=sessionStorage.getItem('email');

    if(correo===null){

        alert('Debe iniciar sesión');
        location.href='login.html'
    } else {
        document.getElementById('cerrar-sesion').style.display="block";
    }
    document.getElementById('cerrar-sesion').addEventListener('click', ()=> {
        alert('Cierro sesión');
        sessionStorage.clear();
        location.href="login.html";

    })
});