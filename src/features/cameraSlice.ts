import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface ICameraState {
  cameraImage: string|null;
}

const initialState: ICameraState = {
  cameraImage: null,
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCameraImage: (state, action: PayloadAction<string>) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state) => {
        state.cameraImage = null;
    }
  },
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state: RootState) => state.camera.cameraImage;

export default cameraSlice.reducer;