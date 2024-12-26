let routeRawdGames = "https://api.rawg.io/api/games?";
let routeRawdFiltro = "https://api.rawg.io/api/";
let rawgKey = "11a1d83c1a254e86a58245639677986c";
let contFiltros = document.getElementById('filtros');
let filtGneres = document.getElementById('genres');
let filtDev = document.getElementById('developers');
let filtCreador = document.getElementById('creators');
let contGames = document.getElementById('games');
let cat = document.getElementById('categoria');
//Funciones
//Comprobamos si un string contiene espacio
const comprobSpaces = (string) =>{
    //Si contiene espacio los sustituimos por un guioon
    if (string.includes(" ")) {
        return string.replaceAll(" ","-");
    }
    //Si no contiene espacio lo devolvemos tal cual
    return string;

}
//Cargamos todos los tipos de generes
const loadFilters = (select,filtro) =>{
    fetch(routeRawdFiltro+select+"?lang=es"+"&key="+rawgKey)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log(datos.results);
        
        //Creamos el fragment
        let fragment = new DocumentFragment();
        //Recorremos el array de resultados
        datos.results.forEach((resultado) => {
            //Creamos un item
            let option = document.createElement("option");
            option.textContent = resultado.name;
            option.value = comprobSpaces(resultado.name);
            option.classList.add("mb-4")
            option.classList.add("text-center")
            //Le pasamos cada item al fragment
            fragment.appendChild(option);
        });
        filtro.appendChild(fragment);
    })
}
//Sacamos el boton sobre el que hace click
const chooseFilter = (event) =>{
    if (event.target.tagName == "SELECT") {
        let filter = event.target.value 
        return filter;
    }
}
//Cargamos los juegos dependiendo de la categoria que busque el usuario
const gamesWithGenre = async (event) =>{
    //Dejamos a vacio el contnedor
    contGames.innerHTML = "";
    //Sacamos la categoria que ha seleccionado el usuario
    let filtro = chooseFilter(event);
    //Sacamos el select por el select en el que esta actuando
    let select =  event.target.id;
    //Le pasamos el tipo de filtro al titulo
    cat.textContent = filtro;
    //Le pasamos la URL con la categoria
    let respuesta = await fetch(routeRawdGames+select+"="+filtro.toLowerCase()+"&key="+rawgKey);
    // let respuesta = await fetch(routeRawdGames+select+"="+filtro.toLowerCase()+"&lang=es"+"&key="+rawgKey);
    let juegos = await respuesta.json();
    let juegosJSON = await juegos.results;
    console.log(juegosJSON);
    //Lllamamos a la funcion que carga los juegos
    showGames(juegosJSON)
}
//Mostramos los juegos que nos devuelve la API
const showGames = (games) =>{
    let fragment = new DocumentFragment();
    //Recorremos la informacion
    games.forEach((game) =>{
        //Contenedor
        let div = document.createElement('div');
        div.classList.add("card");
        //Titulo
        let title = document.createElement('h3');
        title.textContent = game.name;
        title.classList.add("mb-4")
        div.appendChild(title);
        //Imagen
        let img = document.createElement('img');
        img.src = game.background_image;
        img.classList.add("mb-4")
        div.appendChild(img);
        //Opiniones
        let contOpiniones = document.createElement('div');
        game.ratings.forEach((puntuacion) => {
            let p = document.createElement('p');
            //Calificacion
            let cali = document.createElement('span');
            //Ponemos la primera letra en mayuscula
            cali.textContent = puntuacion.title[0].toUpperCase() + puntuacion.title.substring(1);
            cali.classList.add("font-semibold")
            // cali[0].toUpperCase();
            p.appendChild(cali);
            //Porcentaje
            let porcentaje = document.createElement('span');
            porcentaje.textContent = puntuacion.percent+"%";
            porcentaje.classList.add("font-semibold")
            p.appendChild(porcentaje);
            //Añadimos a contenedor
            contOpiniones.appendChild(p);
        });
        div.appendChild(contOpiniones);
        //Le pasamos el contenedor
        fragment.appendChild(div);
    });
    contGames.appendChild(fragment);
}
//Eventos
document.addEventListener('DOMContentLoaded',loadFilters("genres",filtGneres));
document.addEventListener('DOMContentLoaded',loadFilters("developers",filtDev));
document.addEventListener('DOMContentLoaded',loadFilters("creators",filtCreador));
contFiltros.addEventListener('change',chooseFilter);
contFiltros.addEventListener('click',gamesWithGenre)
