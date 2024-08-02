import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
const Task = ({ user, task }) => {

    const HandleDelete = (e, id) => {

        e.preventDefault();
        if (confirm('Are you sure you want to delete this employee?')) {
            axios.get(`/task-delete/${id}`)
                .then(response => {
                    console.log(response);
                    alert('Employee deleted successfully');
                    // Redirect or update UI as needed
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    return (
        <div className='px-[8rem] '>
            <Header user={user} />
            <Nav />
            <div className='table-section'>
                <div className='flex justify-end '>
                    <div className='flex'>
                        <div className='grid place-items-center bg-blue-800 text-white mt-2 rounded-lg p-2'>
                            <Link href='task-create'><FaPlus className='text-[1rem] ' /></Link>
                        </div>
                        {/* <a>
                            Add Employee
                        </a> */}
                    </div>
                </div>
                <table class="table border w-full p-4">
                    <thead className='border'>
                        <tr >
                            <th className='text-left border p-3'>Project Name</th>
                            <th className='text-left border'> Task Name</th>
                            {/* <th className='text-left border'> Project Assign</th> */}
                            <th className='text-left border p-3'>Start Date</th>
                            <th className='text-left border p-3'>End Date</th>
                            <th className='text-left border p-3'>Action</th>
                            {/* <th className='text-left border'>Unlock Timesheet</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            task.map(emp => (
                                <tr key={emp.id}>
                                    <td className='border p-3'>{emp.title}</td>
                                    {/* <td className='border'>{emp.employee_id}</td> */}
                                    <td className='border p-3'>{emp.start_date}</td>
                                    <td className='border p-3'>{emp.end_date}</td>


                                    <td className='border'>
                                        <div className='flex'>
                                            <Link className='text-green-800 text-[1.5rem]' href={`task-edit/${emp.id}`}><FaEdit /></Link>

                                            <button className='text-red-800 text-[1.5rem]' onClick={(e) => HandleDelete(e, emp.id)}><RiDeleteBinLine /></button>
                                        </div>

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Task;