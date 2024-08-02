import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from '@inertiajs/react';
const transformTimesheets = (timesheets) => {
    const transformedData = timesheets.map(timesheet => ({
        project_id: timesheet.project_id,
        task_id: timesheet.task_id,
        field1: timesheet.field1 || 0,
        field2: timesheet.field2 || 0,
        field3: timesheet.field3 || 0,
        field4: timesheet.field4 || 0,
        field5: timesheet.field5 || 0,
        field6: timesheet.field6 || 0,
        field7: timesheet.field7 || 0,
        date: timesheet.date
    }));
    return transformedData;
};
const DailyStatus = ({ initialProjects }) => {
    const [weekOffset, setWeekOffset] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [weekData, setWeekData] = useState({});
    const [projects, setProjects] = useState([]);
    const [taskMapping, setTaskMapping] = useState({});
    const [displayedIndices, setDisplayedIndices] = useState([0]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [dailyTotals, setDailyTotals] = useState({
        field1: 0, field2: 0, field3: 0, field4: 0, field5: 0, field6: 0, field7: 0
    });



    useEffect(() => {
        axios.get('/getProjectTasks')
            .then(response => {
                const initialProjects = response.data.initialProjects.map(project => ({
                    project_id: project.project_id,
                    project_name: project.project_name,
                    task_id: null, // Initialize task_id as null
                    tasks: [] // Initialize tasks as empty
                }));
                setProjects(initialProjects);
                setTaskMapping(response.data.taskMapping);
            })
            .catch(error => console.error('Error fetching project tasks:', error));
    }, []);

    useEffect(() => {
        if (selectedProject) {
            const projectTasks = taskMapping[selectedProject.id]?.tasks || [];
            setTasks(projectTasks);
        } else {
            setTasks([]);
        }
    }, [selectedProject, taskMapping]);
    const handleProjectChange = (index, projectId) => {
        const selectedProject = projects.find(project => project.id === projectId);
        setSelectedProject(selectedProject);

        // Also update the project in weekData if necessary
        const newWeekData = ensureWeekDataStructure(weekOffset, index);
        newWeekData[weekOffset][index].project_id = projectId;
        setWeekData(newWeekData);
    };

    const handleTaskChange = (index, taskId) => {
        const newWeekData = ensureWeekDataStructure(weekOffset, index);
        newWeekData[weekOffset][index].task_id = taskId;
        setWeekData(newWeekData);
        setSelectedTask(taskId);
    };

    const ensureWeekDataStructure = (offset, index) => {
        const newWeekData = { ...weekData };
        if (!newWeekData[offset]) {
            newWeekData[offset] = projects.map(project => ({
                ...project,
                field1: 0, field2: 0, field3: 0, field4: 0, field5: 0, field6: 0, field7: 0
            }));
        }
        if (!newWeekData[offset][index]) {
            newWeekData[offset][index] = {
                field1: 0, field2: 0, field3: 0, field4: 0, field5: 0, field6: 0, field7: 0
            };
        }
        return newWeekData;
    };


    useEffect(() => {
        if (!weekData[weekOffset]) {
            const initialWeekData = projects.map(project => ({
                ...project,
                field1: 0, field2: 0, field3: 0, field4: 0, field5: 0, field6: 0, field7: 0
            }));
            setWeekData(prevWeekData => ({
                ...prevWeekData,
                [weekOffset]: initialWeekData
            }));
        } else {
            calculateDailyTotals(weekData[weekOffset]);
        }
    }, [weekOffset, projects]);
    useEffect(() => {
        axios.get('/timesheets', { params: { weekOffset } })
            .then(response => {
                const { timesheets, projects } = response.data;

                // Set projects and transform timesheets if needed
                setProjects(projects);
                setWeekData(prevWeekData => ({
                    ...prevWeekData,
                    [weekOffset]: transformTimesheets(timesheets)
                }));
            })
            .catch(error => console.error('Error fetching timesheets:', error));
    }, [weekOffset]);


    const getCurrentDate = (dayOffset) => {
        const options = { month: 'short', day: 'numeric' };
        const today = new Date();
        today.setDate(today.getDate() + dayOffset + weekOffset * 7);
        return today.toLocaleDateString(undefined, options);
    };
    const getCurrentDateWithformat = (dayOffset) => {
        const today = new Date();
        today.setDate(today.getDate() + dayOffset + weekOffset * 7);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const nextWeek = () => {
        setWeekOffset(weekOffset + 1);
    };

    const prevWeek = () => {
        setWeekOffset(weekOffset - 1);
    };

    const addRow = () => {
        if (displayedIndices.length < projects.length) {
            setDisplayedIndices([...displayedIndices, displayedIndices.length]);
        }
    };



    const handleTimeChange = (index, day, value) => {
        const newWeekData = ensureWeekDataStructure(weekOffset, index);
        newWeekData[weekOffset][index][day] = parseFloat(value) || 0;
        setWeekData(newWeekData);
        calculateDailyTotals(newWeekData[weekOffset]);

        // Save data to backend
        axios.post('/timesheets-store', {
            project_id: projects[index].project_id,
            task_id: projects[index].task_id,
            date: getCurrentDateWithformat(0), // Adjust according to the day you want to save
            ...newWeekData[weekOffset][index]
        })
            .then(response => console.log('Timesheet saved successfully:', response.data))
            .catch(error => console.error('Error saving timesheet:', error));
    };

    const calculateDailyTotals = (currentWeekData) => {
        const totals = {
            field1: 0, field2: 0, field3: 0, field4: 0, field5: 0, field6: 0, field7: 0
        };

        currentWeekData.forEach(project => {
            for (let day in totals) {
                const time = parseFloat(project[day]) || 0;
                totals[day] += time;
            }
        });

        setDailyTotals(totals);
    };
    useEffect(() => {
        if (selectedProject) {
            setTasks(selectedProject.tasks || []);
        }
    }, [selectedProject]);

    const renderTimeDisplay = (total) => {
        return total;
    };

    const renderOvertimeDisplay = (total) => {
        return total ? total - 8 : 0;
    };
    // const ensureWeekDataStructure = (offset, index) => {
    //     const newWeekData = { ...weekData };
    //     if (!newWeekData[offset]) {
    //         newWeekData[offset] = projects.map(project => ({
    //             ...project,
    //             field1: 0, field2: 0, field3: 0, field4: 0, field5: 0, field6: 0, field7: 0
    //         }));
    //     }
    //     if (!newWeekData[offset][index]) {
    //         newWeekData[offset][index] = {
    //             field1: 0, field2: 0, field3: 0, field4: 0, field5: 0, field6: 0, field7: 0
    //         };
    //     }
    //     return newWeekData;
    // };

    // const handleTimeChange = (index, day, value) => {
    //     const newWeekData = ensureWeekDataStructure(weekOffset, index);
    //     newWeekData[weekOffset][index][day] = parseFloat(value) || 0;
    //     setWeekData(newWeekData);
    //     calculateDailyTotals(newWeekData[weekOffset]);
    // };
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
                <div className="">
                    <div className="space-x-2" style={{ display: 'flex', justifyContent: 'end', margin: '1rem' }}>
                        <button onClick={prevWeek} className='underline'>Previous Week</button>
                        <button onClick={nextWeek} className='underline'>Next Week</button>
                        {/* <input type="text" /> */}
                    </div> <button onClick={addRow}>Add Row</button>
                    <table className='w-full'>
                        <thead >
                            <tr>
                                {/* <th>Client</th> */}
                                <th className='border'>Project</th>
                                <th className='border'>Activity Task</th>
                                <th className='border'>({getCurrentDate(0)}) <br /> Mon </th>
                                <th className='border'>({getCurrentDate(1)}) <br /> Tue </th>
                                <th className='border'>({getCurrentDate(2)}) <br /> Wed </th>
                                <th className='border'>({getCurrentDate(3)}) <br /> Thu </th>
                                <th className='border'>({getCurrentDate(4)}) <br /> Fri </th>
                                <th className='border'>({getCurrentDate(5)}) <br /> Sat </th>
                                <th className='border'>({getCurrentDate(6)}) <br /> Sun </th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedIndices.map((index) => (
                                <tr key={index}>
                                    {/* <td>
                                            
                                            <select className="form-control" value={projects[index]?.client} onChange={(e) => {
                                                const newProjects = [...projects];
                                                newProjects[index].client = e.target.value;
                                                setProjects(newProjects);
                                            }}>
                                                <option value="">Select client</option>
                                                {projects.map((project, idx) => (
                                                    <option key={idx} value={project.client}>{project.client}</option>
                                                ))}
                                            </select>
                                        </td> */}
                                    <td>
                                        <select
                                            className="form-control"
                                            value={weekData[weekOffset]?.[index]?.project_id || ''}
                                            onChange={(e) => handleProjectChange(index, parseInt(e.target.value))}
                                        >
                                            <option value="">Select Project</option>
                                            {projects.map((project) => (
                                                <option key={project.id} value={project.id}>
                                                    {project.title}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            className="form-control"
                                            name='task_id'
                                            value={weekData[weekOffset]?.[index]?.task_id || ''}
                                            onChange={(e) => handleTaskChange(index, parseInt(e.target.value))}
                                        >
                                            <option value="">Select Task</option>
                                            {tasks.map((task) => (
                                                <option key={task.id} value={task.id}>
                                                    {task.task_name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><input type="text" className="form-control w-[5rem]" value={weekData[weekOffset]?.[index]?.field1 || ''} onChange={(e) => handleTimeChange(index, 'field1', e.target.value)} /></td>
                                    <td><input type="text" className="form-control w-[5rem]" value={weekData[weekOffset]?.[index]?.field2 || ''} onChange={(e) => handleTimeChange(index, 'field2', e.target.value)} /></td>
                                    <td><input type="text" className="form-control w-[5rem]" value={weekData[weekOffset]?.[index]?.field3 || ''} onChange={(e) => handleTimeChange(index, 'field3', e.target.value)} /></td>
                                    <td><input type="text" className="form-control w-[5rem]" value={weekData[weekOffset]?.[index]?.field4 || ''} onChange={(e) => handleTimeChange(index, 'field4', e.target.value)} /></td>
                                    <td><input type="text" className="form-control w-[5rem]" value={weekData[weekOffset]?.[index]?.field5 || ''} onChange={(e) => handleTimeChange(index, 'field5', e.target.value)} /></td>
                                    <td><input type="text" className="form-control w-[5rem]" value={weekData[weekOffset]?.[index]?.field6 || ''} onChange={(e) => handleTimeChange(index, 'field6', e.target.value)} /></td>
                                    <td><input type="text" className="form-control w-[5rem]" value={weekData[weekOffset]?.[index]?.field7 || ''} onChange={(e) => handleTimeChange(index, 'field7', e.target.value)} /></td>
                                </tr>
                            ))}
                            <tr>
                                <td className='border'></td>
                                <td className='border'>Days Total</td>
                                <td className='border-t-2 border-gray-300 '>  <input type="text" value={weekData[weekOffset] ? renderTimeDisplay(dailyTotals.field1) : '0'} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '> <input type="text" value={dailyTotals.field2} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300'><input type="text" value={dailyTotals.field3} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '> <input type="text" value={dailyTotals.field4} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '> <input type="text" value={dailyTotals.field5} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '><input type="text" value={dailyTotals.field6} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '><input type="text" value={dailyTotals.field7} className='w-[5rem]' /></td>
                                {/* <td className='border-t-2 border-gray-300 text-right'>Total Time: {totalTime} hours</td> */}
                            </tr>
                            <tr>
                                <td className='border'></td>
                                <td className='border'>Over Time</td>
                                <td className='border-t-2 border-gray-300 '>  <input type="text" value={renderOvertimeDisplay(dailyTotals.field1)} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '> <input type="text" value={renderOvertimeDisplay(dailyTotals.field2)} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300'><input type="text" value={renderOvertimeDisplay(dailyTotals.field3)} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '> <input type="text" value={renderOvertimeDisplay(dailyTotals.field4)} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '> <input type="text" value={renderOvertimeDisplay(dailyTotals.field5)} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '><input type="text" value={renderOvertimeDisplay(dailyTotals.field6)} className='w-[5rem]' /></td>
                                <td className='border-t-2 border-gray-300 '><input type="text" value={renderOvertimeDisplay(dailyTotals.field7)} className='w-[5rem]' /></td>
                                {/* <td className='border-t-2 border-gray-300 text-right'>Total Time: {totalTime} hours</td> */}
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'end' }}>

                        {/* <h3>Total Time Worked: {totalTime} hours</h3>
                        {totalTime > 8 && <p>+1 hour added for working more than 8 hours</p>} */}
                        <div style={{ display: 'flex' }}>
                            <button className="btn btn-success">Submit For Approval</button>
                            <button className="btn btn-success" style={{ marginLeft: '1rem' }}>Save</button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default DailyStatus;