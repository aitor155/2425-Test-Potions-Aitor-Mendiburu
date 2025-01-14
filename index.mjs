import Cauldron from "./cauldron.mjs";
import { getDiseases, getIngredients, getPlayerData } from "./api.mjs";
import PotionIngredients from "./ingredients.mjs";


function randomSelectedIngredients (ingredientsAPI) {
    let randomIngredients = [];
    let randomIngredient = {};
    let randomQuantity = Math.floor(Math.random() * (4 - 2 + 1) + 2);

    for (let i = 0; i < randomQuantity; i++) {
        randomIngredient = ingredientsAPI.at(Math.floor(Math.random() * (ingredientsAPI.length - 0 + 1) + 0))
        randomIngredients.push(randomIngredient);
    }

    return randomIngredients
}


function potionCreation (randomSelectedIngredients, diseases, playerData) {

    console.log("creating potions");

    const ingredients = PotionIngredients.load(randomSelectedIngredients);

    // Create the cauldron with the ingredient instances
    const cauldron = new Cauldron(ingredients, diseases, playerData);
    const ingredientsCauldron = cauldron.ingredients.ingredients;

    const potionResult = cauldron.createPotion(ingredientsCauldron);

    console.log(potionResult);

}

const diseases = await getDiseases();
const ingredientsAll = await getIngredients();
const playerData = await getPlayerData("aitor.mendiburu@ikasle.aeg.eus");

let selectIngredient = randomSelectedIngredients(ingredientsAll.data);
console.log(selectIngredient);


potionCreation(selectIngredient, diseases, playerData);



