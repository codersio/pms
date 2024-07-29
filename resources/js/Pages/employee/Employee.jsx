import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav';
import { Link } from '@inertiajs/react';
import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";

import { RiDeleteBinLine } from "react-icons/ri";
const Employee = ({ user, employee }) => {
    const HandleDelete = (e, id) => {

        e.preventDefault();
        if (confirm('Are you sure you want to delete this employee?')) {
            axios.get(`/employees-destroy/${id}`)
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
                            <Link href='employees-create'><FaPlus className='text-[1rem] ' /></Link>
                        </div>
                        {/* <a>
                            Add Employee
                        </a> */}
                    </div>
                </div>
                <table class="table border w-full p-4">
                    <thead className='border'>
                        <tr>
                            <th className='text-left border'>Name</th>
                            <th className='text-left border'> Email</th>
                            <th className='text-left border'> Phone</th>
                            <th className='text-left border'>Action</th>
                            <th className='text-left border'>Unlock Timesheet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map(emp => (
                                <tr key={emp.id}>
                                    <td className='border'>{emp.name}</td>
                                    <td className='border'>{emp.email}</td>
                                    {
                                        emp.employees.map(item => (
                                            <td className='border'>{item.phone}</td>
                                        ))
                                    }

                                    <td className='border'>
                                        <div className='flex'>
                                            <Link className='text-green-800 text-[1.5rem]' href={`employees-edit/${emp.id}`}><FaEdit /></Link>

                                            <button className='text-red-800 text-[1.5rem]' onClick={(e) => HandleDelete(e, emp.id)}><RiDeleteBinLine /></button>
                                        </div>

                                    </td>
                                    <td className='grid place-items-center'>
                                        <MdLockClock className='text-[2rem] text-red-700' />
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

export default Employee;