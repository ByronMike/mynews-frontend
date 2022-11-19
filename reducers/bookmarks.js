import { createSlice } from "@reduxjs/toolkit";

// 2) Initialiser avec un tableau vide le reducer
const initialState = {
  value: [],
};

// 3)a On donne un nom au reducer (ex: friends)
export const bookmarksSlice = createSlice({
  name: "bookmarks",

  // 3)b on utilise le tableau
  initialState,
  // 3)c On créé l’action addFriendToStore qui signifie (ajouter un élément à ce tableau)
  reducers: {
    addBookmark: (state, action) => {
        state.value.push(action.payload)
    },
    removeBookmark: (state, action) => {
        // Note : action.payload.title => référence aux titres des articles issus de la résultat de l'action  (analogie avec les sorties data des routes)
        //      : bookmark.title => référence aux titres des articles envoyés dans le tableau bookmark
        state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title)
    },
  },
});

// Note : action.payload => pour réaliser une action (analogie avec les sorties data des routes)
// if(!state.value.find(e => e.title === action.payload.title)){
//     state.value.push(action.payload);
// } else {
//     state.value = state.value.filter(e => e.title !== action.payload.title)
// }

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
// 4) Ne pas oublier d’importer puis d’ajouter ce reducer nouvellement créé à votre store
