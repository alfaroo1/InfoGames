//Variables
let routeCheapShark = 'https://www.cheapshark.com/api/1.0/deals';
let juego = document.getElementById('juego');
let btn_enviar = document.getElementById('btn_enviar');
let contAll = document.getElementById("all");
let contUser = document.getElementById("especific");
//Funciones
//Cargamos todas las ofertas y mostramos
const loadAllOferts = () =>{
    fetch(routeCheapShark)
    .then((ofertas) => ofertas.json())
    .then((ofertasJSON) => {
        showOferts(ofertasJSON,contAll);
    })
}
//Cargamos las ofertas del juego que busque el usuario por el buscados
const loadEspecificOferts = async () =>{
    //Ocultamos el contenedor que de todas las ofertas
    contAll.style.display = "none";
    //Cargamos los datos
    console.log(routeCheapShark+"?title="+juego.value);
    let respuesta = await fetch(routeCheapShark+"?title="+juego.value);
    let ofert = await respuesta.json();
    let datos = await ofert;
    //Cargamos los datos
    showOferts(datos,contUser);
}
//Creamos los elementos HTML
const showOferts = (array,contedor) =>{
    let fragment = new DocumentFragment();
    //Cargamos el array
    array.forEach((oferta) => {
        //Contenedor de cada card
        let cont = document.createElement("div");
        cont.classList.add("cardOfert");
        //Contenedor imgane
        let contImg = document.createElement("div");
        contImg.classList.add("cont__image")
        //Imagen
        let imagen = document.createElement("img");
        imagen.src = oferta.thumb;
        contImg.appendChild(imagen);
        cont.appendChild(contImg);
        //Contenedor texto
        let contTexto = document.createElement("div");
        contTexto.classList.add("cont__text");
        //Titulo
        let titulo = document.createElement("h3");
        titulo.textContent = oferta.title;
        contTexto.appendChild(titulo);
        //Contenedor precio
        let contPrecios = document.createElement("div");
        //Precio normal
        let normal = document.createElement("p");
        normal.textContent = oferta.normalPrice + "€";
        normal.classList.add("price__normal");
        contPrecios.appendChild(normal);
        //Rebaja
        let rebaja = document.createElement("p");
        rebaja.textContent = oferta.salePrice + "€";
        rebaja.classList.add("sale__price")
        contPrecios.appendChild(rebaja);
        //Añadimos el contedor de precios
        contTexto.appendChild(contPrecios);
        //Boton compra
        let compra = document.createElement("button");
        compra.innerHTML = "<i class='fa-solid fa-cart-shopping'></i>";
        compra.classList.add("btn__compra");
        contTexto.appendChild(compra);
        //Pasamos el contenedor de texto
        cont.appendChild(contTexto);
        //Le pasamos el contenedor al fragment
        fragment.appendChild(cont);
    });
    contedor.appendChild(fragment);
}
//Eventos
document.addEventListener('DOMContentLoaded',loadAllOferts);
btn_enviar.addEventListener('click',loadEspecificOferts)