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
    fetch(rutaRawdGenres+"key="+rawgKey)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        //Creamos el fragment
        let fragment = new DocumentFragment();
        //Recorremos el array de resultados
        datos.results.forEach((resultado) => {
            //Creamos un item
            let item = document.createElement("li");
            //Creamos un button por cada categoria
            let buton = document.createElement('button');
            buton.textContent = resultado.name;
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
    let respuesta = await fetch(routeRawdGames+"genres="+categoria.toLowerCase()+"&key="+rawgKey);
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
        //Imagen
        let img = document.createElement('img');
        img.src = game.background_image;
        div.appendChild(img);
        //Titulo
        let title = document.createElement('h3');
        title.textContent = game.name;
        div.appendChild(title);
        //Plataformas
        let contPlataform = document.createElement('div');
        game.platforms.forEach((plataforma) => {
            let p = document.createElement('p');
            p.textContent = plataforma.platform.name;
            console.log(plataforma.platform.name);
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
