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
const Projects = ({ user, projects }) => {
    return (
        <div className='px-[8rem] '>
            <Header user={user} />
            <Nav />
            <div className='table-section'>
                <div className='flex justify-end '>
                    <div className='flex'>
                        <div className='grid place-items-center bg-blue-800 text-white mt-2 rounded-lg p-2'>
                            <Link href='projects-create'><FaPlus className='text-[1rem] ' /></Link>
                        </div>
                        {/* <a>
                            Add Employee
                        </a> */}
                    </div>
                </div>
                <table class="table border w-full p-4">
                    <thead className='border'>
                        <tr>
                            <th className='text-left border'>Project Name</th>
                            {/* <th className='text-left border'> Project Code</th> */}
                            {/* <th className='text-left border'> Project Assign</th> */}
                            <th className='text-left border'>Start Date</th>
                            <th className='text-left border'>End Date</th>
                            <th className='text-left border'>Action</th>
                            {/* <th className='text-left border'>Unlock Timesheet</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects.map(emp => (
                                <tr key={emp.id}>
                                    <td className='border'>{emp.title}</td>
                                    {/* <td className='border'>{emp.employee_id}</td> */}
                                    <td className='border'>{emp.start_date}</td>
                                    <td className='border'>{emp.end_date}</td>


                                    <td className='border'>
                                        <div className='flex'>
                                            <Link className='text-green-800 text-[1.5rem]' href={`employees-edit/${emp.id}`}><FaEdit /></Link>

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

export default Projects;