'use client'

import React, { ChangeEvent, useState, useEffect } from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { User } from '@/types'

/**
 * Interface for UserModal component props.
 */
interface UserModalProps {
  isOpen: boolean          // Indicates whether the modal is open
  onClose: () => void       // Callback to close the modal
  initialUser?: User | null // Initial user data for editing (optional)
  onSubmit: (user: User) => void  // Callback to submit the user data
  errorMessage?: string | null // Error message to display (optional)
}

/**
 * Modal component for creating or editing user information.
 * @param {UserModalProps} props - Component properties.
 */
const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, initialUser, onSubmit, errorMessage }) => {
  const isEditing = !!initialUser

  // State to manage form data with initial values
  const [userData, setUserData] = useState<User>(initialUser || { id: '', name: '', email: '', address: '' })

  // Update userData when initialUser prop changes (for editing)
  useEffect(() => {
    setUserData(initialUser || { id: '', name: '', email: '', address: '' })
  }, [initialUser])

  /**
   * Handles changes in the input fields and updates userData.
   * @param {ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }

  /**
   * Handles form submission.
   */
  const handleSubmit = () => {
    onSubmit(userData)
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: 'calc(50% - 200px)',
        left: 'calc(50% - 200px)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24, p: 4,
        borderRadius: '8px'
      }}>
        <Typography variant='h6' component='h2'>
          {isEditing ? 'Edit User' : 'Create User'}
        </Typography>
        {errorMessage && <Typography color='error'>{errorMessage}</Typography>}
        <TextField
          margin='normal' fullWidth label='Name'
          name='name' value={userData.name} onChange={handleChange}
        />
        <TextField
          margin='normal' fullWidth label='Email'
          name='email' value={userData.email} onChange={handleChange}
        />
        <TextField
          margin='normal' fullWidth label='Address'
          name='address' value={userData.address} onChange={handleChange}
        />
        <Button variant='contained' color='primary' onClick={handleSubmit} sx={{ mt: 2 }}>
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Modal>
  )
}

export default UserModal
