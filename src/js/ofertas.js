//Variables
let routeCheapShark = 'https://www.cheapshark.com/api/1.0/deals?';
let juego = document.getElementById('juego');
let btn_enviar = document.getElementById('btn_enviar');
let contOferts = document.getElementById("oferts");
let contPagina = document.getElementById('cont_pages');
let numPagina = document.getElementById("num__page");
let anterior = document.getElementById("btn_anterior");
let siguiente = document.getElementById("btn_siguiente");
//Funciones
numPagina.textContent = 1;
//Sacamos el numero de pagina
const changeNumPage = (event) =>{
    //Comprobamos que tipo de evento es y donde se hace
    if (event.type == 'click' && event.target.tagName == "BUTTON") {
        //Comprobamos en que boton se ha hecho
        if (event.target == siguiente) {
        numPagina.textContent++;
        }else if (event.target == anterior && numPagina.textContent > 1) {
        numPagina.textContent--;
        }
        //Comprobamos que juego se tiene que actualizas
        if (juego.value.trim() === "") {
            loadAllOferts(); 
        }
    }
}
//Cargamos todas las ofertas y mostramos
const loadAllOferts = () =>{
    //Vaciamos el contenedor que de todas las ofertas
    contOferts.innerHTML = "";
    //Cargamos la pagina
    fetch(routeCheapShark+"pageNumber="+numPagina.textContent)
    .then((ofertas) => ofertas.json())
    .then((ofertasJSON) => {
        showOferts(ofertasJSON,contOferts);
    })
}
//Cargamos las ofertas del juego que busque el usuario por el buscados
const loadEspecificOferts = async () =>{
    //Vaciamos el contenedor que de todas las ofertas
    contOferts.innerHTML = "";
    //Ocultamos los ajustes de paginas
    contPagina.style.display = "none";
    //Cargamos los datos
    let respuesta = await fetch(routeCheapShark+"title="+juego.value);
    let ofert = await respuesta.json();
    let datos = await ofert;
    //Cargamos los datos
    showOferts(datos,contOferts);
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
        //Rebaja
        let rebaja = document.createElement("p");
        rebaja.textContent = oferta.salePrice + "€";
        rebaja.classList.add("sale__price")
        contPrecios.appendChild(rebaja);
        //Precio normal
        let normal = document.createElement("p");
        normal.textContent = oferta.normalPrice + "€";
        normal.classList.add("price__normal");
        contPrecios.appendChild(normal);
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
btn_enviar.addEventListener('click',loadEspecificOferts);
siguiente.addEventListener('click',changeNumPage);
anterior.addEventListener('click',changeNumPage);