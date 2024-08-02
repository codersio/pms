
import { useForm } from '@inertiajs/inertia-react';
import Nav from '@/Layouts/Nav';
import Header from '@/Layouts/Header';
import axios from 'axios';
import React, { useState } from 'react'
// import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';
const EditProject = ({ project, employees, projects }) => {
    const { data, setData, post, errors } = useForm({
        task_name: project.task_name || '',
        estimate_hours: project.estimate_hours || '',
        estimate_budget: project.estimate_budget || '',
        sdate: project.sdate || '',
        edate: project.edate || '',
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
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit} className='px-[8rem] grid grid-cols-2 gap-4'>
                <div>
                    <label htmlFor="email">Project Name</label>
                    <select name="project_id" id="" className='w-full rounded-lg' value={data.project_id} onChange={handleChange}>
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>{project.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input className='w-full rounded-lg'
                        type="text"
                        id="title"
                        value={data.task_name}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && <div>{errors.title}</div>}
                </div>
                <div>
                    <label htmlFor="estimate_hours">Estimate Time:</label>
                    <input className='w-full rounded-lg'
                        type="text"
                        id="estimate_hours"
                        value={data.estimate_hours}
                        onChange={(e) => setData('estimate_hours', e.target.value)}
                    />
                    {errors.estimate_time && <div>{errors.estimate_time}</div>}
                </div>
                {/* <div>
                    <label htmlFor="estimate_budget">Estimate Budget:</label>
                    <input className='w-full rounded-lg'
                        type="number"
                        id="sdate"
                        value={data.sdate}
                        onChange={(e) => setData('sdate', e.target.value)}
                    />
                    {errors.edate && <div>{errors.edate}</div>}
                </div> */}
                <div>
                    <label htmlFor="start_date">Start Date:</label>
                    <input className='w-full rounded-lg'
                        type="date"
                        id="sdate"
                        value={data.sdate}
                        onChange={(e) => setData('sdate', e.target.value)}
                    />
                    {errors.sdate && <div>{errors.sdate}</div>}
                </div>
                <div>
                    <label htmlFor="end_date">End Date:</label>
                    <input className='w-full rounded-lg'
                        type="date"
                        id="edate"
                        value={data.edate}
                        onChange={(e) => setData('edate', e.target.value)}
                    />
                    {errors.edate && <div>{errors.edate}</div>}
                </div>
                <div>
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
                </div>
                <br />
                <button type="submit" className='bg-blue-600 p-2 rounded-md text-white w-[30%]'>Save</button>
            </form>
        </div>

    );
};

export default EditProject;
