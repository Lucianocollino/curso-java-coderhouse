let nombre = prompt("Ingrese su nombre");
let mesa = prompt("Ingrese número de mesa");

const hamburguesas = [
    {
        numero: 1,
        tipo: "Hamburguesa Simple",
        Ingredientes: "1 medallón de carne 180gr, pan de papa, lechuga, tomate, queso",
        precio: 6500
    },
    {
        numero: 2,
        tipo: "Hamburguesa Cheddar",
        Ingredientes: "2 medallones de carne 180gr, pan de papa, queso cheddar, panceta, salsa especial",
        precio: 6900
    },
    {
        numero: 3,
        tipo: "Hamburguesa de campo",
        Ingredientes: "2 medallones de carne 180gr, pan de papa, queso provoleta, chimichurri, lechuga, tomate, jamón cocido",
        precio: 7500
    },
    {
        numero: 4,
        tipo: "Hamburguesa de la casa",
        Ingredientes: "2 medallones de carne 180gr, pan de papa, queso cheddar, panceta, lechuga, tomate, jamón cocido, huevo, salsa especial",
        precio: 7300
    }
];
console.log(hamburguesas)

const bebidas = [
    {
        numero: 1,
        tipo: "Coca cola",
        volumen: "500cc",
        precio: 1500
    },
    {
        numero: 2,
        tipo: "Fanta",
        volumen: "500cc",
        precio: 1500
    },
    {
        numero: 3,
        tipo: "Sprite",
        volumen: "500cc",
        precio: 1500
    },
    {
        numero: 4,
        tipo: "Cerveza Quilmes",
        volumen: "500cc",
        precio: 2000
    }
];
console.log(bebidas)

function mostrarOpcionesHamburguesas() {
    console.log("Opciones de hamburguesas:");
    hamburguesas.forEach(hamburguesa => {
        console.log(hamburguesa.numero);
    });
}

function mostrarOpcionesBebidas() {
    console.log("Opciones de bebidas:");
    bebidas.forEach(bebida => {
        console.log(bebida.numero);
    });
}

function obtenerPrecioHamburguesa(numero) {
    for (let hamburguesa of hamburguesas) {
        if (hamburguesa.numero === numero) {
            return hamburguesa.precio;
        }
    }
    alert("Selección inválida, por favor ingrese un número válido.");
    return 0;
}

function obtenerPrecioBebida(numero) {
    for (let bebida of bebidas) {
        if (bebida.numero === numero) {
            return bebida.precio;
        }
    }
    alert("Selección inválida, por favor ingrese un número válido.");
    return 0;
}

mostrarOpcionesHamburguesas();
let numeroHamburguesa = parseInt(prompt("Elija su Hamburguesa: 1 Hamburguesa simple, 2 Hamburguesa cheddar, 3 Hamburguesa de campo, 4 Hamburguesa de la casa "));

mostrarOpcionesBebidas();
let numeroBebida = parseInt(prompt("Elija su Bebida: 1 Coca Cola, 2 Sprite, 3 Fanta, 4 Cerveza Quilmes "));

let precioHamburguesa = obtenerPrecioHamburguesa(numeroHamburguesa);
let precioBebida = obtenerPrecioBebida(numeroBebida);

if (precioHamburguesa > 0 && precioBebida > 0) {
    let resultado = precioHamburguesa + precioBebida;
    alert("Total: " + resultado);
    
    let pedido = {
        cliente: nombre,
        mesa: mesa,
        hamburguesa: numeroHamburguesa,
        bebida: numeroBebida,
        total: resultado
    };

    console.log("Pedido guardado:");
    console.log(pedido);
}
