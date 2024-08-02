import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';

const Create = ({ empdataloyee, type, leave, user }) => {
    const { data, setData, post, errors } = useForm({
        employee_id: leave.employee_id,
        leave_type_id: leave.leave_type_id,
        sdate: leave.sdate,
        edate: leave.edate,
        reason: leave.reason,
        remark: leave.remark,
        hours: '',
        status: leave.status,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/leave-store-update/${leave.id}`, {
            onSuccess: () => {
                alert('Employee created successfully');
            },
        });
    };
    return (
        <div className='px-[8rem] '>
            <Header user={user} />
            <Nav />
            <div className='table-section p-3 border-2'>
                <div className='flex justify-end '>
                    <div className='flex'>
                        <div className='grid place-items-center bg-blue-800 text-white mt-2 rounded-lg p-2'>
                            <Link href='/leave-index'>  <IoIosArrowRoundBack className='text-[1rem] ' /></Link>
                        </div>
                        {/* <a>
                        Add Employee
                    </a> */}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='px-[8rem] grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="email">Leave Name</label>
                        <select name="employee_id" id="" className='w-full rounded-lg' type="text" value={data.employee_id} onChange={handleChange} required>
                            <option value="">Select employees</option>
                            {
                                empdataloyee.map(
                                    emp => (
                                        <option value={emp.id}>{emp.name}</option>
                                    )
                                )
                            }
                        </select>

                        {errors.name && <div>{errors.employee_id}</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Leave Type</label>
                        <select name="leave_type_id" id="" className='w-full rounded-lg' type="text" value={data.leave_type_id} onChange={handleChange} required>
                            <option value="">Select leave Type</option>
                            {
                                type.map(tp => (
                                    <option value={tp.id}>{tp.type_name}</option>
                                ))
                            }
                        </select>

                        {errors.name && <div>{errors.employee_id}</div>}

                    </div>
                    <div>
                        <label htmlFor="password">Start Date</label>
                        <input className='w-full rounded-lg' id="password" name='sdate' type="date" value={data.sdate} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="phone">End date</label>
                        <input className='w-full rounded-lg' id="phone" name='edate' type="date" value={data.edate} onChange={handleChange} required />
                        <input className='w-full rounded-lg' id="phone" name='status' hidden type="number" value={data.status} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="address">Leave Reason </label>
                        <textarea className='w-full rounded-lg' name='reason' type="text" value={data.reason} onChange={handleChange} required ></textarea>

                    </div>
                    <div>
                        <label htmlFor="address">Remarks</label>
                        <textarea className='w-full rounded-lg' name='remark' type="text" value={data.remark} onChange={handleChange} required ></textarea>

                    </div>
                    <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%]'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default Create;