export function spellFromIdStatus(state = 'LOADING', action: any) {
    switch (action.type) {
        case 'SPELL_STATUS':
            return action.status;
        default:
            return state;
    }
}

export function lightSpellsStatus(state = 'LOADING', action: any) {
    switch (action.type) {
        case 'LIGHT_SPELLS_STATUS':
            return action.status;
        default:
            return state;
    }
}

export function spellFromId(state = {}, action: any) {
    switch (action.type) {
        case 'SPELL_FETCH_DATA_SUCCESS':
            return action.spell
        default:
            return state
    }
}

export function lightSpellsWithFilters(state = { filters: {}, spells: [] }, action: any) {
    switch (action.type) {
        case 'SPELLS_WITH_FILTERS_FETCH_DATA_SUCCESS':
            return action.lightSpellsWithFilters
        default:
            return state
    }
}
