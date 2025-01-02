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
            const salePrice = card.querySelector(".sale__price");
            const normalPrice = card.querySelector(".price__normal");
            const precio = salePrice
                ? salePrice.textContent.trim()
                : normalPrice?.textContent.trim();

            // Verificar si tenemos título y precio
            if (titulo && precio) {
                cargarVideojuegos(titulo, precio);
            }
        }
    }
};
//EVENTOS
oferts.addEventListener('click',comprobarButton);