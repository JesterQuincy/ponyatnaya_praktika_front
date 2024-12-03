import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex-auto w-full max-h-screen">{children}</div>
}
