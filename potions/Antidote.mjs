import { Antidote_Values } from "../constants/constants_potions.mjs";
import Potion from "./Potion.mjs";



export default class Antidote extends Potion {

    type;
    value;
    image;
    min_lvl;
    description;

    // Constructor de la clase Antidote que hereda de Potion
    constructor(name, modifier) {
        // Pasar los parametros a la clase padre
        super(name, modifier);
        this.type = "antidote";
        this.value = 0;
        this.description = "This is an antidote!!!";
        this.image = "/images/equipment/potions/antidote/antidote_"+ (Math.floor(Math.random()*3) + 1) +".png";
        this.min_lvl = 1;
    }

    static create(disease) {

        // Se crea el String completo del nombre de la pocion
        const name = "Antidote of " + disease.name;

        // Se crea el objeto modifiers para la creacion de la pocion con el valor calculado anteriormente
        const modifiers = createModifierObjectWithTheCorrectValues(disease);

        return (new Antidote(name, modifiers));
    }
}


// Funcion que añade el valor al atributo correcto
function createModifierObjectWithTheCorrectValues(disease) {
    const modifiers = {
        "hit_points": 0,
        "intelligence": 0,
        "dexterity": 0,
        "insanity": 0,
        "charisma": 0,
        "constitution": 0,
        "strength": 0,
    }


    // Los atributos que no tienen rango para crear un valor aleatorio
    modifiers.charisma = disease.modifiers.charisma;
    modifiers.dexterity = disease.modifiers.dexterity;
    modifiers.constitution = disease.modifiers.constitution;
    modifiers.strength = disease.modifiers.strength;


    // Los atributos que tienen rango para crear un valor aleatorio

    // Calcular el valor para el atributa para asignar a charisma
    const valueCharisma = calculateRandomValueForAttributes(disease, "charisma");
    modifiers.charisma = valueCharisma;

    // Calcular el valor para el atributa para asignar a dexterity
    const valueDexterity = calculateRandomValueForAttributes(disease, "dexterity");
    modifiers.dexterity = valueDexterity;

    // Calcular el valor para el atributa para asignar a constitution
    const valueConstitution = calculateRandomValueForAttributes(disease, "constitution");
    modifiers.constitution = valueConstitution;

    // Calcular el valor para el atributa para asignar a strength
    const valueStrength = calculateRandomValueForAttributes(disease, "strength");
    modifiers.strength = valueStrength;

    // Calcular el valor para el atributa para asignar a hit_points
    const valueHitPoints = calculateRandomValueForAttributes(disease, "hit_points");
    modifiers.hit_points = valueHitPoints;

    // Calcular el valor para el atributa para asignar a intelligence
    const valueIntelligence = calculateRandomValueForAttributes(disease, "intelligence");
    modifiers.intelligence = valueIntelligence;

    // Calcular el valor para el atributa para asignar a insanity
    const valueInsanity = calculateRandomValueForAttributes(disease, "insanity");
    modifiers.insanity = valueInsanity;


    return modifiers;
}

// Funcion para calcular el valor aleatorio para los atributos que tienen un rango
function calculateRandomValueForAttributes(disease, attribute) {

    let value = 0;
    let modifier = "";

    const antidote_effects = disease.antidote_effects;

    // Recorrer el Array de effectos de antidoto
    for (let i = 0; i < antidote_effects.length; i++) {
        const effect = antidote_effects[i];

        // Comprobar si el effecto contiene el atributo que estamos buscando
        if (effect.indexOf("restore_" + attribute) === 0) {
            // Si el valor es 0, el effecto tendra esta estructura "restore_{attribute_name}", y por eso sera del tipo NADA
            modifier = "nada";
        } else if (effect.indexOf("restore_" + attribute) > 0) {
             // Si el valor mayor a 0, el effecto tendra esta estructura "{modifier}_restore_{attribute_name}", y por eso lo dividimos con "_" y cogemos la posicion 0, la cual es la que nos interesa
            modifier = effect.split("_")[0];
        }
    }


    switch (attribute) {

        // Si el atributo a calcular es 'hit_points'
        case "hit_points":
            value = (modifier === "least") ? Math.floor(Math.random() * (Antidote_Values.LEAST_RESTORE_HIT_POINTS.max - Antidote_Values.LEAST_RESTORE_HIT_POINTS.min)) + Antidote_Values.LEAST_RESTORE_HIT_POINTS.min :
                (modifier === "lesser") ? Math.floor(Math.random() * (Antidote_Values.LESSER_RESTORE_HIT_POINTS.max - Antidote_Values.LESSER_RESTORE_HIT_POINTS.min)) + Antidote_Values.LESSER_RESTORE_HIT_POINTS.min :
                    (modifier === "nada") ? Math.floor(Math.random() * (Antidote_Values.RESTORE_HIT_POINTS.max - Antidote_Values.RESTORE_HIT_POINTS.min)) + Antidote_Values.RESTORE_HIT_POINTS.min :
                        (modifier === "greater") ? Math.floor(Math.random() * (100 - Antidote_Values.GREATER_RESTORE_HIT_POINTS.min)) + Antidote_Values.GREATER_RESTORE_HIT_POINTS.min :
                            0;
            break;

       
        // Si el atributo a calcular es 'insanity'
        case "insanity":
            value = (modifier === "least") ? - (Math.floor(Math.random() * (Antidote_Values.LEAST_RESTORE_INSANITY.max - Antidote_Values.LEAST_RESTORE_INSANITY.min)) + Antidote_Values.LEAST_RESTORE_INSANITY.min) :
                (modifier === "lesser") ? - (Math.floor(Math.random() * (Antidote_Values.LESSER_RESTORE_INSANITY.max - Antidote_Values.LESSER_RESTORE_INSANITY.min)) + Antidote_Values.LESSER_RESTORE_INSANITY.min) :
                    (modifier === "nada") ? - (Math.floor(Math.random() * (Antidote_Values.RESTORE_INSANITY.max - Antidote_Values.RESTORE_INSANITY.min)) + Antidote_Values.RESTORE_INSANITY.min) :
                        (modifier === "greater") ? - (Math.floor(Math.random() * (Antidote_Values.GREATER_RESTORE_INSANITY.max - Antidote_Values.GREATER_RESTORE_INSANITY.min)) + Antidote_Values.GREATER_RESTORE_INSANITY.min ):
                            0;
            break;

             
        // Si el atributo a calcular es 'intelligence'
    
        default:
            value = (modifier === "least") ? Math.floor(Math.random() * (Antidote_Values.LEAST_RESTORE.max - Antidote_Values.LEAST_RESTORE.min)) + Antidote_Values.LEAST_RESTORE.min :
                (modifier === "lesser") ? Math.floor(Math.random() * (Antidote_Values.LESSER_RESTORE.max - Antidote_Values.LESSER_RESTORE.min)) + Antidote_Values.LESSER_RESTORE.min :
                    (modifier === "nada") ? Math.floor(Math.random() * (Antidote_Values.RESTORE.max - Antidote_Values.RESTORE.min)) + Antidote_Values.RESTORE.min :
                        (modifier === "greater") ? Math.floor(Math.random() * (Antidote_Values.GREATER_RESTORE.max - Antidote_Values.GREATER_RESTORE.min)) + Antidote_Values.GREATER_RESTORE.min :
                            0;
            break;
    }


    return value;
}