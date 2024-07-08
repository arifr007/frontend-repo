'use client'

import Link from 'next/link'
import { useAppDispatch } from '@/store/hooks'
import { logoutUser } from '@/store/userSlice'
import { Button } from '@mui/material'

// Button component that triggers the logout process when clicked.
const LogoutButton = () => {
  const dispatch = useAppDispatch()

  // Handles the logout action by dispatching the logoutUser action.
  const handleLogout = () => dispatch(logoutUser())

  return (
    <Link href='/login'>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleLogout}
        sx={{ mb: 5 }}
      >Logout</Button>
    </Link>
  )
}

export default LogoutButton
