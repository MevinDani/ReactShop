import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createStore } from 'redux'
import cartReducer from './cartRedux'
import userReducer from './userRedux'
import wishRedux from './wishListRedux'
import {
    persistStore,
    persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ["reqSuccess"]
}

const reducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    wish: wishRedux
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer
})

// export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
// }


// export const persistor = persistStore(store)