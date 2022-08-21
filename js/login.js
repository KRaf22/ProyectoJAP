function login() {

    let correo = document.getElementById("email").value;
    let clave = document.getElementById("password").value;
  
    if (correo === "" && clave === "") {
  
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe ingresar correo electrónico y contraseña",
      });
  
      document.getElementById("email").classList.add("error");
      document.getElementById("password").classList.add("error");
  
    } else if (correo === "") {
  
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe ingresar un correo electrónico",
      });
  
      document.getElementById("email").classList.add("error");
  
    } else if (clave === "") {
  
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe ingresar una contraseña",
      });
  
      document.getElementById("password").classList.add("error");
  
    } else {
  
      sessionStorage.setItem('email', correo)
      location.href = "index.html";
  
    }
  }
  
document.addEventListener("DOMContentLoaded", ()=> {
  
    document.getElementById("boton").addEventListener("click", ()=> {
        login();
    });
})