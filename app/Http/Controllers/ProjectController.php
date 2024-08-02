<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Employee;
use App\Models\TaskAssign;
use App\Models\TaskCategory;
use Illuminate\Http\Request;
use App\Models\ProjectAssign;
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
        // $project->employee_id = $request->employee_id;
        $project->save();

        // foreach ($request->employee_id as $employee_id) {
        //     $assign = new ProjectAssign();
        //     $assign->project_id = $project->id;
        //     $assign->employee_id = $employee_id;
        //     $assign->save();
        // }
        return redirect()->route('projects')->with('project', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, $id)
    {
        $user = Auth::user()->name;
        $project = Project::find($id);
        $task = Task::where('project_id', $project->id)->get();
        // dd($task);
        return Inertia::render('projects/view', compact('project', 'user', 'task'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project, $id)
    {
        $project = Project::with('assignments.employee')->findOrFail($id);
        // dd($project);
        $employees = User::all(); // Assuming employees are users
        return Inertia::render('projects/edit', [
            'project' => $project,
            'employees' => $employees,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'estimate_time' => 'required|string|max:255',
            'estimate_budget' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            // 'employee_id' => 'required|array',
            'employee_id.*' => 'exists:users,id',
        ]);

        $project = Project::findOrFail($id);
        $project->title = $request->title;
        $project->estimate_time = $request->estimate_time;
        $project->estimate_budget = $request->estimate_budget;
        $project->start_date = $request->start_date;
        $project->end_date = $request->end_date;
        $project->save();

        // Update assignments
        ProjectAssign::where('project_id', $id)->delete();

        foreach ($request->employee_ids as $employee_id) {
            ProjectAssign::create([
                'project_id' => $project->id,
                'employee_id' => $employee_id,
            ]);
        }

        // return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
        return back();
    }


    /**
     * Remove the specified resource from storage.
     */


    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return redirect()->route('projects')->with('success', 'Project and related assignments deleted successfully.');
    }
    public function Task()
    {

        $task = Project::with('tasks')->get();
        // dd($task);
        return Inertia::render('projects/task', compact('task'));
    }
    public function taskCreate($id)
    {
        $projects = Project::find($id);
        $task = TaskCategory::all();
        $employees = $employee = User::join('employees', 'employees.user_id', '=', 'users.id')
            ->select('employees.phone', 'employees.address', 'employees.joinning_date', 'users.name', 'users.email', 'users.id')->get();
        return Inertia::render('projects/task-create', compact('employees', 'projects', 'task'));
    }

    public function taskStore(Request $request)
    {

        // dd($request->all());
        $project = new Task();
        $project->task_name = $request->task_name;
        $project->estimate_hours = $request->estimate_hours;
        $project->status = $request->status;
        $project->project_id = $request->project_id;
        $project->sdate = $request->sdate;
        $project->edate = $request->edate;
        // $project->employee_id = $request->employee_id;
        $project->save();

        foreach ($request->employee_id as $employee_id) {
            $assign = new TaskAssign();
            $assign->task_id = $project->id;
            $assign->employee_id = $employee_id;
            $assign->save();
        }
        return redirect()->route('projects')->with('project', 'Project created successfully');
    }


    public function Taskedit(Project $project, $id)
    {
        $project = Task::with('assignments.employee')->findOrFail($id);
        // dd($project);
        $projects = Project::all();
        $employees = User::all(); // Assuming employees are users
        return Inertia::render('projects/task-edit', [
            'project' => $project,
            'employees' => $employees,
            'projects' => $projects,
        ]);
    }

    public function Taskupdate(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'estimate_time' => 'required|string|max:255',
            'estimate_budget' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            // 'employee_id' => 'required|array',
            'employee_id.*' => 'exists:users,id',
        ]);

        $project = Project::findOrFail($id);
        $project->title = $request->title;
        $project->estimate_time = $request->estimate_time;
        $project->estimate_budget = $request->estimate_budget;
        $project->start_date = $request->start_date;
        $project->end_date = $request->end_date;
        $project->save();

        // Update assignments
        ProjectAssign::where('project_id', $id)->delete();

        foreach ($request->employee_ids as $employee_id) {
            ProjectAssign::create([
                'project_id' => $project->id,
                'employee_id' => $employee_id,
            ]);
        }

        // return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
        return back();
    }

    public function Tskcategory()
    {
        $taskcategory = TaskCategory::all();
        // dd($taskcategory);?S
        return Inertia::render('projects/taskCategory', compact('taskcategory'));
    }

    public function TaskcategoryStore(Request $request)
    {
        // dd($request->all());
        // dd($request->all());
        $taskcategory = new TaskCategory();
        $taskcategory->tname = $request->tname;
        $taskcategory->save();
        return back()->with('taskcategory', 'Task Category created successfully');
    }
    public function TaskcategoryEdit(TaskCategory $taskcategory, $id)
    {
    }
    public function TaskcategoryUpdate(Request $request, $id)
    {
    }
    public function TaskcategoryDestroy($id)
    {
        $taskcategory = TaskCategory::find($id);
        $taskcategory->delete();
        return back()->with('taskcategory', 'Task Category deleted successfully');
    }
}
