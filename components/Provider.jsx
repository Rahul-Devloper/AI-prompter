//the provider uses the browser's capabilities for authentication
// hence it is a client component

'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Provider
