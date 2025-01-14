

// Constantes para calcular el valor de curacion de una pocion de tipo ESSENCE
export const Essence_Value = {
    LEAST: 5,
    LESSER: 10,
    NADA: 15,
    GREATER: 20,
}

// Constantes para calcular el valor de daño de una pocion de tipo STENCH
export const Stench_Value = {
    LEAST: -5,
    LESSER: -10,
    NADA: -15,
    GREATER: -20,
}

// Constantes para calcular el valor de curacion de una pocion de tipo Elixir salvo el atributo Insanity
export const Elixir_Values = {
    LEAST: {
        VALUE: 5,
        DURATION: 1,
    },
    LESSER:  {
        VALUE: 10,
        DURATION: 1,
    },
    NADA:  {
        VALUE: 15,
        DURATION: 2,
    },
    GREATER:  {
        VALUE: 20,
        DURATION: 3,
    },
}

// Constantes para calcular el valor de curacion de una pocion de tipo Elixir para el atributo Insanity
export const Elixir_Values_Insanity = {
    LEAST: {
        VALUE: -5,
        DURATION: 1,
    },
    LESSER:  {
        VALUE: -10,
        DURATION: 1,
    },
    NADA:  {
        VALUE: -15,
        DURATION: 2,
    },
    GREATER:  {
        VALUE: -20,
        DURATION: 3,
    },
}

// Constantes para calcular el valor de curacion de una pocion de tipo Venom salvo el atributo Insanity
export const Venom_Values = {
    LEAST: {
        VALUE: -5,
        DURATION: 1,
    },
    LESSER:  {
        VALUE: -10,
        DURATION: 1,
    },
    NADA:  {
        VALUE: -15,
        DURATION: 2,
    },
    GREATER:  {
        VALUE: -20,
        DURATION: 3,
    },
}

// Constantes para calcular el valor de curacion de una pocion de tipo Venom para el atributo Insanity
export const Venom_Values_Insanity = {
    LEAST: {
        VALUE: 5,
        DURATION: 1,
    },
    LESSER:  {
        VALUE: 10,
        DURATION: 1,
    },
    NADA:  {
        VALUE: 15,
        DURATION: 2,
    },
    GREATER:  {
        VALUE: 20,
        DURATION: 3,
    },
}

// Constantes para el rango a la hora de calcular el valor del antidoto de la enfermedad
export const Antidote_Values = {

    // INTELLIGENCE
    LEAST_RESTORE: {
        min: 1,
        max: 5,
    },
    LESSER_RESTORE: {
        min: 6,
        max: 9,
    },
    RESTORE: {
        min: 10,
        max: 13,
    },
    GREATER_RESTORE: {
        min: 14,
        max: 15,
    },

    // HIT POINTS
    LEAST_RESTORE_HIT_POINTS: {
        min: 20,
        max: 35,
    },
    LESSER_RESTORE_HIT_POINTS: {
        min: 40,
        max: 50,
    },
    RESTORE_HIT_POINTS: {
        min: 50,
        max: 65,
    },
    GREATER_RESTORE_HIT_POINTS: {
        min: 65,
    },

    // INSANITY
    LEAST_RESTORE_INSANITY: {
        min: 1,
        max: 5,
    },
    LESSER_RESTORE_INSANITY: {
        min: 6,
        max: 12,
    },
    RESTORE_INSANITY: {
        min: 13,
        max: 20,
    },
    GREATER_RESTORE_INSANITY: {
        min: 21,
        max: 25,
    },
}

// Constantes para el rango a la hora de calcular el valor del antidoto de la enfermedad
export const Poison_Values = {
    
    // INTELLIGENCE
    LEAST_DAMAGE: {
        min: 1,
        max: 5,
    },
    LESSER_DAMAGE: {
        min: 6,
        max: 9,
    },
    DAMAGE: {
        min: 10,
        max: 13,
    },
    GREATER_DAMAGE: {
        min: 14,
        max: 15,
    },

    // HIT POINTS
    LEAST_DAMAGE_HIT_POINTS: {
        min: 20,
        max: 35,
    },
    LESSER_DAMAGE_HIT_POINTS: {
        min: 40,
        max: 50,
    },
    DAMAGE_HIT_POINTS: {
        min: 50,
        max: 65,
    },
    GREATER_DAMAGE_HIT_POINTS: {
        min: 65,
    },

    // INSANITY
    LEAST_DAMAGE_INSANITY: {
        min: 1,
        max: 5,
    },
    LESSER_DAMAGE_INSANITY: {
        min: 6,
        max: 12,
    },
    DAMAGE_INSANITY: {
        min: 13,
        max: 20,
    },
    GREATER_DAMAGE_INSANITY: {
        min: 21,
        max: 25,
    },
}