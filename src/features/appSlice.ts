import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface IAppState {
  user: any;
  selectedImage: string|null;
}

const initialState: IAppState = {
  user: null,
  selectedImage: null
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setSelectedImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
    },
    resetSelectedImage: (state) => {
      state.selectedImage = null;
    }
  },
});

export const { login, logout, setSelectedImage, resetSelectedImage } = appSlice.actions;

export const selectUser = (state: RootState) => state.app.user;

export const selectImage = (state: RootState) => state.app.selectedImage;

export default appSlice.reducer;
