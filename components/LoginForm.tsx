'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginUser } from '@/store/userSlice'

/**
 * Login form component for user authentication.
 */
const LoginForm = () => {
  const [email, setEmail] = useState('testing@email.id')
  const [password, setPassword] = useState('password')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading, error: loginError } = useAppSelector((state) => state.user)

  /**
   * Handles the login process by dispatching the loginUser action.
   * If successful, redirects to the home page.
   */
  const handleLogin = async () => {
    const resultAction = await dispatch(loginUser({ email, password }))

    if (loginUser.fulfilled.match(resultAction)) {
      router.push('/')
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          {loginError && (
            <Typography color="error" variant="body2">
              {loginError}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginForm
