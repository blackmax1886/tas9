import { ReactNode } from 'react'

import AuthGuard from './auth_guard'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

const GuardLayout = ({ children }: { children: ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>
}

export { RootLayout, GuardLayout }
