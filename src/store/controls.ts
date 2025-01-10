import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControlsState {
  controlsEnabled: boolean;
  canRotate: boolean;
}

const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    canRotate: true,
    controlsEnabled: true,
  } as ControlsState,
  reducers: {
    setControlsEnabled: (state, action: PayloadAction<boolean>) => {
      state.controlsEnabled = action.payload;
    },
    setRotate: (state, action: PayloadAction<boolean>) => {
      state.canRotate = action.payload;
    },
  },
});

const { reducer, actions } = controlsSlice;

export const { setControlsEnabled, setRotate } = actions;

export default reducer;
