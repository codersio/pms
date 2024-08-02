import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';

const TaskCreate = ({ employees, projects, task }) => {
    const { data, setData, post, errors } = useForm({
        task_name: '',
        estimate_hours: '',

        sdate: '',
        edate: '',
        employee_id: '',
        status: '',
        project_id: projects.id,
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
        post('/task-store', {
            onSuccess: () => {
                alert('Employee created successfully');
            },
        });
    };
    return (
        <div className='px-[8rem] '>
            <Header />
            <Nav />
            <div className='flex flex-col gap-6'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold'> </h1>


                    <span>Project name : {projects.title}</span>
                    <br />
                    <br />
                    <span>Project Budget : {projects.estimate_budget}</span>
                    <br />
                    <span>Project Budget : {projects.start_date}</span>
                    <br />
                    <span>Project Budget : {projects.end_date}</span>
                    <Link href={`/task-create/${projects.id}`}>
                        <button className='text-white bg-blue-500 px-4 py-2 rounded-md'>
                            <FaPlus />  Task
                        </button>
                    </Link>
                </div>
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
                <form onSubmit={handleSubmit} className='px-[8rem] grid grid-cols-2 gap-4'>
                    <div>
                        {/* <label htmlFor="email">Project Name</label> */}
                        <input type="text" name="project_id" id="" hidden className='w-full rounded-lg' value={data.project_id} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Task Name</label>
                        <select className='w-full rounded-lg' name="task_name" type="text" value={data.task_name} onChange={handleChange}>
                            <option value="">Select</option>
                            {
                                task.map(tasks => (
                                    <option key={tasks.id} value={tasks.tname}>{tasks.tname}</option>
                                    // <option value={tasks.id}>{tasks.task_name}</option>
                                ))
                            }
                        </select>
                        {/* <input id="name"  required /> */}
                        {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Estimate Hours</label>
                        <input className='w-full rounded-lg' id="email" name='estimate_hours' type="number" value={data.estimate_hours} onChange={handleChange} required />
                    </div>

                    <div>
                        <label htmlFor="email">Employee Assign</label>
                        <select multiple name="employee_id" id="" value={data.employee_id} onChange={Mulitple} className='w-full rounded-lg'>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div>
                        <label htmlFor="password">Estimate Budget</label>
                        <input className='w-full rounded-lg' id="password" name='estimate_budget' type="number" value={data.estimate_budget} onChange={handleChange} required />
                    </div> */}
                    <div>
                        <label htmlFor="phone">Start Date</label>
                        <input className='w-full rounded-lg' id="phone" name='sdate' type="date" value={data.sdate} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="address">End Date</label>
                        <input className='w-full rounded-lg' id="address" name='edate' type="date" value={data.edate} onChange={handleChange} required />
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

export default TaskCreate;