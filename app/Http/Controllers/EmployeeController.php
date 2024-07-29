<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    public function index()
    {
        $user = Auth::user()->name;
        $employee = User::with('employees')->where('type', 2)->get();
        // dd($employee);
        return Inertia::render('employee/Employee', compact('user', 'employee'));
    }

    public function create()
    {
        return Inertia::render('employee/create');
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->type = 2;
        $user->password = bcrypt($request->password);
        $user->save();

        $employee = new Employee();

        $employee->user_id = $user->id;
        // $employee->email = $user->email;
        // $employee->name = $user->name;
        $employee->phone = $request->phone;
        $employee->address = $request->address;

        $employee->joinning_date = $request->joinning_date;
        $employee->save();
        return redirect()->route('employees')->with('success', 'Employee created successfully.');
    }

    public function edit($id)
    {
        $employee = User::join('employees', 'employees.user_id', '=', 'users.id')
            ->select('employees.phone', 'employees.address', 'employees.joinning_date', 'users.name', 'users.email', 'users.id')->where('users.id', $id)->first();
        return Inertia::render('employee/edit', compact('employee'));
    }
    public function update(Request $request, $id)
    {
        // dd($id);
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        // dd($user);
        $user->save();

        $employee = Employee::where('user_id', $id)->first();
        $employee->phone = $request->phone;
        $employee->address = $request->address;
        $employee->joinning_date = $request->joinning_date;
        $employee->save();
        return redirect()->route('employees')->with('success', 'Employee updated successfully.');
    }

    public function destroy($id)
    {
        // dd($id);
        $user = User::find($id);
        if (!$user) {
            return redirect()->route('employees')->with('error', 'User not found.');
        }

        // Delete the associated employee(s)
        $employee = Employee::where('user_id', $id)->first();
        if ($employee) {
            $employee->delete();
        }

        // Delete the user
        $user->delete();
        return redirect()->route('employees')->with('success', 'Employee deleted successfully.');
    }
}
