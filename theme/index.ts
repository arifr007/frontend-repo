// use client directive indicates that the code is rendered on the client-side
'use client'

// Import the Roboto font from the Next.js font library
import { Roboto } from 'next/font/google'
// Import the createTheme function from the MUI styles library
import { createTheme } from '@mui/material/styles'

/**
 * Custom Roboto font configuration for the application.
 * Loads the Roboto font with specified weights and subsets for optimal performance.
 */
const roboto = Roboto({
  weight: ['300', '400', '500', '700'], 
  subsets: ['latin'], 
  display: 'swap'  // Strategy for font loading: 'swap' replaces the fallback font once Roboto loads
})

/**
 * Creates a custom Material UI theme for the application.
 * Overrides the default theme's typography to use the Roboto font.
 */
const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily, // Sets the Roboto font as the default font family
  },
  palette: {
    primary: {
      main: "#fcba03",
    },
  }
})

// Exports the custom theme as the default export of the module
export default theme
