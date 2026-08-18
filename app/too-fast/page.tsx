import React from 'react'

const tooFast = () => {
  return (
    <main className='root-container flex min-h-screen flex-col items-center justify-center'>
        <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>Whoa, Slow down there ,Speddy</h1>
    
        <p className='text-center mt-3 max-w-xl text-light-400'>
            You&apos;ve hit the rate limit. Please wait before making additional requests. We implement rate limiting to ensure fair service for all users and maintain system stability.
        </p>
    </main>
  )
}

export default tooFast