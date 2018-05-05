export function authStatus(status) {
    return {
        type: 'AUTH_STATUS',
        status
    };
}

export function spellFromIdStatus(status) {
    return {
        type: 'SPELL_STATUS',
        status
    };
}

export function spellFromIdFetchDataSuccess(spell) {
    return {
        type: 'SPELL_FETCH_DATA_SUCCESS',
        spell
    };
}

export function lightlSpellsStatus(status) {
    return {
        type: 'LIGHT_SPELLS_STATUS',
        status
    };
}

export function spellsWithFiltersFetchDataSuccess(lightSpellsWithFilters) {
    return {
        type: 'SPELLS_WITH_FILTERS_FETCH_DATA_SUCCESS',
        lightSpellsWithFilters
    };
}

// AUTH //
// POST
// Expects an { email: 'string', password: 'password' } object.
export function authLogin(credentials) {
    const url = '/api/auth/login';

    return (dispatch) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else if (response.status === 401) {
                    throw Error(response.statusText);
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(() => dispatch(authStatus('AUTHORISED')))
            .catch((err) => {
                if (err.message === 'Unauthorized') {
                    dispatch(authStatus('UNAUTHORISED'));
                } else {
                    dispatch(authStatus('ERRORED'));
                }
            });
    };
}

// GET
export function authLogout(credentials) {
    const url = '/api/auth/logout';

    return (dispatch) => {
        fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else if (response.status === 401) {
                    throw Error(response.statusText);
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((response) => response.json())
            .then(() => dispatch(authStatus('UNAUTHORISED')))
            .catch((err) => {
                if (err.message === 'Unauthorized') {
                    dispatch(authStatus('UNAUTHORISED'));
                } else {
                    dispatch(authStatus('ERRORED'));
                }
            });
    };
}

// SPELLS //
// GET
// Gets a spell (full spell), from an id
export function fetchSpellFromId(id) {
    const url = '/api/spells/id/' + id;

    return (dispatch) => {
        dispatch(spellFromIdStatus('LOADING'));

        fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(spellFromIdStatus('COMPLETED'));
                    return response;
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((response) => response.json())
            .then((spell) => {
                dispatch(spellFromIdFetchDataSuccess(spell));
                // If we recieved something back esnure the authStatus is set to authorised, as we must be..
                dispatch(authStatus('AUTHORISED'));
            })
            .catch((err) => {
                dispatch(spellFromIdStatus('ERRORED'));
                if (err.message === 'Unauthorized') {
                    dispatch(authStatus('UNAUTHORISED'));
                } else {
                    dispatch(authStatus('ERRORED'));
                }
            });
    };
}

// GET
// Gets all spells with filters
export function fetchLightSpellsWithFilters() {
    const url = '/api/spells/light/withfilters';

    return (dispatch) => {
        dispatch(lightlSpellsStatus('LOADING'));

        fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(lightlSpellsStatus('COMPLETED'));
                    return response;
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((response) => response.json())
            .then((lightSpellsWithFilters) => {
                dispatch(spellsWithFiltersFetchDataSuccess(lightSpellsWithFilters));
                // If we recieved something back esnure the authStatus is set to authorised, as we must be..
                dispatch(authStatus('AUTHORISED'));
            })
            .catch((err) => {
                dispatch(lightlSpellsStatus('ERRORED'));
                if (err.message === 'Unauthorized') {
                    dispatch(authStatus('UNAUTHORISED'));
                } else {
                    dispatch(authStatus('ERRORED'));
                }
            });
    };
}

// POST
// Gets all spells with filters, from provided filters
export function fetchLightSpellsWithFiltersFromFilters(filters) {
    const url = '/api/spells/light/withfilters';

    return (dispatch) => {
        dispatch(lightlSpellsStatus('LOADING'));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(filters)
        })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(lightlSpellsStatus('COMPLETED'));
                    return response;
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((response) => response.json())
            .then((lightSpellsWithFilters) => {
                dispatch(spellsWithFiltersFetchDataSuccess(lightSpellsWithFilters));
                // If we recieved something back esnure the authStatus is set to authorised, as we must be..
                dispatch(authStatus('AUTHORISED'));
            })
            .catch((err) => {
                dispatch(lightlSpellsStatus('ERRORED'));
                if (err.message === 'Unauthorized') {
                    dispatch(authStatus('UNAUTHORISED'));
                } else {
                    dispatch(authStatus('ERRORED'));
                }
            });
    };
}

