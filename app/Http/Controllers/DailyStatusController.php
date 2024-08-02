<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use App\Models\DailyStatus;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DailyStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd(Auth::user()->id);
        $initialProjects = User::join('task_assigns', 'task_assigns.employee_id', '=', 'users.id')
            ->join('tasks', 'tasks.id', '=', 'task_assigns.task_id')
            ->join('projects', 'projects.id', '=', 'tasks.project_id')
            ->join('employees', 'users.id', '=', 'employees.user_id')
            ->select('projects.title', 'tasks.task_name', 'users.id')
            ->where('task_assigns.employee_id', Auth::user()->id)->get();
        // dd($data);
        $taskMapping = Project::with('tasks')->get();
        // dd($taskMapping);
        return Inertia::render('dailystatus/index', compact('initialProjects', 'taskMapping'));
    }

    public function getProjectTasks()
    {
        $initialProjects = User::join('task_assigns', 'task_assigns.employee_id', '=', 'users.id')
            ->join('tasks', 'tasks.id', '=', 'task_assigns.task_id')
            ->join('projects', 'projects.id', '=', 'tasks.project_id')
            ->join('employees', 'users.id', '=', 'employees.user_id')
            ->select(
                'projects.id as project_id',
                'projects.title as project_name',
                'tasks.id as task_id',
                'tasks.task_name as task_name',
                'users.id as user_id'
            )
            ->where('task_assigns.employee_id', Auth::user()->id)
            ->get();

        $taskMapping = [];
        foreach ($initialProjects as $projectTask) {
            if (!isset($taskMapping[$projectTask->project_id])) {
                $taskMapping[$projectTask->project_id] = [
                    'project_id' => $projectTask->project_id,
                    'project_name' => $projectTask->project_name,
                    'tasks' => []
                ];
            }
            $taskMapping[$projectTask->project_id]['tasks'][] = [
                'task_id' => $projectTask->task_id,
                'task_name' => $projectTask->task_name
            ];
        }

        return response()->json([
            'initialProjects' => $initialProjects,
            'taskMapping' => $taskMapping
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DailyStatus $dailyStatus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DailyStatus $dailyStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DailyStatus $dailyStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DailyStatus $dailyStatus)
    {
        //
    }
}
