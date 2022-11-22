productosCarrito=[];

let tiposEnvio = document.getElementsByName('envio');

function mostrarProductosaComprar(arrayProductos){

    let agregarHTML="";
    let i=0;
    for (const articulo of arrayProductos) {
        agregarHTML+= `
         <tr>
            <th scope="row">${i+1}</th>
            <td width="150px"><img class="imagenCarrito" src=${articulo.image}></td>
            <td> ${articulo.name} </td>
            <td> ` + articulo.currency + " " + articulo.unitCost + `</td>
            <td class="tdCantidad"> <input class="w-25" type="number" id="cantidadArticulo${i}" name="cantidadArticulos" value=${articulo.count}  min="1" onchange="cambiarSubTotal(${i});"></td>
            <td class="fw-bold" id="precio${i}">` + articulo.currency + " " + `<span class="subtotal" id="valor${i}"> ${articulo.unitCost} </span>` + `</td>
            <td> <button class="btn btn-danger eliminar" onclick="eliminarProducto(${i});"><i class="fas fa-trash"></i></button> </td>
        </tr>`
        i++;
    }
    document.getElementById('productos_a_comprar').innerHTML=agregarHTML;

}

function cambiarSubTotal(indice){
    cambiarHTML="";
    let cantidad=parseInt(document.getElementById('cantidadArticulo'+indice).value);
    let subTotal=productosCarrito[indice].unitCost * cantidad;
    cambiarHTML= subTotal;
    document.getElementById('valor'+indice).innerHTML=cambiarHTML;

    calcularCostos();
}

function calcularCostos(){
    let subtotales=document.getElementsByClassName('subtotal');
    let subtotal=0;
    for (let i=0; i<subtotales.length; i++){
        subtotal=subtotal + parseInt(subtotales[i].innerHTML);

    }
    let costoEnvio=0;
    for (let i=0; i<tiposEnvio.length; i++){
        if (tiposEnvio[i].checked){
            costoEnvio=subtotal * parseFloat(tiposEnvio[i].value);
        }
    }
    let total= subtotal + costoEnvio;
    document.getElementById('subtotal').innerHTML="USD" + " " + (subtotal).toFixed(2);
    document.getElementById('envio').innerHTML="USD" + " " + (costoEnvio).toFixed(2);
    document.getElementById('total').innerHTML="USD" + " " + (total).toFixed(2);
}

function habilitarCredito(){
    document.getElementById('numCuenta').disabled=true;
    document.getElementById('numTarjeta').disabled=false;
    document.getElementById('codigoSeg').disabled=false;
    document.getElementById('venc').disabled=false;
    document.getElementById('metodoPago').innerHTML="Tarjeta de Credito"
    document.getElementById('seleccionarPago').innerHTML="";
}

function habilitarBancaria(){
    document.getElementById('numCuenta').disabled=false;
    document.getElementById('numTarjeta').disabled=true;
    document.getElementById('codigoSeg').disabled=true;
    document.getElementById('venc').disabled=true;
    document.getElementById('metodoPago').innerHTML="Transferencia Bancaria"
    document.getElementById('seleccionarPago').innerHTML="";
}

function eliminarProducto(i){

    productosCarrito.splice(i,1);
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    mostrarProductosaComprar(productosCarrito);
    calcularCostos();
}


document.addEventListener('DOMContentLoaded',()=>{

    getJSONData(CART_INFO_URL+"25801"+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok") {

            productosCarrito = resultObj.data.articles;
            if(localStorage.getItem('carrito')){
                for (let articulo of JSON.parse(localStorage.getItem('carrito'))) {
                    if (productosCarrito.map(producto => producto.id).indexOf(articulo.id) < 0) {

                        if(articulo.currency==="UYU"){
                            articulo.unitCost=articulo.unitCost / 40;
                            articulo.currency="USD";
                         }
                           let newProd=articulo;
                          productosCarrito.push(newProd);

                    }
                    
                    
                    
                }
                
            }
            mostrarProductosaComprar(productosCarrito);
            calcularCostos();
            
        }
       
    });

    let formulario = document.getElementById('formCarrito');
    let tarjetaCredito=document.getElementById('credito')
    let transfBancaria=document.getElementById('bancaria')

    formulario.addEventListener('submit', function (event){

        event.preventDefault()
        event.stopPropagation()

        if (!formulario.checkValidity() || (!tarjetaCredito.checked && !transfBancaria.checked)) {

            formulario.classList.add('was-validated');

            if(!tarjetaCredito.checked && !transfBancaria.checked){
                document.getElementById('seleccionarPago').innerHTML="Debe seleccionar una forma de pago";
            }
      
      
          } else{
            Swal.fire({
                title: 'Su compra ha sido realizada con éxito',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            }).then (() => {
                formulario.submit();
            })
          }

    })

    for (let i=0; i<tiposEnvio.length; i++){
        tiposEnvio[i].addEventListener('click',()=>{
            calcularCostos();
        })
    }

    document.getElementById('credito').addEventListener('click',()=>{
        habilitarCredito();
    })
    document.getElementById('bancaria').addEventListener('click',()=>{
        habilitarBancaria();
    })


})