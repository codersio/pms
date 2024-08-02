import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';

const Create = ({ employees }) => {
    const { data, setData, post, errors } = useForm({
        title: '',
        estimate_time: '',
        estimate_budget: '',
        start_date: '',
        end_date: '',
        employee_id: '',
        status: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const Mulitple = (e) => {
        const { options } = e.target;
        const selectedEmployees = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedEmployees.push(options[i].value);
            }
        }
        setData('employee_id', selectedEmployees);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/projects-store', {
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
                        <label htmlFor="email">Project Name</label>
                        <input id="name" className='w-full rounded-lg' name="title" type="text" value={data.title} onChange={handleChange} required />
                        {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Estimate Hours</label>
                        <input className='w-full rounded-lg' id="email" name='estimate_time' type="number" value={data.estimate_time} onChange={handleChange} required />
                    </div>

                    {/* <div>
                        <label htmlFor="email">Employee Assign</label>
                        <select multiple name="employee_id" id="" value={data.employee_id} onChange={Mulitple} className='w-full rounded-lg'>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div> */}
                    <div>
                        <label htmlFor="password">Estimate Budget</label>
                        <input className='w-full rounded-lg' id="password" name='estimate_budget' type="number" value={data.estimate_budget} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="phone">Start Date</label>
                        <input className='w-full rounded-lg' id="phone" name='start_date' type="date" value={data.start_date} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="address">End Date</label>
                        <input className='w-full rounded-lg' id="address" name='end_date' type="date" value={data.end_date} onChange={handleChange} required />
                    </div>

                    <div>
                        <label htmlFor="joinning_date">Status</label>
                        <input className='w-full rounded-lg' id="joinning_date" name='status' type="date" value={data.status} onChange={handleChange} required />
                    </div>
                    <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%]'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default Create;