import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Preview {
  style: string;
  html: string;
  js: string;
}

const initialState: { value: Preview } = {
  value: {
    style: "",
    html: "",
    js: "",
  },
};

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setStyle: (state, actions: PayloadAction<string>) => {
      state.value.style = actions.payload;
    },

    setHtml: (state, actions: PayloadAction<string>) => {
      state.value.html = actions.payload;
    },

    setJs: (state, actions: PayloadAction<string>) => {
      state.value.js = actions.payload;
    },
  },
});

export const { setHtml, setJs, setStyle } = previewSlice.actions;
export const preview = (state: { preview: { value: Preview } }) =>
  state.preview.value;

export const previewReducer = previewSlice.reducer;
export default previewReducer;
