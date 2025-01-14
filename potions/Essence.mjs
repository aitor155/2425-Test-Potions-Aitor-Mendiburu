import { Essence_Value } from "../constants/constants_potions.mjs";
import Potion from "./Potion.mjs";



export default class Essence extends Potion {

  type;
  value;
  image;
  min_lvl;
  description;

  // Constructor de la clase Essence que hereda de Potion
  constructor(name, modifier) {
    // Pasar los parametros a la clase padre
    super(name, modifier);
    this.type = "essence";
    this.value = 0;
    this.description = "This is an essence!!!!";
    this.image = "/images/equipment/potions/healing/healing_"+ (Math.floor(Math.random()*3) + 1) +".png";
    this.min_lvl = 1;
  }

  static create(ingredients) {

    // Se obtiene el menor nivel de modificador entre todos los ingredientes
    const ingredientModifier = Potion.getTheMinModifierFromAllTheIngredients(ingredients, "hit_points");

    // Se crea el String completo del nombre de la pocion
    const name = "Essence of " + ingredientModifier + "heal";

    // Calcular el valor que se va a incrementar de hitpoints
    const increaseHitPointsValue = calculateIncreaseHitPoints(ingredients);

    // Se crea el objeto modifiers para la creacion de la pocion con el valor calculado anteriormente
    const modifiers = {
      "hit_points": increaseHitPointsValue,
      "intelligence": 0,
      "dexterity": 0,
      "insanity": 0,
      "charisma": 0,
      "constitution": 0,
      "strength": 0,
    }

    return (new Essence(name, modifiers));
  }

}


// Funcion que calcula los puntos del atributo 'hit_points' que se van a incrementar
function calculateIncreaseHitPoints(ingredients) {

  let value = 0;
  const ingredientsQuantity = ingredients.length;

  // Variables para controlar cuantos de cada potencia hay
  let greaterQuantity = 0;
  let nothingQuantity = 0;
  let lesserQuantity = 0;
  let leastQuantity = 0;

  // Se recorre el array de ingredientes
  for (let i = 0; i < ingredientsQuantity; i++) {
    // Se obtiene el ingrediente del array de la posicion i
    const ingredient = ingredients[i];

    // Se recorre el array de efectos del ingrediente
    for (let i = 0; i < ingredient.effects.length; i++) {

      // Se obtiene el efecto del array de la posicion i
      const effect = ingredient.effects[i];

      // Si el efecto es de tipo 'increase' y afecta al atributo 'hit_points'
      if ((effect.attribute === "hit_points") && (effect.effect === "increase")) {

        // Dependiendo del modificador sumar el valor correspondiente
        switch (effect.modifier) {

          case "greater":
            value += Essence_Value.GREATER;
            greaterQuantity++;
            break;

          case "nada":
            value += Essence_Value.NADA;
            nothingQuantity++;
            break;

          case "lesser":
            value += Essence_Value.LESSER;
            lesserQuantity++;
            break;

          case "least":
            value += Essence_Value.LEAST;
            leastQuantity++;
            break;

          default:
            break;
        }
      }
    }

  }

  // Si todos los ingredientes tienen la misma potencia, calcular el modificador correspondiente
  if ((greaterQuantity === ingredientsQuantity) || (nothingQuantity === ingredientsQuantity) || (lesserQuantity === ingredientsQuantity) || (leastQuantity === ingredientsQuantity)) {

    // Se calcula el porcentaje correspondiente a la cantidad de ingredientes
    switch (ingredientsQuantity) {
      case 2:
        value = value * (1.2);
        break;
      case 3:
        value = value * (1.4);
        break;
      case 4:
        value = value * (1.8);
        break;

      default:
        break;
    }
  }
  // Se devuelve el valor redondeando hacia arriba
  return (Math.ceil(value));
}

