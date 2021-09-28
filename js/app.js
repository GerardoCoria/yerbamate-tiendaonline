// Variables globales a usar
let formulario = $("#formulario")
let nombreComprador = formulario.children[0];
let apellidoComprador = formulario.children[1];
let domicilioComprador = formulario.children[2];
let localidadComprador = formulario.children[3];
let emailComprador = formulario.children[4];
let tarjetaComprador = formulario.children[5];
let claveComprador = formulario.children[6];
let vencimientoTarjeta = formulario.children[7];
let cuotas = parseInt(formulario.children[8]);
let carritoRecuperado = JSON.parse(localStorage.getItem('carrito')); 
let precioTotal=0;
let aPagarXCuota =0;

// Imprimo el carrito con los productos y el precio que el cliente comprará
function imprimirCarrito()
{
    Object.values(carritoRecuperado).forEach(productoItem =>{
        $("#productosAPagar").append(`
            <tr>")
                <td>${productoItem.nombre}</td>
                <td>${productoItem.cantidad}</td>
                <td>$${productoItem.precio}</td>
                <td>$${productoItem.precio * productoItem.cantidad}</td>
            </tr>`);
        });
    sumarTotalAPagar();
};

// Sumar precio total de la compra a confirmar
function sumarTotalAPagar()
{
    precioTotal = Object.values(carritoRecuperado).reduce((acumular,{cantidad, precio})=>
    acumular+cantidad*precio,0);
    $("#totalAPagar").text("");
    $("#totalAPagar").text(`Total a abonar: $${precioTotal}`);
}

// Botón para confirmar compra
$("#formulario").submit(function(e)
{
    e.preventDefault();
    let formulario = e.target;

    // Captar los valores de los inputs
    nombreComprador = formulario.children[0].value;
    apellidoComprador = formulario.children[1].value;
    domicilioComprador = formulario.children[2].value;
    localidadComprador = formulario.children[3].value;
    emailComprador = formulario.children[4].value;
    tarjetaComprador = formulario.children[5].value;
    claveComprador = formulario.children[6].value;
    vencimientoTarjeta = formulario.children[7].value;

    // Validar formulario
    if (nombreComprador ==="" || apellidoComprador==="" || domicilioComprador==="" || localidadComprador==="" || emailComprador==="" || tarjetaComprador==="" || claveComprador==="" || vencimientoTarjeta==="")
    {
        alert("Por favor, ingrese todos los datos")
    }
    else
    {
        confirmarCompra()
    }
})

// Funciones para calcular cuotas
// Función que inicia el proceso (llamando al cálculo de cuotas)
function imprimirCuotas()
{
    $("#cuotasDOM").text("");
    $("#cuotasDOM").text(`Precio por cada cuota: $${calcularCuotas()}`);
}
// Capta el cambio en el input respecto a las cantidades de cuotas elegidas por el cliente
$("#cuotas").change(function(e)
{
    imprimirCuotas();
});
// Calcula el valor de cada cuota según el precio total del carrito y las cuotas elegidas por el cliente
function calcularCuotas()
{
    cuotas = $("#cuotas").val();
    aPagarXCuota = precioTotal / cuotas;
    return aPagarXCuota.toFixed(2);
}

// Confirmar compra
function confirmarCompra()
{
    alert (`${nombreComprador}, su compra ha sido exitosa!`)
}

// Botón para cancelar compra
$("#btnCancelar").click((e)=>
{
    // Reseteo los espacios del formuario, los vuelvo a poner en blanco
    alert("Ha cancelado su compra");
    $("#nombreForm").val("");
    $("#apellidoForm").val("");
    $("#domicilioForm").val("");
    $("#localidadForm").val("");
    $("#tarjetaForm").val("");
    $("#claveForm").val("");
    $("#mail").val("");
});

// A mostrar cuando cargue la página
$(document).ready(
    imprimirCarrito(),
    imprimirCuotas(),

    $("#listoParaComprar").hide(0,function() 
    {
        $("#listoParaComprar").slideDown(1000);
    }),

    $("#formulario").hide(0,function()
    {
        $("#formulario").fadeIn(1000);
    })
)
    