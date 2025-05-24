import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "./slices/productSlice";
import { PersistPartial } from "redux-persist/lib/persistReducer";

const persistConfig = {
  key: "vibetribe",
  storage: storage,
  blacklist: ["resourceSlice"],
};

const rootReducer = combineReducers({
  productSlice
});

type RootReducerType = ReturnType<typeof rootReducer>;
type PersistedState = RootReducerType & PersistPartial;

const makeConfiguredStore = () => configureStore({ reducer: rootReducer });
const PersistedReducer: Reducer<PersistedState> = persistReducer(
  persistConfig,
  rootReducer
);

export const makeStore = () => {
  const isServer = typeof window === "undefined";

  const store = configureStore({
    reducer: isServer
      ? rootReducer
      : (PersistedReducer as Reducer<RootReducerType | PersistedState>),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  if (isServer) {
    (store as any).persistor = persistStore(store);
  }

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const persistor = persistStore(makeStore());
