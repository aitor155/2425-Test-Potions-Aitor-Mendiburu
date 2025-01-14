import Antidote from "./potions/Antidote.mjs";
import Elixir from "./potions/Elixir.mjs";
import Essence from "./potions/Essence.mjs";
import FailedPotion from "./potions/FailedPotion.mjs";
import Poison from "./potions/Poison.mjs";
import Purification from "./potions/Purification.mjs";
import Stench from "./potions/Stench.mjs";
import Venom from "./potions/Venom.mjs";
import Ingredients from "./ingredients.mjs";



class Cauldron {
    constructor(ingredients, diseases, playerData) {
        this.ingredients = ingredients;
        this.diseases = diseases;
        this.playerData = playerData;
    }

    createPotion(ingredients) {

        console.log("Ingredientes proporcionados:", ingredients);

        const numIngredients = ingredients.length;
        if (numIngredients < 2 || numIngredients > 4) {
            throw new Error('Se requieren dos, tres o cuatro ingredientes para crear una poción.');
        }

        const [ingredient1, ...restIngredients] = ingredients;

        const commonAttributeEffects = ingredient1.findCommonAttributeEffectsMultipleSet(...restIngredients);
        const commonEffects = ingredient1.findCommonEffectsMultipleSet(...restIngredients);

        console.log('Efectos comunes basados en el atributo:', commonAttributeEffects);
        console.log('Efectos comunes basados en el atributo:', commonEffects);

        //Create Essence/Stench/Venom/Elixir/Purification
        if (commonAttributeEffects.length > 0) {
            const potion = this.createPotionType(commonAttributeEffects);
            console.log("Resultado de la creación de la poción:", potion);
            return potion;
        }
        //Create Poison/Antidote
        if (commonEffects.length > 0) {
            for (let effect of commonEffects) {
                if (effect.effect === 'damage') {
                    const poison = this.createPoison(ingredients, this.diseases);
                    return poison;
                } else if (effect.effect === 'restore') {
                    const antidote = this.createAntidote(ingredients, this.diseases);
                    return antidote;
                }
            }
        }
        return FailedPotion.create(this.playerData);
    }

    isPotionOfPurification() {
        const ingredients = this.ingredients.ingredients;
        const requiredIngredientsName = ["Dragon's Blood Resin", 'Gloomshade Moss']; // Required ingredients to create a Potion of Purification.
        const areCorrectIngredients = requiredIngredientsName.every(requiredIngredientName => ingredients.some(ingredient => ingredient.name === requiredIngredientName));
        return (ingredients.length === 2 && areCorrectIngredients); 
    }

    createPotionType(commonAttributeEffects) {
        if (commonAttributeEffects.length > 0) {
            for (let effect of commonAttributeEffects) {

                // Creation of Purification   
                if (this.isPotionOfPurification()) {
                    console.log("create PurificationPotion");
                    const potion = Purification.create(this.ingredients.ingredients);
                    return potion;
                }

                //Creation of Essence/Stench     
                if (effect.attribute === 'hit_points') {
                    if (effect.effect === 'increase') {
                        console.log("create EssencePotion");
                        const potion = Essence.create(this.ingredients.ingredients);
                        return potion;
                    } else if (effect.effect === 'decrease') {
                        console.log("create StenchPotion");
                        const potion = Stench.create(this.ingredients.ingredients);
                        return potion;
                    }
                }
                //Creation of Venom/Elixir
                if (effect.attribute === 'insanity') {
                    if (effect.effect === 'calm') {
                        console.log("create ElixirPotion");
                        const potion = Elixir.create(this.ingredients.ingredients, "insanity");
                        return potion;
                    } else if (effect.effect === 'frenzy') {
                        console.log("create VenomPotion");
                        const potion = Venom.create(this.ingredients.ingredients, "insanity");
                        return potion;
                    }
                } else {
                    if (effect.effect === 'boost') {
                        console.log("create ElixirPotion");
                        const potion = Elixir.create(this.ingredients.ingredients, effect.attribute);
                        return potion;
                    } else if (effect.effect === 'setback') {
                        console.log("create VenomPotion");
                        console.log("line88 cauldron");

                        console.log(this.ingredients.ingredients[0]);
                        const potion = Venom.create(this.ingredients.ingredients, effect.attribute);
                        return potion;
                    }
                }

            }
        }
        return FailedPotion.create(this.playerData);
    }

    createAntidote(selectedIngredients, diseases) {

        for (let i = 0; i < diseases.length; i++) {
            const disease = diseases[i];

            const requiredEffects = disease.antidote_effects;

            const matchingIngredients = selectedIngredients.filter(ingredient => {
                const effects = ingredient.effects.map(effect => effect.fullName);
                return effects.some(effect => requiredEffects.includes(effect));
            });

            if (matchingIngredients.length === requiredEffects.length) {
                console.log("create antidotePotion");

                const potion = Antidote.create(disease);
                return potion;
            }
        }

        return FailedPotion.create(this.playerData);
    }

    createPoison(selectedIngredients, diseases) {

        for (let i = 0; i < diseases.length; i++) {
            const disease = diseases[i];

            const requiredEffects = disease.poison_effects;

            const matchingIngredients = selectedIngredients.filter(ingredient => {
                const effects = ingredient.effects.map(effect => effect.fullName);
                return effects.some(effect => requiredEffects.includes(effect));
            });

            if (matchingIngredients.length === requiredEffects.length) {
                console.log("create poisonPotion");

                const potion = Poison.create(disease);
                return potion;
            }
        }
        return FailedPotion.create(this.playerData);
    }

}

export default Cauldron;
