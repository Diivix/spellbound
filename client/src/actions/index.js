export function authStatus(status) {
    return {
        status,
        type: 'AUTH_STATUS'
    };
}

export function spellFromIdStatus(status) {
    return {
        status,
        type: 'SPELL_STATUS'
    };
}

export function spellFromIdFetchDataSuccess(spell) {
    return {
        spell,
        type: 'SPELL_FETCH_DATA_SUCCESS'
    };
}

export function lightlSpellsStatus(status) {
    return {
        status,
        type: 'LIGHT_SPELLS_STATUS'
    };
}

export function spellsWithFiltersFetchDataSuccess(lightSpellsWithFilters) {
    return {
        lightSpellsWithFilters,
        type: 'SPELLS_WITH_FILTERS_FETCH_DATA_SUCCESS'
    };
}

// AUTH //
// POST
// Expects an { email: 'string', password: 'password' } object.
export function authLogin(credentials) {
    const url = '/api/auth/login';

    return (dispatch) => {
        fetch(url, {
            body: JSON.stringify(credentials),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
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
            credentials: 'include',
            method: 'GET'
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
            credentials: 'include',
            method: 'GET'
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
            credentials: 'include',
            method: 'GET'
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
            body: JSON.stringify(filters),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
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

