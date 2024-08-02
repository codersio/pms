
import { useForm } from '@inertiajs/inertia-react';
import Nav from '@/Layouts/Nav';
import Header from '@/Layouts/Header';
import axios from 'axios';
import React, { useState } from 'react'
// import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';
const EditProject = ({ project, employees }) => {
    const { data, setData, post, errors } = useForm({
        title: project.title || '',
        estimate_time: project.estimate_time || '',
        estimate_budget: project.estimate_budget || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        employee_ids: project.assignments.map(assign => assign.employee_id) || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/projects-update/${project.id}`, {
            onSuccess: () => {
                alert('Project updated successfully');
            },
        });
    };

    const handleChange = (e) => {
        const { options } = e.target;
        const selectedEmployees = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedEmployees.push(options[i].value);
            }
        }
        setData('employee_ids', selectedEmployees);
    };

    return (
        <div className='px-[8rem] '>
            <Header />
            <Nav />
            <h1>Edit Project</h1>
            <form onSubmit={handleSubmit} className='px-[8rem] grid grid-cols-2 gap-4'>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input className='w-full rounded-lg'
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && <div>{errors.title}</div>}
                </div>
                <div>
                    <label htmlFor="estimate_time">Estimate Time:</label>
                    <input className='w-full rounded-lg'
                        type="text"
                        id="estimate_time"
                        value={data.estimate_time}
                        onChange={(e) => setData('estimate_time', e.target.value)}
                    />
                    {errors.estimate_time && <div>{errors.estimate_time}</div>}
                </div>
                <div>
                    <label htmlFor="estimate_budget">Estimate Budget:</label>
                    <input className='w-full rounded-lg'
                        type="number"
                        id="estimate_budget"
                        value={data.estimate_budget}
                        onChange={(e) => setData('estimate_budget', e.target.value)}
                    />
                    {errors.estimate_budget && <div>{errors.estimate_budget}</div>}
                </div>
                <div>
                    <label htmlFor="start_date">Start Date:</label>
                    <input className='w-full rounded-lg'
                        type="date"
                        id="start_date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                    />
                    {errors.start_date && <div>{errors.start_date}</div>}
                </div>
                <div>
                    <label htmlFor="end_date">End Date:</label>
                    <input className='w-full rounded-lg'
                        type="date"
                        id="end_date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                    />
                    {errors.end_date && <div>{errors.end_date}</div>}
                </div>
                {/* <div>
                    <label htmlFor="employees">Assign Employees:</label>
                    <select
                        multiple
                        name="employee_ids"
                        id="employees"
                        value={data.employee_ids}
                        onChange={handleChange}
                        className='w-full rounded-lg'
                    >
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                    {errors.employee_ids && <div>{errors.employee_ids}</div>}
                </div> */}
                <br />
                <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%]'>Save</button>
            </form>
        </div>

    );
};

export default EditProject;
