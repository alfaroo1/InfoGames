export class Compra{
    constructor(titulo,precio,){
        this._titulo = titulo;
        this._precio = precio;
    }
    //Getters and setters
    get titulo(){
        return this._titulo;
    }
    set titulo(titulo){
        this._titulo = titulo;
    }
    get precio(){
        return this._precio;
    }
    set precio(precio){
        this._precio = precio;
    }
}