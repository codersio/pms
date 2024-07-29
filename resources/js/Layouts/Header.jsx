import CurrentWeek from '@/Components/currentdate'
import React from 'react'
import { usePage } from '@inertiajs/inertia-react';

const Header = ({ user }) => {


    return (
        <div className='w-[100%] bg-[#0a1b3f] '>
            {
                console.log(user)
            }
            <div className='header flex justify-between p-2'>
                <div className="logo">
                    <img src="https://www.ecspvt.com/assets/frontend/img/logo.png" alt="" className='w-[85%]' />
                </div>

                <div className="nav">
                    <div>
                        <h1 className='text-[1.3rem] text-white'>
                            <CurrentWeek />
                        </h1>
                        <h1 className='text-[1.3rem] text-white'>welcome To {user}</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Header