import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import navigationReducer from './navigationSlice';

/**
 * Redux Store Configuration
 * Centralized store combining all application slices
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    navigation: navigationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['ui/setLoading'],
      },
    }),
  devTools: import.meta.env.DEV,
});

/**
 * Type for Root State - used for typed selectors
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type for App Dispatch - used for typed dispatch
 */
export type AppDispatch = typeof store.dispatch;
