<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Employee;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use App\Models\LeaveManagement;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LeaveManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function leavType()
    {
        $user = Auth::user()->name;

        $leaveTypes = LeaveType::all();
        return Inertia::render('leave/leaveType', compact('leaveTypes', 'user'));
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
    public function leaveStore(Request $request)
    {
        $data = new LeaveType();
        $data->type_name = $request->type_name;
        $data->days = $request->days;
        $data->save();
        return redirect()->back()->with('success', 'Data saved successfully');
    }

    /**
     * Display the specified resource.
     */
    public function leaveUpdate(Request $request, $id)
    {
        $data =  LeaveType::find($id);
        $data->type_name = $request->type_name;
        $data->days = $request->days;
        $data->save();
        // dd($data);
        return redirect()->back()->with('success', 'Data Update successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function leaveDelete(Request $request, $id)


    {
        $data = LeaveType::find($id);
        $data->delete();
        return redirect()->back()->with('success', 'Data Delete successfully');
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function leave(Request $request, LeaveManagement $leaveManagement)
    {
        $leave = LeaveManagement::join('users', 'users.id', '=', 'leave_management.employee_id')
            ->join('leave_types', 'leave_types.id', '=', 'leave_management.leave_type_id')
            ->select(
                'users.name',
                'leave_management.sdate',
                'leave_management.reason',
                'leave_management.remark',
                'leave_management.edate',
                'leave_management.status',
                'leave_types.type_name',
                'leave_management.created_at',
                'leave_management.id'
            )->get();
        // dd($leave);
        $user = Auth::user()->name;
        return Inertia::render('leave/leaves', compact('leave', 'user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function leavecreate()
    {
        $user = Auth::user()->name;
        $empdataloyee = Employee::join('users', 'users.id', '=', 'employees.user_id')
            ->select('users.id', 'users.name')->where('type', 2)->get();
        $type = LeaveType::all();
        return Inertia::render('leave/create', compact('empdataloyee', 'type', 'user'));
    }
    public function leavestoredata(Request $request)
    {
        // dd($request->all());
        LeaveManagement::create($request->all());

        return redirect('leave-index');
    }
    public function leaveEdit($id)
    {
        $user = Auth::user()->name;
        $empdataloyee = Employee::join('users', 'users.id', '=', 'employees.user_id')
            ->select('users.id', 'users.name')->where('type', 2)->get();
        $type = LeaveType::all();
        $leave = LeaveManagement::find($id);
        return Inertia::render('leave/edit', compact('leave', 'empdataloyee', 'type', 'user'));
    }
    public function leaveUpdatePost(Request $request, $id)
    {
        // dd($request->all());
        $leave = LeaveManagement::find($id);
        $leave->update($request->all());
        return redirect('leave-index');
    }
    public function leaveDeletes($id)
    {
        // dd($id);
        $leave = LeaveManagement::find($id);
        $leave->delete();
        return redirect('leave-index');
    }

    public function leaveStatusApprove(Request $request, $id)
    {
        $leave = LeaveManagement::find($id);
        $leave->status = 0;
        $leave->save();
        Log::info('Leave status updated', ['id' => $id, 'status' => $leave->status]);
        return redirect('leave-index');
    }
    public function leaveStatusReject(Request $request, $id)
    {
        $leave = LeaveManagement::find($id);
        $leave->status = 1;
        $leave->save();
        // dd($leave);
        return redirect('leave-index');
    }
}
