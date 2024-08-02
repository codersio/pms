import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";

import { RiDeleteBinLine } from "react-icons/ri";
const leaveType = ({ leaveTypes, user }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentLeaveType, setCurrentLeaveType] = useState(null);
    const { data, setData, post, errors, reset } = useForm({
        type_name: '',
        days: '',
    });


    const HandleDelete = (e, id) => {

        e.preventDefault();
        if (confirm('Are you sure you want to delete this employee?')) {
            axios.get(`/leave-delete/${id}`)
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
    const openCreateModal = () => {
        reset();
        setIsCreateModalOpen(true);
    };

    const openEditModal = (leaveType) => {
        setData({
            type_name: leaveType.type_name,
            days: leaveType.days,
        });
        setCurrentLeaveType(leaveType);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setCurrentLeaveType(null);
        reset();
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isCreateModalOpen) {
            post('/leave-store', data).then(() => closeModal());
        } else if (isEditModalOpen && currentLeaveType) {
            post(`/leave-update/${currentLeaveType.id}`, data).then(() => closeModal());
        }
    };
    return (
        <div className='px-[8rem] ' >
            <Header user={user} />
            <Nav />
            <div className='flex justify-between items-center'>
                <h1 className='text-[2rem] font-bold'>Leave Types</h1>
                <button onClick={openCreateModal} className='bg-blue-600 p-2 rounded-md text-white '>
                    <FaPlus />
                </button>
            </div>




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


                <div className=' px-[8rem]'>
                    <table className='table w-full'>
                        <thead>
                            <tr className='p-3'>
                                <th className='text-left border p-3'>Leave Type</th>
                                <th className='text-right border p-3'>Days</th>
                                <th className='text-right border p-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveTypes.map((leaveType, index) => (
                                <tr key={index}>
                                    <td className='border p-3'>{leaveType.type_name}</td>
                                    <td className='text-right border p-3'>{leaveType.days}</td>
                                    <td className='text-right border p-3'>
                                        <button onClick={() => openEditModal(leaveType)}><FaEdit /></button>
                                        <button onClick={(e) => HandleDelete(e, leaveType.id)}><RiDeleteBinLine /></button>



                                    </td>
                                </tr>

                            ))}
                        </tbody>
                        {(isCreateModalOpen || isEditModalOpen) && (
                            <div className='fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-20'>
                                <div className='p-10 w-full max-w-[500px] bg-white rounded-md shadow-md'>
                                    <h2 className='text-2xl font-bold'>
                                        {isCreateModalOpen ? 'Add Leave Type' : 'Edit Leave Type'}
                                    </h2>

                                    <div className='flex justify-end'>
                                        <button onClick={closeModal} className='bg-gray-300 p-2 rounded-md text-white w-[20%]'>Cancel</button>
                                    </div>
                                    <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label htmlFor="type_name">Leave Type Name</label>
                                            <input id="type_name" className='w-full rounded-lg' name="type_name" type="text" value={data.type_name} onChange={handleChange} required />
                                            {errors.type_name && <div>{errors.type_name}</div>}
                                        </div>
                                        <div>
                                            <label htmlFor="days">Days</label>
                                            <input className='w-full rounded-lg' id="days" name='days' type="number" value={data.days} onChange={handleChange} required />
                                            {errors.days && <div>{errors.days}</div>}
                                        </div>
                                        <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[35%]'>
                                            {isCreateModalOpen ? 'Create' : 'Update'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </table>
                </div>
            </div>
        </div >
    )

}

export default leaveType;