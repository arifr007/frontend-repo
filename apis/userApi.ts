import { User } from '@/types'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

/**
 * Axios instance configured for interacting with the user API.
 */
const userApi = axios.create({
  baseURL: `${apiUrl}/users`,
  headers: { 'Content-Type': 'application/json' }
})

// Add authorization token to requests if it exists in localStorage
userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Fetches all users from the API.
 */
export const fetchAllUsers = async () => {
  const response = await userApi.get('/')
  return response.data
}

/**
 * Fetches a specific user by ID from the API.
 *
 * @param userId The ID of the user to fetch.
 */
export const getUserById = async (userId: string) => {
  const response = await userApi.get(`/${userId}`)
  return response.data
}

/**
 * Updates a user's data in the API.
 *
 * @param userData The updated user data.
 */
export const updateUserData = async (userData: User) => {
  const response = await userApi.put(`/${userData.id}`, userData)
  return response.data
}

/**
 * Creates a new user in the API.
 *
 * @param userData The data for the new user.
 */
export const createUserData = async (userData: User) => {
  const response = await userApi.post('/', userData)
  return response.data
}
