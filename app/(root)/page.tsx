import React from 'react'
import Link from 'next/link'
import { dummyInterviews } from '@/constants'
import InterviewCard from '../components/InterviewCard'


function Page() {
  return (
    <div className="p-6">
  
      <section>
        <h2>Get interview ready — AI powered practice</h2>
        <p>Practice a real interview</p>
      </section>

      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-2xl">
        <Link href="/interview">Start an Interview</Link>
      </button>

      <section className="mt-6">
        <h2>Your Interviews</h2>
        <div>
         {dummyInterviews.map((interview)=>(
        <InterviewCard{...interview} key={interview.id}/>
        
         ))}
        </div>
      </section>

      <section>
        <h2>Take an Interview</h2>
        <div>
          {dummyInterviews.map((interview)=>(
        <InterviewCard{...interview} key={interview.id}/>
        
         ))}
        </div>
      </section>
    </div>
  )
}

export default Page
