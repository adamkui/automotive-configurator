import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Car } from 'models';

interface SelectionsState {
  activeCar: Car | undefined;
  activeBodyColor: string | undefined;
  activeBrakeCaliperColor: string | undefined;
}

const selectionsSlice = createSlice({
  name: 'selections',
  initialState: {
    activeCar: undefined,
    activeBodyColor: undefined,
    activeBrakeCaliperColor: undefined,
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
  },
});

const { reducer, actions } = selectionsSlice;

export const { setActiveBodyColor, setActiveBrakeCaliperColor, setActiveCar } =
  actions;

export default reducer;
