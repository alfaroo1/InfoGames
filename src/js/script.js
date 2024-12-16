let routeRawdGames = "https://api.rawg.io/api/games?";
let rutaRawdGenres = "https://api.rawg.io/api/genres?";
let routeCheapShark = 'https://www.cheapshark.com/api/1.0/deals?title='
let rawgKey = "11a1d83c1a254e86a58245639677986c";
let listGneres = document.getElementById('categorias');
let contGames = document.getElementById('games');
let cat = document.getElementById('categoria');
//Funciones
//Cargamos todos los tipos de generes
const loadGenres = () =>{
    fetch(rutaRawdGenres+"lang=es"+"&key="+rawgKey)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        //Creamos el fragment
        let fragment = new DocumentFragment();
        //Recorremos el array de resultados
        datos.results.forEach((resultado) => {
            //Creamos un item
            let item = document.createElement("li");
            item.classList.add("mb-4")
            item.classList.add("text-center")
            //Creamos un button por cada categoria
            let buton = document.createElement('button');
            buton.textContent = resultado.name;
            buton.classList.add("btn__genres")
            item.appendChild(buton);
            //Le pasamos cada item al fragment
            fragment.appendChild(item);
        });
        listGneres.appendChild(fragment);
    })
}
//Sacamos el boton sobre el que hace click
const chooseCategorie = (event) =>{
    let cat = event.target.textContent;
    return cat
}
//Cargamos los juegos dependiendo de la categoria que busque el usuario
const gamesWithGenre = async (event) =>{
    //Dejamos a vacio el contnedor
    contGames.innerHTML = "";
    //Sacamos la categoria que ha seleccionado el usuario
    let categoria = chooseCategorie(event);
    //Le pasamos el tipo de categoria para completar el titulo
    cat.textContent = categoria;
    //Le pasamos la URL con la categoria
    console.log(routeRawdGames+"genres="+categoria.toLowerCase()+"&lang=es"+"&key="+rawgKey);
    let respuesta = await fetch(routeRawdGames+"lang=es&"+"genres="+categoria.toLowerCase()+"&key="+rawgKey);
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
        //Plataformas
        let contPlataform = document.createElement('div');
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
            contPlataform.appendChild(p);
        });
        div.appendChild(contPlataform);
        //Le pasamos el contenedor
        fragment.appendChild(div);
    });
    contGames.appendChild(fragment);
}
//Eventos
document.addEventListener('DOMContentLoaded',loadGenres);
listGneres.addEventListener('click',gamesWithGenre)
