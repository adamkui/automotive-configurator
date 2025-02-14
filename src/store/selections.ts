import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Car } from 'models';

interface SelectionsState {
  activeCar: Car | undefined;
  activeBodyColor: string | undefined;
  activeBrakeCaliperColor: string | undefined;
  activeSeatColor: string | undefined;
  activeWheelColor: string | undefined;
  activeWindowTint: string | undefined;
  suspensionHeight: number;
}

const selectionsSlice = createSlice({
  name: 'selections',
  initialState: {
    activeCar: undefined,
    activeBodyColor: undefined,
    activeBrakeCaliperColor: undefined,
    activeSeatColor: undefined,
    activeWheelColor: undefined,
    activeWindowTint: undefined,
    suspensionHeight: 0,
  } as SelectionsState,
  reducers: {
    setActiveCar: (state, action: PayloadAction<Car | undefined>) => {
      state.activeCar = action.payload;
    },
    setActiveBodyColor: (state, action: PayloadAction<string | undefined>) => {
      state.activeBodyColor = action.payload;
    },
    setActiveBrakeCaliperColor: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.activeBrakeCaliperColor = action.payload;
    },
    setActiveSeatColor: (state, action: PayloadAction<string | undefined>) => {
      state.activeSeatColor = action.payload;
    },
    setActiveWheelColor: (state, action: PayloadAction<string | undefined>) => {
      state.activeWheelColor = action.payload;
    },
    setActiveWindowTint: (state, action: PayloadAction<string | undefined>) => {
      state.activeWindowTint = action.payload;
    },
    setSuspensionHeight: (state, action: PayloadAction<number>) => {
      state.suspensionHeight = action.payload;
    },
  },
});

const { reducer, actions } = selectionsSlice;

export const {
  setActiveBodyColor,
  setActiveBrakeCaliperColor,
  setActiveCar,
  setActiveSeatColor,
  setActiveWheelColor,
  setActiveWindowTint,
  setSuspensionHeight,
} = actions;

export default reducer;
