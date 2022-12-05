import { configureStore, createSlice } from "@reduxjs/toolkit";

const quoteSlice = createSlice({
  name: "Quotes",
  initialState: [],
  reducers: {
    addAllQuotes(state, action) {
      return action.payload;
    },
    addQuote(state, action) {
      state.push(action.payload);
    },
    sortQuotes(state, action) {
      if (action.payload === "Ascending") {
        state.sort((a, b) => a.createTime - b.createTime);
      } else {
        state.sort((a, b) => b.createTime - a.createTime);
      }
    },
  },
});

const quoteComments = createSlice({
  name: "Quote comments",
  initialState: [],
  reducers: {
    addAllComments(state, action) {
      // console.log("action.payload", action.payload);
      return action.payload;
    },
    addComment(state, action) {
      const idx = state.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (idx === -1) {
        state.push({
          id: action.payload.id,
          comments: [action.payload.comment],
        });
        return;
      }
      state[idx].comments.push(action.payload.comment);
    },
  },
});

export const quoteActions = quoteSlice.actions;
export const quoteCommentsActions = quoteComments.actions;

export default configureStore({
  reducer: { quotes: quoteSlice.reducer, comments: quoteComments.reducer },
});
