//VARIABLES
let contPorduct = document.getElementById("visor_productos");
let totalPrecio = document.getElementById('total');
//FUNCIONES
//Sacamos los datos que hay el localStorage
const datosStorage = () =>{
    let datosCompra = JSON.parse(localStorage.getItem('product'));
    let fragment = new DocumentFragment();
    //Leemos e imprimos lo que sacamos del storage
    datosCompra.forEach((compra) => {
        //Contendor
        let div = document.createElement('div');
        //Titulo
        let title = document.createElement('h3');
        title.textContent = "Nombre Videojuego";
        div.appendChild(title);
        //Nombre de videojuego
        let productTitle = document.createElement('p');
        productTitle.textContent = compra.titulo;
        div.appendChild(productTitle);
        //Titulo
        let precios = document.createElement('h3');
        precios.textContent = "Precio Videojuego";
        div.appendChild(precios);
        //Precio de videojuego
        let productPrecio = document.createElement('p');
        productPrecio.textContent = compra.precio;
        div.appendChild(productPrecio)
        //Recuento total 
        let precio = compra.precio.replace("€","");
        let precioNum = parseFloat(precio);
        let total = parseFloat(totalPrecio.textContent) || 0;
        total += precioNum;
        totalPrecio.textContent = total.toFixed(2);
        //Añadimos el contenedor
        fragment.appendChild(div);
    });
    contPorduct.appendChild(fragment);
}
//EVENTOS
document.addEventListener('DOMContentLoaded',datosStorage);