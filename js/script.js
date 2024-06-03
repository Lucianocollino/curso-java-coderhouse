let nombre = prompt("ingrese su nombre")
let mesa = prompt("ingrese numero de mesa")

console.log (nombre,mesa)
alert(" mi nombre es "+nombre+", mesa numero"+mesa )

let continuar = true
while(continuar) {
    let Hamburguesas = parseInt(prompt("Ingrese 1 para Hamburguesa clasica, 2 para Hamburguesa cheddar, 3 para Hamburguesa de campo, otro numero para salir"))
    switch(Hamburguesas) {
        case 1:
            console.log("Hamburguesa clasica")
            break
        case 2: 
            console.log("Hamburguesa cheddar")
            break
        case 3: 
            console.log("Hamburguesa de campo")
            break
        default:
            console.log("No tenemos ese plato")
            break
    }
    let Bebida = parseInt(prompt("Ingrese 1 para Coca Cola, 2 para Fanta, 3 para Sprite, otro numero para salir"))
    switch(Bebida) {
        case 1:
            console.log("Coca Cola")
            break
        case 2: 
            console.log("Fanta")
            break
        case 3: 
            console.log("Sprite")
            break
        default:
            console.log("sin stock")
            break
    }

    let confirmacion = prompt("Desea hacer otra consulta? (si/no)")
    if(confirmacion == "no"){
        continuar=false
        console.log("Gracias!")
    }
}

function sumar(Hamburguesa,bebida) {
   
    let resultado = Hamburguesa + bebida
    console.log("Total de su compra:"+ resultado)
    
      }

      sumar(5500,1500)