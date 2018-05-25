import { combineReducers } from 'redux'
import { authStatus } from './auth'
import {
    lightSpellsStatus,
    lightSpellsWithFilters,
    spellFromId,
    spellFromIdStatus
} from './spells'

const rootReducer = combineReducers({
    authStatus,
    lightSpellsStatus,
    lightSpellsWithFilters,
    spellFromId,
    spellFromIdStatus
})

export default rootReducer
