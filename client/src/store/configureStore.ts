import { applyMiddleware, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
// import rootReducer from '../reducers';
import reducer from '../reducers/combinedReducers';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export function configureStore() {
    const store = createStore(
        persistedReducer,
        applyMiddleware(thunk)
    );

    return store;
}