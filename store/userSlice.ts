import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import {
  createUserData,
  fetchAllUsers,
  updateUserData,
} from '../apis/userApi'
import { User } from '@/types'

/**
 * Interface representing the state of user authentication and user list.
 */
interface UserState {
  currentUser: string | null  // Email of the currently logged-in user
  allUsers: User[]            // List of all users in the system
  isLoading: boolean          // Indicates if an async operation is in progress
  error: string | null        // Holds error messages if any
}

/**
 * Initial state for the authentication slice.
 */
const initialState: UserState = {
  currentUser: null,
  allUsers: [],
  isLoading: false,
  error: null,
}

/**
 * Asynchronous thunk for logging in a user with Firebase authentication.
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
      const token = await userCredential.user.getIdToken()
      localStorage.setItem('token', token) // Store token in localStorage
      return { user: userCredential.user.email, token }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

/**
 * Asynchronous thunk for logging out the current user from Firebase authentication.
 */
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth)
    localStorage.removeItem('token') // Remove token from localStorage
    return null
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

/**
 * Asynchronous thunk for fetching all users from the API.
 */
export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsers()
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

/**
 * Asynchronous thunk for updating a user's data in the API.
 */
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await updateUserData(userData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

/**
 * Asynchronous thunk for creating a new user in the API.
 */
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await createUserData(userData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

/**
 * Redux slice for managing user authentication and user list state.
 */
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer for manually setting the current user (e.g., after token verification)
    setCurrentUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload;
        state.allUsers = state.allUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const createdUser = action.payload;
        state.allUsers = state.allUsers.map((user) =>
          user.id === createdUser.id ? createdUser : user
        );
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
})


export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer
