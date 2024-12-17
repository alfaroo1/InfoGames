//VARIABLES
let galeria = document.getElementById('galeria');
let anterior = document.getElementById('btn_ant');
let siguiente = document.getElementById('btn_sig');
let contTitle = document.getElementById('title');
let contTexto = document.getElementById('text')
// Array de títulos
const titulos = [
  "La revolución de los Battle Royale",
  "Los gráficos hiperrealistas en la nueva generación",
  "El auge de los juegos indie",
  "La importancia de la narrativa en los videojuegos"
];

// Array de textos
const textos = [
  "Los juegos Battle Royale han cambiado la industria, combinando supervivencia, acción y estrategia. Títulos como Fortnite y Warzone son grandes referentes del género.",
  "La llegada de consolas como PS5 y Xbox Series X ha impulsado gráficos con ray tracing y texturas ultra detalladas. La experiencia visual nunca fue tan real.",
  "Los juegos indie han ganado popularidad gracias a su creatividad y propuestas únicas. Ejemplos como Hades o Celeste han demostrado su valor.",
  "Hoy en día, una buena historia puede definir un videojuego. Juegos como The Last of Us y Red Dead Redemption 2 son ejemplos de narrativas inolvidables."
];
//Contador para la galeria
let cont = 0;
//Le pasamos la imagen a la galeria 
galeria.style.backgroundImage = "url('../assets/images/galery"+cont+".webp')";
//Le pasamos el titulo al contenedor
contTitle.textContent = titulos[cont];
//Le pasamo el texto al contenedor
contTexto.textContent = textos[cont];
//FUNCIONES
//Cambiar imagenes de la galeria
const changeGalery = (event) =>{
    //Comprobamos que ha pulsado sobre un boton
    if (event.target.tagName == "BUTTON") {
        //Comprobamos en cual ha pulsado
        if (event.target === siguiente && cont < 3) {
            cont++;
            //Le pasamos la imagen a la galeria 
            galeria.style.backgroundImage = "url('../assets/images/galery"+cont+".webp')";
            //Le pasamos el titulo al contenedor
            contTitle.textContent = titulos[cont];
            //Le pasamo el texto al contenedor
            contTexto.textContent = textos[cont];

        }else if (event.target === anterior && cont > 0) {
            cont--;
            //Le pasamos la imagen a la galeria 
            galeria.style.backgroundImage = "url('../assets/images/galery"+cont+".webp')";
            //Le pasamos el titulo al contenedor
            contTitle.textContent = titulos[cont];
            //Le pasamo el texto al contenedor
            contTexto.textContent = textos[cont];
        }
    }
}
//EVENTOS
galeria.addEventListener('click',changeGalery)