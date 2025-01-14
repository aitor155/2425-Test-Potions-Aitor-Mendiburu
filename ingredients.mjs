import Ingredient from "./ingredient.mjs";

class PotionIngredients {

    constructor(ingredients) {
        this.ingredients = ingredients;
    }

    static load(data){
        return new PotionIngredients(data.map(Ingredient.from));
    }

    find(name){
        const ingredient = this.ingredients.find(element => element.hasName(name));
        if (ingredient === undefined) {
            throw new Error(`Unknown ingredient: ${name}`);
        }
        return ingredient;
    }
}

export default PotionIngredients;
