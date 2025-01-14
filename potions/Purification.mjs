
import Potion from "./Potion.mjs";




export default class Purification extends Potion {
    // Constructor de la clase Purification que hereda de Potion
    constructor(name, modifier) {
        // Pasar los parametros a la clase padre
        super(name, modifier)
    }


    static create() {

        // Se crea el String completo del nombre de la pocion
        const name = "Potion of Purification";

        // Se crea el objeto modifiers con valor 0, porque no tiene efecto en los atributos del player
        const modifiers = {
            "hit_points": 0,
            "intelligence": 0,
            "dexterity": 0,
            "insanity": 0,
            "charisma": 0,
            "constitution": 0,
            "strength": 0,
        };
    

        return (new Purification(name, modifiers));
    }
}
