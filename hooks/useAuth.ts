import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebaseConfig'
import { setCurrentUser } from '@/store/userSlice'
import { useAppDispatch } from '@/store/hooks'

/**
 * Custom hook to handle user authentication state changes and 
 * update the Redux store accordingly.
 */
const useAuthStateChanged = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    /**
     * Unsubscribes from the Firebase auth state change listener.
     */
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem('token', token)
          dispatch(setCurrentUser(user.email))
        })
      } else {
        localStorage.removeItem('token')
        dispatch(setCurrentUser(null))
      }
    })

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribeFromAuthStateChanged()
  }, [dispatch])
}

export default useAuthStateChanged
