//the provider uses the browser's capabilities for authentication
// hence it is a client component

'use client'

import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <Suspense fallback={null}>{children}</Suspense>
    </SessionProvider>
  )
}

export default Provider
