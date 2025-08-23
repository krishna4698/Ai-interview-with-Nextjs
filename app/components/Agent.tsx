import React from 'react'

function Agent({userName}:AgentProps) {
    const isspeaking=true;
  return (
    <>
     <div className=' call-view'>
      <div className='card-interviewer'>

        <div className='avatar'>
       {isspeaking && <span className='animate-speak'/>}
        </div>
        <h3>AI Interviewer</h3>
      </div>

      <div className='card-border'>
       <div className='card-content'>
          <h3>Your name</h3>
       </div>
      </div>
    </div> 
    </>
   
  )
}

export default Agent
