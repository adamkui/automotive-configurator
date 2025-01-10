import { combineReducers, configureStore } from '@reduxjs/toolkit';

import controlsSlice from './controls';
import selectionsSlice from './selections';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const reducer = combineReducers({ controlsSlice, selectionsSlice });

const store = configureStore({
  reducer,
});

export default store;

declare global {
  type RootState = ReturnType<typeof store.getState>;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
