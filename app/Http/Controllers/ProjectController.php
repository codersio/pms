<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user()->name;
        $projects = Project::all();
        // dd($projects);
        $employees = Employee::all();
        return Inertia::render('projects/projects', compact('projects', 'user', 'employees'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $employees = $employee = User::join('employees', 'employees.user_id', '=', 'users.id')
            ->select('employees.phone', 'employees.address', 'employees.joinning_date', 'users.name', 'users.email', 'users.id')->get();
        return Inertia::render('projects/create', compact('employees'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $project = new Project();
        $project->title = $request->title;
        $project->estimate_time = $request->estimate_time;
        $project->estimate_budget = $request->estimate_budget;
        $project->start_date = $request->start_date;
        $project->end_date = $request->end_date;
        $project->employee_id = $request->employee_id;
        $project->save();
        return redirect()->route('projects')->with('project', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
