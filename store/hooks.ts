import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

/**
 * A custom hook to provide the application's Redux dispatch function.
 * This hook ensures type safety for dispatching actions.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * A custom hook to access the application's Redux state.
 * This hook provides type-safe access to the state properties.
 */
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * A custom hook to access the application's Redux store instance.
 * This hook is typically used for more advanced scenarios, like replacing reducers.
 */
export const useAppStore = useStore.withTypes<AppStore>()
