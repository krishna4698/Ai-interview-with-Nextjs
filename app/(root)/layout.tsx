import { isAuthenticated } from '@/lib/actions/auth.action'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

async function RootLayout({children}:{children:ReactNode}) {
  const isUserAuthenticated=await isAuthenticated();
  if(!isUserAuthenticated) redirect('/sign-in')
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

