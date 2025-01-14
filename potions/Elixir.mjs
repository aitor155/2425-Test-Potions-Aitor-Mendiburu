import { Elixir_Values, Elixir_Values_Insanity } from "../constants/constants_potions.mjs";
import Potion from "./Potion.mjs";



export default class Elixir extends Potion {

    // Elementos propiios que contiene la clase Elixir
    duration;
    type;
    value;
    image;
    min_lvl;
    description;

    // Constructor de la clase Elixir que hereda de Potion
    constructor(name, modifier, duration) {
        // Pasar los parametros a la clase padre
        super(name, modifier);
        // Añadir los parametros propios de la clase
        this.duration = duration;
        this.type = "elixir";
        this.value = 0;
        this.description = "This is an elixir!!!!";
        this.image = "/images/equipment/potions/enhancer/enhancer_"+ (Math.floor(Math.random()*3) + 1) +".png";
        this.min_lvl = 1;
    }

    static create(ingredients, attribute) {


        // Calcular el valor que se va a incrementar del atributo
        const increaseValue = calculateIncreasePoints(ingredients, attribute);

        // Calcular la duracion de la pocion
        const duration = calculatePotionDuration(ingredients, attribute);

        // Se obtiene el menor nivel de modificador entre todos los ingredientes
        const ingredientModifier = (Math.abs(increaseValue) === 20) ? "Greater " :
            (Math.abs(increaseValue) === 15) ? "" :
                (Math.abs(increaseValue) === 10) ? "Lesser " :
                    (Math.abs(increaseValue) === 5) ? "Least " : "";

        // Se crea el String completo del nombre de la pocion
        const name = ingredientModifier + capitalizeFirstLetter(attribute) + " Elixir";

        // Se crea el objeto modifiers para la creacion de la pocion con el valor calculado anteriormente
        const modifiers = createModifierObjectWithTheCorrectValues(attribute, increaseValue);

        return (new Elixir(name, modifiers, duration));
    }
}


// Funcion que calcula los puntos del atributo que se van a incrementar
function calculateIncreasePoints(ingredients, attribute) {

    let value = 0;
    const ingredientsQuantity = ingredients.length;

    // Se recorre el array de ingredientes
    for (let i = 0; i < ingredientsQuantity; i++) {
        // Se obtiene el ingrediente del array de la posicion i
        const ingredient = ingredients[i];

        // Se recorre el array de efectos del ingrediente
        for (let i = 0; i < ingredient.effects.length; i++) {

            // Se obtiene el efecto del array de la posicion i
            const effect = ingredient.effects[i];

            // Si el efecto es de tipo 'increase' y afecta al atributo 'hit_points'
            if (effect.attribute === attribute) {

                // Comprobar si el atributo es insanity o no
                if (attribute === "insanity") {
                    // Dependiendo del modificador sumar el valor correspondiente
                    value += (effect.modifier === "greater") ? Elixir_Values_Insanity.GREATER.VALUE :
                        (effect.modifier === "nada") ? Elixir_Values_Insanity.NADA.VALUE :
                            (effect.modifier === "lesser") ? Elixir_Values_Insanity.LESSER.VALUE :
                                (effect.modifier === "least") ? Elixir_Values_Insanity.LEAST.VALUE :
                                    0;
                } else {
                    // Dependiendo del modificador sumar el valor correspondiente
                    value += (effect.modifier === "greater") ? Elixir_Values.GREATER.VALUE :
                        (effect.modifier === "nada") ? Elixir_Values.NADA.VALUE :
                            (effect.modifier === "lesser") ? Elixir_Values.LESSER.VALUE :
                                (effect.modifier === "least") ? Elixir_Values.LEAST.VALUE :
                                    0;
                }
            }
        }
    }

    // Calcular la media de la suma del 'Value' de todos los ingredientes
    value = (value / ingredientsQuantity);


    // Devolver el valor medio redondeado al multiplo de 5 inferior
    return (Math.floor(value / 5) * 5);
}

// Funcion para calcular la duracion de los efectos de la pocion en base a los ingredientes
function calculatePotionDuration(ingredients, attribute) {

    let duration = 0;

    const ingredientsQuantity = ingredients.length;

    // Se recorre el array de ingredientes
    for (let i = 0; i < ingredientsQuantity; i++) {
        // Se obtiene el ingrediente del array de la posicion i
        const ingredient = ingredients[i];

        // Se recorre el array de efectos del ingrediente
        for (let i = 0; i < ingredient.effects.length; i++) {

            // Se obtiene el efecto del array de la posicion i
            const effect = ingredient.effects[i];

            // Comprobar si el efecto es afecta al atributo que queremos
            if (effect.attribute === attribute) {

                // Comprobar si el atributo es insanity o no
                if (attribute === "insanity") {
                    // Dependiendo del modificador sumar la duracion correspondiente
                    duration += (effect.modifier === "greater") ? Elixir_Values_Insanity.GREATER.DURATION :
                        (effect.modifier === "nada") ? Elixir_Values_Insanity.NADA.DURATION :
                            (effect.modifier === "lesser") ? Elixir_Values_Insanity.LESSER.DURATION :
                                (effect.modifier === "least") ? Elixir_Values_Insanity.LEAST.DURATION :
                                    0;
                } else {
                    // Dependiendo del modificador sumar la duracion correspondiente
                    duration += (effect.modifier === "greater") ? Elixir_Values.GREATER.DURATION :
                        (effect.modifier === "nada") ? Elixir_Values.NADA.DURATION :
                            (effect.modifier === "lesser") ? Elixir_Values.LESSER.DURATION :
                                (effect.modifier === "least") ? Elixir_Values.LEAST.DURATION :
                                    0;
                }
            }
        }
    }

    // Calcular la media de la suma de la 'duracion' de todos los ingredientes
    duration = (duration / ingredientsQuantity);


    // Devolver el valor medio redondeado al multiplo de 5 inferior
    return (Math.floor(duration));

}



// Funcion que añade el valor al atributo correcto
function createModifierObjectWithTheCorrectValues(attribute, value) {
    const modifiers = {
        "hit_points": 0,
        "intelligence": 0,
        "dexterity": 0,
        "insanity": 0,
        "charisma": 0,
        "constitution": 0,
        "strength": 0,
    }

    switch (attribute) {
        case "charisma":
            modifiers.charisma = value;
            break;
        case "intelligence":
            modifiers.intelligence = value;
            break;
        case "dexterity":
            modifiers.dexterity = value;
            break;
        case "insanity":
            modifiers.insanity = value;
            break;
        case "constitution":
            modifiers.constitution = value;
            break;
        case "strength":
            modifiers.strength = value;
            break;
        default:
            break;
    }

    return modifiers;
}

// Funcion que convierte la primera letra de un string en mayuscula
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

