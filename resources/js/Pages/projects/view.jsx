import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";

import { RiDeleteBinLine } from "react-icons/ri";


const View = ({ user, project, task }) => {

    const [modal, setModal] = useState(true)
    const HandelModal = () => {
        setModal(!modal)
    }
    return (

        <div className='px-[8rem] relative'>
            <Header user={user} />
            <Nav />
            {/* <button className='text-white bg-red-500 px-4 py-2 rounded-md mr-2' onClick={HandelModal}>
                add
            </button> */}


            <div className='flex flex-col gap-6'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold'> </h1>


                    <span>Project name : {project.title}</span>
                    <br />
                    <br />
                    <span>Project Budget : {project.estimate_budget}</span>
                    <br />
                    <span>Project Budget : {project.start_date}</span>
                    <br />
                    <span>Project Budget : {project.end_date}</span>
                    <Link href={`/task-create/${project.id}`}>
                        <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>
                            <FaPlus />  Task
                        </button>
                    </Link>
                </div>
            </div>
            <table class="table border w-full p-4">
                <thead className='border'>
                    <tr >
                        {/* <th className='text-left border p-3'>Project Name</th> */}
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
                                <td className='border p-3' >{emp.task_name}</td>

                                {/* <td className='border'>{emp.employee_id}</td> */}
                                <td className='border p-3'>{emp.sdate}</td>
                                <td className='border p-3'>{emp.edate}</td>


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
    )
}

export default View