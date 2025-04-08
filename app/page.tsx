import Link from 'next/link'
import React from 'react'
  


const RegisterPage = () => {
  return (
    <main className='flex flex-col items-center  '>
      <h1
      className='my-10 transition-all duration-300 hover:tracking-widest text-4xl font-bold text-gray-200 hover:-translate-60 -translate-0'
      >Patient APP
      </h1>
      <Link
      href='/register'
      className='  rounded-2xl bg-blue-400 font-semibold tracking-wide text-white p-4 hover:bg-blue-600  duration-150 active:bg-blue-800 active:scale-95'
      >Click here to Register as a new patient
      </Link>
    </main>
  )
}

export default RegisterPage
