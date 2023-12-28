import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import professionReducer from "./profession";
import themeReducer from "./theme";
import { persistStore, persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";

const rootReducer = combineReducers({
  user: userReducer,
  profession: professionReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
