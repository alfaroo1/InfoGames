import { Compra } from "./Compra.js";

//VARIABLES
let oferts = document.getElementById("oferts");
//FUNCIONES
//Cargar los videojuegos añadidos al carrtio
const cargarVideojuegos = (titulo,precio) =>{
    let compra = new Compra(titulo,precio);
    //Pasamos los datos al localStorage
    let productStorage = JSON.parse(localStorage.getItem('product')) || [];
    //Sacamos los datos del producto y los añadimos
    productStorage.push({
        titulo: compra.titulo,
        precio: compra.precio
    })
    //Añadimos el array al localStorage
    localStorage.setItem('product',JSON.stringify(productStorage));
}
//Comprbar si ha pulsado el boton
const comprobarButton = (event) => {
    if (event.target.closest(".btn__compra")) {
        // Encontrar la tarjeta contenedora del producto
        const card = event.target.closest(".cardOfert");

        if (card) {
            // Extraer el título
            const titulo = card.querySelector("h3")?.textContent.trim();

            // Extraer el precio (usamos sale_price si existe, si no, usamos price_normal)
            const salePriceElement = card.querySelector(".sale__price");
            const normalPriceElement = card.querySelector(".price__normal");
            const precio = salePriceElement
                ? salePriceElement.textContent.trim()
                : normalPriceElement?.textContent.trim();

            // Verificar si tenemos título y precio
            if (titulo && precio) {
                cargarVideojuegos(titulo, precio);
            } else {
                console.error("Faltan datos del producto (título o precio).");
            }
        } else {
            console.error("No se encontró la tarjeta del producto.");
        }
    }
};
//EVENTOS
oferts.addEventListener('click',comprobarButton);