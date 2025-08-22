import Link from 'next/link'
import React, { ReactNode } from 'react'

function RootLayout({children}:{children:ReactNode}) {
  return (
    <div>
       <nav>
        <Link href="/" className="flex items-center gap-2">
          
          <h2 className="text-primary-100">PrepWise</h2>
          {children}
        </Link>
      </nav>
    </div>
  )
}

export default RootLayout

