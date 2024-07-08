// use client directive indicates that the code is rendered on the client-side
'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { createAppStore } from '@/store/store' // Assuming you've made improvements here

/**
 * Provides the Redux store to child components during client-side rendering.
 * Creates the store instance only once and reuses it for subsequent renders.
 *
 * @param children - The child components to be wrapped within the Provider.
 */
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef(createAppStore()) // Create store on initial render

  return <Provider store={storeRef.current}>{children}</Provider>
}
