import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import controlsSlice from './controls';
import selectionsSlice from './selections';

const reducer = combineReducers({ controlsSlice, selectionsSlice });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

declare global {
  type RootState = ReturnType<typeof store.getState>;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
