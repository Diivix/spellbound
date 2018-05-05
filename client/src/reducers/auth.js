export function authStatus(state = {}, action) {
    switch (action.type) {
        case 'AUTH_STATUS':
            return action.status;
        default:
            return state;
    }
}