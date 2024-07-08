import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers'

/**
 * Creates the Redux store for the application.
 *
 * @returns {AppStore} The configured Redux store.
 */
export const createAppStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable devtools only in dev mode
  })

// Infer the store type from the store creator function
export type AppStore = ReturnType<typeof createAppStore>
// Infer the state type from the store
export type RootState = ReturnType<AppStore['getState']>
// Infer the dispatch type from the store
export type AppDispatch = AppStore['dispatch']

// Custom AppThunk type for async actions (if needed)
export type AppThunk<ReturnType = void> = (
  dispatch: AppDispatch,
  getState: () => RootState
) => ReturnType

// Create a wrapper for Next.js integration
export const wrapper = createWrapper<AppStore>(createAppStore) 
