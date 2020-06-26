
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import { cart } from './reducers'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

export const reducer = combineReducers({
  cart
});

const persistedReducer = persistReducer(persistConfig, reducer)

const initializeStore = (initialState) => {
  return createStore(persistedReducer, initialState, applyMiddleware(thunkMiddleware));
}

const initializePersistor = (store) => {
  return persistStore(store);
}

export {
  initializeStore,
  initializePersistor
}