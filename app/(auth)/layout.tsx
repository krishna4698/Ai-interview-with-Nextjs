import React, { ReactNode } from 'react'

function AuthLayout({children}:{children:ReactNode}) {
  return (
    <div>
        Auth Header
      {children}
    </div>
  )
}

export default AuthLayout
