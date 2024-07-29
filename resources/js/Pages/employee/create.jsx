import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';

const Create = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        joinning_date: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/employees-store', {
            onSuccess: () => {
                alert('Employee created successfully');
            },
        });
    };
    return (
        <div className='px-[8rem] '>
            <Header />
            <Nav />
            <div className='table-section p-3 border-2'>
                <div className='flex justify-end '>
                    <div className='flex'>
                        <div className='grid place-items-center bg-blue-800 text-white mt-2 rounded-lg p-2'>
                            <Link href='employees'>  <IoIosArrowRoundBack className='text-[1rem] ' /></Link>
                        </div>
                        {/* <a>
                        Add Employee
                    </a> */}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='px-[8rem] grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="email">Name</label>
                        <input id="name" className='w-full rounded-lg' name="name" type="text" value={data.name} onChange={handleChange} required />
                        {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className='w-full rounded-lg' id="email" name='email' type="email" value={data.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className='w-full rounded-lg' id="password" name='password' type="password" value={data.password} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input className='w-full rounded-lg' id="phone" name='phone' type="text" value={data.phone} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input className='w-full rounded-lg' id="address" name='address' type="text" value={data.address} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="joinning_date">Joining Date</label>
                        <input className='w-full rounded-lg' id="joinning_date" name='joinning_date' type="date" value={data.joinning_date} onChange={handleChange} required />
                    </div>
                    <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%]'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default Create;