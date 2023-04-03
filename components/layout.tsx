import AuthGuard from './auth_guard'
import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

const GuardLayout = ({ children }: { children: ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>
}

export { RootLayout, GuardLayout }
