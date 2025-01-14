import Cauldron from "./cauldron.mjs";
import { getDiseases, getIngredients, getPlayerData } from "./api.mjs";
import PotionIngredients from "./ingredients.mjs";


function potionCreation (ingredientsAPI, diseases, playerData) {

    const ingredients = PotionIngredients.load(ingredientsAPI);

    // Create the cauldron with the ingredient instances
    const cauldron = new Cauldron(ingredients, diseases, playerData);
    const ingredientsCauldron = cauldron.ingredients.ingredients;

    const potionResult = cauldron.createPotion(ingredientsCauldron);

    console.log(potionResult);

}

const ingredients = await getDiseases();
const diseases = await getIngredients();
const playerData = await getPlayerData("aitor.mendiburu@ikasle.aeg.eus");


////potionCreation(ingredients, diseases, playerData)

console.log("hola");


