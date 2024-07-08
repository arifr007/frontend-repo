'use client'

import React, { useEffect, useState } from 'react'
import { RootState } from '../store/store'
import { getUsers, updateUser, createUser } from '../store/userSlice'
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, AppBar, Toolbar, IconButton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { User } from '@/types'
import UserModal from './UserModal'
import LogoutButton from './LogoutButton'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'
import Grid from '@mui/material/Grid'

const UserList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { currentUser, isLoading, error, allUsers } = useAppSelector((state: RootState) => state.user)

  useAuth() // Authentication hook (ensure the user is logged in)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalError, setModalError] = useState<string | null>(null)

  // Function to open the modal in either create or edit mode
  const openModal = (mode: 'create' | 'edit', user?: User) => {
    setModalMode(mode)
    setSelectedUser(mode === 'create' ? null : user as User)
    setModalOpen(true)
    setModalError(null) // Reset error when opening modal
  }

  const closeModal = () => setModalOpen(false)

  // Function to handle form submission
  const handleSubmit = async (userData: User) => {
    try {
      if (modalMode === 'create') {
        await dispatch(createUser(userData)).unwrap()
      } else if (selectedUser) {
        const updatedUser = { ...selectedUser, ...userData }
        await dispatch(updateUser(updatedUser)).unwrap()
      } else {
        throw new Error('No user selected for editing.')
      }

      dispatch(getUsers()) // Refresh user list
      closeModal()  // Close the modal
      setModalError(null) // Clear any error messages
      setSelectedUser(null) // Clear the selected user data 

    } catch (err: any) {
      setModalError(err?.message || 'An error occurred.')
    }
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]) // Fetch users when the component mounts and when dispatch changes


  return (
    <Container>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} alignContent={'end'}>
          {currentUser ? (
            <LogoutButton />
          ) : (
            <Link href='/login'>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => openModal('create')}
                sx={{ mb: 5 }}
              >Login
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={10}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            User List
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button
            fullWidth={true}
            variant='contained'
            color='secondary'
            onClick={() => openModal('create')}
            sx={{ mb: 5 }}
          >
            Create User
          </Button>
        </Grid>
      </Grid>

      {/* Loading and Error handling */}
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography color='error'>{error}</Typography>}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => openModal('edit', user)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <UserModal
        isOpen={modalOpen}
        onClose={closeModal}
        initialUser={selectedUser}
        onSubmit={handleSubmit}
        errorMessage={modalError}
      />
    </Container>
  )
}

export default UserList