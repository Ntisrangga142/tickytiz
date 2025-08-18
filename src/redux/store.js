import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movie/moviesSlice.js';
import authReducer from './auth/authSlice.js';
import orderReducer from './order/orderSlice.js';
import mvReducer from './admin/moviesSlice.js';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  movies  : moviesReducer,
  auth    : authReducer,
  order   : orderReducer,
  admin   : mvReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['movies', 'auth', 'order', 'admin'],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);
