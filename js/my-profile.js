let perfil={};

function guardarPerfil(){

    let nom=document.getElementById('nombre').value;
    let ape=document.getElementById('primerApellido').value;
    let correo=document.getElementById('email').value;
    let segNom=document.getElementById('segNombre').value;
    let segApe=document.getElementById('segApellido').value;
    let telCto=document.getElementById('telContacto').value;
    let pfp=document.getElementById('fotoPerfil');
    
    if (pfp.value!="") {

        let fileReader = new FileReader();
        fileReader.readAsDataURL(pfp.files[0]);

        fileReader.addEventListener('load',() =>{
        let url= fileReader.result;

        perfil.nombre=nom;
        perfil.apellido=ape;
        perfil.email=correo;
        perfil.segNombre=segNom;
        perfil.segApellido=segApe;
        perfil.telContacto=telCto;
        perfil.fotoDePerfil=url;
    
        localStorage.setItem('datosPerfil',JSON.stringify(perfil));

        


    })

    } else {

        perfil.nombre=nom;
        perfil.apellido=ape;
        perfil.email=correo;
        perfil.segNombre=segNom;
        perfil.segApellido=segApe;
        perfil.telContacto=telCto;
        perfil.fotoDePerfil="";
    
        localStorage.setItem('datosPerfil',JSON.stringify(perfil));

    }


}


function cargarInputs(){

    perfil=JSON.parse(localStorage.getItem('datosPerfil'));

    document.getElementById('nombre').value=perfil.nombre;
    document.getElementById('primerApellido').value=perfil.apellido;
    document.getElementById('segNombre').value=perfil.segNombre;
    document.getElementById('segApellido').value=perfil.segApellido;
    document.getElementById('telContacto').value=perfil.telContacto;

    if(perfil.fotoDePerfil!==""){

        document.getElementById('profilePhoto').src=perfil.fotoDePerfil;

    }
    

}



document.addEventListener('DOMContentLoaded',()=>{

    let correo=sessionStorage.getItem('email');

    document.getElementById('email').value=correo;

    if (localStorage.getItem('datosPerfil')){

        cargarInputs();

    }

    let formPerfil=document.getElementById('formPerfil');

    formPerfil.addEventListener('submit', function (event){

       
        event.preventDefault()
        event.stopPropagation()

        if (!formPerfil.checkValidity()) {

            formPerfil.classList.add('was-validated');

        } else{
            guardarPerfil();
            Swal.fire({
                title: 'Los datos han sido guardados exitosamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            }).then (() => {
                formPerfil.submit();
            })

            
        }

    })
})