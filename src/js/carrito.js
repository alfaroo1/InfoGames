//VARIABLES
let contPorduct = document.getElementById("visor_productos");
let totalPrecio = document.getElementById('total');
let compra = document.getElementById("compra");
//FUNCIONES
//Sacamos los datos que hay el localStorage
const datosStorage = () =>{
    let datosCompra = JSON.parse(localStorage.getItem('product'));
    let fragment = new DocumentFragment();
    //Leemos e imprimos lo que sacamos del storage
    datosCompra.forEach((compra) => {
        //Contendor
        let div = document.createElement('div');
        div.classList.add("card__cart");
        //Titulo
        let title = document.createElement('h3');
        title.textContent = "Nombre Videojuego:";
        title.classList.add("title__cart");
        div.appendChild(title);
        //Nombre de videojuego
        let productTitle = document.createElement('p');
        productTitle.textContent = compra.titulo;
        productTitle.classList.add("font-medium");
        div.appendChild(productTitle);
        //Titulo
        let precios = document.createElement('h3');
        precios.textContent = "Precio Videojuego:";
        precios.classList.add("title__cart");
        div.appendChild(precios);
        //Precio de videojuego
        let productPrecio = document.createElement('p');
        productPrecio.textContent = compra.precio;
        productPrecio.classList.add("font-medium");
        div.appendChild(productPrecio)
        //Recuento total 
        let precio = compra.precio.replace("€","");
        let precioNum = parseFloat(precio);
        let total = parseFloat(totalPrecio.textContent) || 0;
        total += precioNum;
        totalPrecio.textContent = total.toFixed(2)+"€";
        //Añadimos el contenedor
        fragment.appendChild(div);
    });
    contPorduct.appendChild(fragment);
}
//Limpiar todos los datos que haya en localStorage
const clearStorage = () =>{
    //Limpiamos los datos
    localStorage.clear();
    //Vaciamos el contenedor simulando que hemos realizado la compra
    contPorduct.innerHTML = "";
    //Devolvemos al usuario a la pagina de Ofertas para que vuelva a añadir productos al carrito
    window.location = "./ofertas.html";
}
//EVENTOS
document.addEventListener('DOMContentLoaded',datosStorage);
compra.addEventListener('click',clearStorage);