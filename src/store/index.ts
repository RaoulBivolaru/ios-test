import { combineReducers, Middleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import * as modules from "./modules";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { api } from "./api";

const reducer = combineReducers({
  ...Object.values(modules).reduce(
    (acc, module) => ({
      ...acc,
      [module.reducerPath]: module.reducer,
    }),
    {}
  ),
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(api.middleware as Middleware);
  },
});

const persistor = persistStore(store);

export { store, persistor };
