class Effect {
    constructor(fullName, attribute, modifier, effect) {
        this.fullName = fullName;
        this.attribute = attribute;
        this.modifier = modifier;
        this.effect = effect;
    }

    static from(fullName){
        const parts = fullName.split('_');
        const modifiers = ['least', 'lesser', 'greater'];
        const effects = ['increase', 'decrease', 'frenzy', 'setback', 'calm', 'boost', 'damage', 'restore'];

        let modifier = '';
        let effect = '';
        let attribute = '';

        if (modifiers.includes(parts[0])) {
            modifier = parts.shift();
        } else {
            modifier = 'nada';
        }

        if (effects.includes(parts[0])) {
            effect = parts.shift();
        } else {
            effect = 'nada'; 
        }

        attribute = parts.join('_');

        if (!attribute) {
            attribute = 'insanity';
        }

        return new Effect(
            fullName,
            attribute,
            modifier,
            effect,
        );
    }
}

export default Effect;


