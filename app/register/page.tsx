import React from 'react'
import RegisterForm from './RegisterForm'
import Link from 'next/link'
import {LucideLink} from 'lucide-react'
const RegisterPage = () => {
  return (
    <div>
      <Link
      href='/'
      className='rounded-2xl bg-blue-400 font-semibold tracking-wide text-white p-4 hover:bg-blue-600  duration-150 active:bg-blue-800 active:scale-95 mt-10'
      >HOME</Link>
      <div className='mt-20'>
      <RegisterForm/>
      </div>
    </div>
  )
}

export default RegisterPage
