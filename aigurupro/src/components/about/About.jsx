import React from 'react'

function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-800 to-green-600 text-center text-white p-8">
      <div>
        <h1 className="text-4xl font-semibold mb-4">We are developers</h1>
        <p className="text-xl">
          Thank you for coming... <br />
          <span className="text-3xl font-bold text-cyan-400">We are here to create amazing things!</span>
        </p>
      </div>
    </div>
  )
}

export default About;
