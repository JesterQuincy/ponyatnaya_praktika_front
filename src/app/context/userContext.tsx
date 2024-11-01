'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

const UserContext = createContext<any>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
