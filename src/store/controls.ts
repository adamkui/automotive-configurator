import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControlsState {
  controlsEnabled: boolean;
  canRotate: boolean;
  showAnnotations: boolean;
  activeAnnotationIndex: number;
}

const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    canRotate: true,
    controlsEnabled: true,
    showAnnotations: false,
    activeAnnotationIndex: 1,
  } as ControlsState,
  reducers: {
    setControlsEnabled: (state, action: PayloadAction<boolean>) => {
      state.controlsEnabled = action.payload;
    },
    setRotate: (state, action: PayloadAction<boolean>) => {
      state.canRotate = action.payload;
    },
    toggleRotation: (state) => {
      state.canRotate = !state.canRotate;
    },
    toggleAnnotations: (state) => {
      if (!state.showAnnotations && state.canRotate) {
        state.canRotate = false;
      }
      state.showAnnotations = !state.showAnnotations;
    },
    setActiveAnnotationIndex: (state, action: PayloadAction<number>) => {
      state.activeAnnotationIndex = action.payload;
    },
    previousAnnotation: (state) => {
      state.activeAnnotationIndex = Math.max(
        state.activeAnnotationIndex - 1,
        1
      );
    },
  },
});

const { reducer, actions } = controlsSlice;

export const {
  setControlsEnabled,
  setRotate,
  toggleRotation,
  toggleAnnotations,
  setActiveAnnotationIndex,
  previousAnnotation,
} = actions;

export default reducer;
