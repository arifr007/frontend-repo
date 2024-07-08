import { combineReducers } from '@reduxjs/toolkit'
import UserReducer from './userSlice'

// Combines all feature reducers into a single root reducer for the Redux store.
const rootReducer = combineReducers({
	user: UserReducer
})

export default rootReducer
