import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';
import { RiDeleteBinLine } from "react-icons/ri";
const TaskCategory = ({ taskcategory }) => {
    const { data, setData, post, errors } = useForm({
        tname: '',

    });
    const HandleDelete = (e, id) => {

        e.preventDefault();
        if (confirm('Are you sure you want to delete this employee?')) {
            axios.get(`/task-category-delete/${id}`)
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
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/task-category-store', {
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
                        <input id="name" className='w-full rounded-lg' name="tname" type="text" value={data.tname} onChange={handleChange} required />
                        {errors.name && <div>{errors.name}</div>}
                    </div>


                    <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%]'>Create</button>
                </form>
                <table class="table border w-full p-4">
                    <thead className='border'>
                        <tr >
                            <th className='text-left border p-3'>Category Name</th>

                            <th className='text-left border p-3'>Action</th>
                            {/* <th className='text-left border'>Unlock Timesheet</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskcategory.map(emp => (
                                <tr key={emp.id}>
                                    <td className='border p-3'>  <Link href={`/projects-show/${emp.id}`}>{emp.tname}</Link> </td>



                                    <td className='border'>
                                        <div className='flex'>
                                            <Link className='text-green-800 text-[1.5rem]' href={`projects-edit/${emp.id}`}><FaEdit /></Link>

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

export default TaskCategory;