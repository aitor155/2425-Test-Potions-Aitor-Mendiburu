import Potion from "./Potion.mjs";



export default class FailedPotion extends Potion {

    type;
    value;
    image;
    min_lvl;
    description;

    // Constructor de la clase Stench que hereda de Potion
    constructor(name, modifier) {
        // Pasar los parametros a la clase padre
        super(name, modifier);
        this.type = "failed";
        this.value = 0;
        this.description = "This is a failed potion!!!!";
        this.image = "/images/equipment/potions/enhancer/enhancer_"+ (Math.floor(Math.random()*3) + 1) +".png";
        this.min_lvl = 1;
    }

    static create(playerData) {


        // Simular el lanzar un dado de cien caras
        const firstDiceValue = Math.floor(Math.random()*100) +1;

        // Calcular el 20% de la suma de INS y CHA
        const charismaInsanityValue =  Math.ceil((playerData.attributes.insanity + playerData.attributes.charisma))

        if ( charismaInsanityValue >= firstDiceValue) {
            // Si el 20% de la suma de charisma e insanity es mayor o igual que el valor de la tirada de dado, 1D100, se creara una pocion con attributos positivos

            return(FailedPotion.createPositiveEffectFailedPotion());

        }else {
            // Si el 20% de la suma de charisma e insanity es menor que el valor de la tirada de dado, se ejecutara otra tirada de 1D2

            // Simular el lanzar un dado de dos caras
            const secondDiceValue = Math.floor(Math.random()*2) +1;

            if (secondDiceValue === 2) {
                // Si el valor de la tirada 1D2 es 2 se creara una pocion con efectos negativos
                return (FailedPotion.createNegativeEffectFailedPotion())
            } else {
                // Si el valor de la tirada 1D2 es 1, por descarte, se creara una pocion sin effecto
                return (FailedPotion.createNoEffectFailedPotion())
            }
        }

    }


    // Metodo estatico de la clase que crea una pocion fallida con effectos negativos
    static createNegativeEffectFailedPotion() {

        // Se crea el String completo del nombre de la pocion
        const name = "Tonic of Downfall";

        // Se crea el objeto modifiers para la creacion de la pocion con el valor calculado anteriormente
        const modifiers = {
            "hit_points": 0,
            "intelligence": 0,
            "dexterity": 0,
            "insanity": 0,
            "charisma": 0,
            "constitution": 0,
            "strength": 0,
        }

        modifiers.charisma = - Math.floor(Math.random()*42);
        modifiers.hit_points = - Math.floor(Math.random()*60);
        modifiers.insanity = Math.floor(Math.random()*37);
        modifiers.intelligence = - Math.floor(Math.random()*32);
        modifiers.constitution = - Math.floor(Math.random()*44);
        modifiers.dexterity = - Math.floor(Math.random()*51);
        modifiers.strength = - Math.floor(Math.random()*45);


        return (new FailedPotion(name, modifiers));
    }

    // Metodo estatico de la clase que crea una pocion fallida con effectos positivos
    static createPositiveEffectFailedPotion() {
        
        // Se crea el String completo del nombre de la pocion
        const name = "Tonic of Downfall";

        // Se crea el objeto modifiers para la creacion de la pocion con el valor calculado anteriormente
        const modifiers = {
            "hit_points": 0,
            "intelligence": 0,
            "dexterity": 0,
            "insanity": 0,
            "charisma": 0,
            "constitution": 0,
            "strength": 0,
        }

        modifiers.charisma = Math.floor(Math.random()*42);
        modifiers.hit_points = Math.floor(Math.random()*60);
        modifiers.insanity = - Math.floor(Math.random()*37);
        modifiers.intelligence = Math.floor(Math.random()*32);
        modifiers.constitution = Math.floor(Math.random()*44);
        modifiers.dexterity = Math.floor(Math.random()*51);
        modifiers.strength = Math.floor(Math.random()*45);



        return (new FailedPotion(name, modifiers));
    }


    // Metodo estatico de la clase que crea una pocion fallida sin effectos
    static createNoEffectFailedPotion() {
        
        // Se crea el String completo del nombre de la pocion
        const name = "Tonic of Downfall";

        // Se crea el objeto modifiers para la creacion de la pocion con el valor calculado anteriormente
        const modifiers = {
            "hit_points": 0,
            "intelligence": 0,
            "dexterity": 0,
            "insanity": 0,
            "charisma": 0,
            "constitution": 0,
            "strength": 0,
        }

        return (new FailedPotion(name, modifiers));

    }

    
}


