<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Project;
use App\Models\Timesheet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TimesheetController extends Controller
{
    public function index(Request $request)
    {
        $user_id = $request->user()->id;
        $weekOffset = $request->query('weekOffset', 0);

        $startOfWeek = now()->startOfWeek()->addWeeks($weekOffset);
        $endOfWeek = now()->endOfWeek()->addWeeks($weekOffset);

        \Log::info("Fetching timesheets for user: $user_id, from: $startOfWeek to: $endOfWeek");

        // Fetch timesheets
        $timesheets = Timesheet::where('user_id', $user_id)
            ->whereBetween('date', [$startOfWeek, $endOfWeek])
            ->with('project', 'tasks') // Ensure these relationships are defined in Timesheet model
            ->get();

        Log::info("Fetched timesheets: " . $timesheets->toJson());

        // Fetch projects and tasks for the select options
        $projects = Project::with('tasks')->get();

        return response()->json([
            'timesheets' => $timesheets,
            'projects' => $projects
        ]);
    }


    public function store(Request $request)
    {
        // dd($request->all());
        $data = [
            'user_id' => Auth::user()->id,
            // 'date' => 'required|date',
            'field1' => $request->field1,
            'field2' => $request->field2,
            'field3' => $request->field3,
            'field4' => $request->field4,
            'field5' => $request->field5,
            'field6' => $request->field6,
            'field7' => $request->field7,
        ];

        // Merge the project_id, task_id, and date with the validated data
        $data = array_merge($data, [
            'project_id' => $request->project_id,
            'task_id' => $request->task_id,
            'date' => $request->date,
        ]);

        $existingTimesheet = Timesheet::where('project_id', $request->project_id)
            ->where('task_id', $request->task_id)
            ->where('date', $request->date)
            ->first();

        if ($existingTimesheet) {
            // Update the existing timesheet entry
            $existingTimesheet->update($data);
            return response()->json($existingTimesheet, 200);
        } else {
            // Create a new timesheet entry
            $timesheet = Timesheet::create($data);
            return response()->json($timesheet, 201);
        }
        // return response()->json($timesheet, 201);
    }

    public function show(Timesheet $timesheet)
    {
        return response()->json($timesheet);
    }

    public function update(Request $request, Timesheet $timesheet)
    {
        $data = $request->validate([
            'field1' => 'nullable|numeric',
            'field2' => 'nullable|numeric',
            'field3' => 'nullable|numeric',
            'field4' => 'nullable|numeric',
            'field5' => 'nullable|numeric',
            'field6' => 'nullable|numeric',
            'field7' => 'nullable|numeric',
        ]);

        $timesheet->update($data);

        return response()->json($timesheet);
    }

    public function destroy(Timesheet $timesheet)
    {
        $timesheet->delete();

        return response()->json(null, 204);
    }
}
