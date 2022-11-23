import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";

import { Provider } from "react-redux";

import bookmarks from "../reducers/bookmarks";
import user from "../reducers/user";
import hiddenArticles from "../reducers/hiddenArticles";

// 1) Import redux-persist
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

// 2)bis Import combineReducer (lien entre les reducers persistants et le store
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// 2)bisbis' Définition des reducers avec la fonction combineReducers
// Exemple : friends à la place de reducername
const reducers = combineReducers({ user, bookmarks, hiddenArticles });

// 3) Donner un nom au store à l'intérieur de local storage
// Note : Le paramètre "key" devra être modifié pour chaque nouvelle application afin d’éviter des conflits au niveau du local storage.
const persistConfig = { key: "applicationName", storage };

// 4) Mettre à jour le contenu du store avec la fonction configureStore
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  // Note : cette ligne permet de gérer tous type de language y compris le typescrit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// 5) Transformer le store pour qu'il devienne persistant
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Morning News</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
