import Header from '@/Layouts/Header'
import Nav from '@/Layouts/Nav';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";
import { post } from '@inertiajs/inertia';
import { RiDeleteBinLine } from "react-icons/ri";
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
const Employee = ({ leave, user }) => {


    const [modal, setModal] = useState(false)

    const HandleDelete = (e, id) => {

        e.preventDefault();
        if (confirm('Are you sure you want to delete this employee leave?')) {
            axios.get(`/leave-store-delete/${id}`)
                .then(response => {
                    console.log(response);
                    alert('Leave deleted successfully');
                    // Redirect or update UI as needed
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    const calculateTotalDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    const handleApprove = async (id) => {
        try {
            await axios.post(`/leave-approve/${id}`);
            alert('Leave rejected successfully');

            window.location.reload();
        } catch (error) {
            console.error('There was an error approving the leave!', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`/leave-reject/${id}`);
            alert('Leave approved successfully');
            window.location.reload();
        } catch (error) {
            console.error('There was an error rejecting the leave!', error);
        }
    };
    return (

        <div className='px-[8rem] '>
            <Header user={user} />
            <Nav />
            {/* modal start */}
            <div className={`modal absolute top-0 left-0 w-full h-full transition-all duration-500 bg-black/50 flex justify-center items-center ${modal ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className='w-2/5  bg-white rounded-md p-4 px-6'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-semibold'>Modal header</h1>
                        <button onClick={() => setModal(false)}><FaXmark /></button>
                    </div>
                    <hr className='my-2' />
                    <form action="#" className='py-3 space-y-5'>
                        <div className="form-group flex flex-col gap-2">
                            <label htmlFor="" className='text-sm font-medium'>Start Date</label>
                            <input type="date" className='form-input rounded' />
                        </div>
                        <div className="form-group flex flex-col gap-2">
                            <label htmlFor="" className='text-sm font-medium'>End Date</label>
                            <input type="date" className='form-input rounded' />
                        </div>
                        <div className="form-group flex flex-col gap-2">
                            <label htmlFor="" className='text-sm font-medium'>Number</label>
                            <input type="number" className='form-input rounded' />
                        </div>
                        <div>
                            <button className='text-sm px-8 py-2 bg-blue-500 font-semibold rounded-md text-white'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* modal end */}
            <div className='table-section'>
                <div className='flex justify-end '>
                    <div className='flex'>
                        <div className='grid place-items-center bg-blue-800 text-white mt-2 rounded-lg p-2'>
                            <Link href='leave-create'><FaPlus className='text-[1rem] ' /></Link>
                        </div>
                        {/* <a>
                            Add Employee
                        </a> */}
                    </div>
                </div>
                <table class="table border w-full p-4">
                    <thead className='border'>
                        <tr>
                            <th className='text-left border p-3'>Employee Name</th>
                            <th className='text-left border p-3'> 	Leave Type</th>
                            <th className='text-left border p-3'> 	Applied On</th>
                            <th className='text-left border p-3'>	Start Date</th>
                            <th className='text-left border p-3'>		End Date</th>
                            <th className='text-left border p-3'>			Total Days</th>
                            <th className='text-left border p-3'>				Leave Reason</th>
                            {/* <th className='text-left border p-3'>				Leave Reason</th> */}
                            <th className='text-left border p-3'>				Status</th>
                            <th className='text-left border p-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leave.map(emp => (
                                <tr key={emp.id}>
                                    <td className='border p-3'>{emp.name}</td>
                                    <td className='border p-3'>{emp.type_name}</td>
                                    <td className='border p-3'>{formatDate(emp.created_at)}</td>
                                    <td className='border p-3'>{emp.sdate}</td>
                                    <td className='border p-3'>{emp.edate}</td>
                                    <td className='border p-3'>{calculateTotalDays(emp.sdate, emp.edate)}</td>
                                    <td className='border p-3'>{emp.reason}</td>
                                    {/* <td className='border p-3'>{emp.remark}</td> */}
                                    <td className='border p-3'>
                                        {emp.status === 1 ? <button
                                            className='bg-green-500 text-white p-2 m-1 rounded'
                                            onClick={() => handleApprove(emp.id)}
                                        >
                                            Approve
                                        </button> : emp.status === 0 ? <button
                                            className='bg-red-500 text-white p-2 m-1 rounded'
                                            onClick={() => handleReject(emp.id)}
                                        >
                                            Reject
                                        </button> : ''}
                                        <button onClick={(e) => setModal(true)} className='bg-blue-500 px-5 py-2 text-sm rounded-md font-medium text-white'>Modal</button>
                                    </td>


                                    <td className='border'>
                                        <div className='flex'>
                                            <Link className='text-green-800 text-[1.5rem]' href={`leave-store-edit/${emp.id}`}><FaEdit /></Link>

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

export default Employee;