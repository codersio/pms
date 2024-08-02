import { Link } from '@inertiajs/react'
import React from 'react'

const Nav = () => {
    return (
        <nav className='grid place-items-center bg-slate-600 p-5'>
            <ul className='flex space-x-5'>
                <li className='border p-1 px-5 text-white'>
                    <Link href='/employees'>Employees</Link>
                </li>
                <li className='border p-1 px-5 text-white'> <Link href='/projects'>Projects</Link></li>
                <li className='border p-1 px-5 text-white'>Weekly Status</li>
                <li className='border p-1 px-5 text-white'>Daily Status</li>
                <li className='border p-1 px-5 text-white'>Defaulters</li>
                <li className='border p-1 px-5 text-white'>Report</li>
                <li className='border p-1 px-5 text-white'>Change Password</li>
            </ul>
        </nav>
    )
}

export default Nav