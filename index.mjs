import Cauldron from "./cauldron.mjs";
import { getDiseases, getIngredients, getPlayerData } from "./api.mjs";
import PotionIngredients from "./ingredients.mjs";

function randomSelectedIngredients(ingredientsAPI) {
    let randomIngredients = [];
    let randomIngredient = {};
    let randomQuantity = Math.floor(Math.random() * (4 - 2 + 1) + 2);

    for (let i = 0; i < randomQuantity; i++) {
        randomIngredient = ingredientsAPI.at(Math.floor(Math.random() * (ingredientsAPI.length - 0 + 1) + 0))
        randomIngredients.push(randomIngredient);
    }

    return randomIngredients
}

export default function potionCreation(randomSelectedIngredients, diseases, playerData) {
    const ingredients = PotionIngredients.load(randomSelectedIngredients);
    const cauldron = new Cauldron(ingredients, diseases, playerData);
    const ingredientsCauldron = cauldron.ingredients.ingredients;
    const potionResult = cauldron.createPotion(ingredientsCauldron);
    // console.log(potionResult);
    return potionResult;
}

// Wrap the execution code in an async function
export async function initialize() {
    const diseases = await getDiseases();
    const ingredientsAll = await getIngredients();
    const playerData = await getPlayerData("aitor.mendiburu@ikasle.aeg.eus");

    let selectIngredient = randomSelectedIngredients(ingredientsAll.data);

    return potionCreation(selectIngredient, diseases, playerData);
}

initialize();


