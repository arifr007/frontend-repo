import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../theme'
import StoreProvider from './StoreProvider'

/**
 * Metadata for the application's root layout.
 */
export const metadata: Metadata = {
  title: 'Ebuddy Coding Test',
  description: 'Ebuddy Coding Test'
}

/**
 * Root layout component for the application. 
 * Provides the Redux store, Material UI theme, and CSS baseline.
 *
 * @param children - React children components to render within the layout.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
