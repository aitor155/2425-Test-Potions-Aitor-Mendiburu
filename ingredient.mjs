import Effect from "./effects.mjs";

class Ingredient {

    constructor(name, effects, value, image) {

        this.name = name;
        this.effects = effects;
        this.value = value;
        this.image = image;

    }

    static from({name, effects, value, image}){
        return new Ingredient(
            name,
            effects.map(effect => {
                if (typeof effect === 'string') {
                    return Effect.from(effect);
                } else if (effect.fullName) {
                    return Effect.from(effect.fullName);
                } else {
                    throw new Error(`El efecto no tiene 'fullName': ${JSON.stringify(effect)}`);
                }
            }),
            value,
            image
        );
    }

    hasName(name){
        return this.name === name;
    }
    hasEffectByAttribute(effect){
        return this.effects.some(candidate => effect.attribute === candidate.attribute);
    }

    findCommonAttributeEffectsMultipleSet(...otherIngredients) {
        if (otherIngredients.length === 0) {
            return [];
        }
        let commonAttributes = new Set(this.effects.map(effect => effect.attribute));

        for (let ingredient of otherIngredients) {
            const attributes = new Set(ingredient.effects.map(effect => effect.attribute));
            commonAttributes = new Set([...commonAttributes].filter(attr => attributes.has(attr)));
            if (commonAttributes.size === 0) {
                break; 
            }
        }
        return this.effects.filter(effect => commonAttributes.has(effect.attribute));
    }
    findCommonEffectsMultipleSet(...otherIngredients) {
        if (otherIngredients.length === 0) {
            return [];
        }
        let commonEffects = new Set(this.effects.map(effect => effect.effect));

        for (let ingredient of otherIngredients) {
            const effects = new Set(ingredient.effects.map(effect => effect.effect));
            commonEffects = new Set([...commonEffects].filter(eff => effects.has(eff)));
            if (commonEffects.size === 0) {
                break; 
            }
        }
        return this.effects.filter(effect => commonEffects.has(effect.effect));
    }


    hasEffect(effect){
        return this.effects.some(candidate => effect.fullName === candidate.fullName);
    }

}
export default Ingredient;