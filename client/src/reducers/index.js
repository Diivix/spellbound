import { combineReducers } from 'redux'
import { authStatus } from './auth'
import {
    spellFromIdStatus,
    lightSpellsStatus,
    spellFromId,
    lightSpellsWithFilters
} from './spells'

const rootReducer = combineReducers({
    // auth,
    authStatus,
    lightSpellsStatus,
    lightSpellsWithFilters,
    spellFromId,
    spellFromIdStatus
})

export default rootReducer
