<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TestController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TimesheetController;
use App\Http\Controllers\DailyStatusController;
use App\Http\Controllers\LeaveManagementController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/', [AdminController::class, 'index']);
    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees');
    Route::get('/employees-create', [EmployeeController::class, 'create'])->name('employees-create');
    Route::post('/employees-store', [EmployeeController::class, 'store']);
    Route::get('/employees-edit/{id}', [EmployeeController::class, 'edit']);
    Route::post('/employees-update/{id}', [EmployeeController::class, 'update']);
    Route::get('/employees-destroy/{id}', [EmployeeController::class, 'destroy']);
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
    Route::get('/projects-create', [ProjectController::class, 'create']);
    Route::post('/projects-store', [ProjectController::class, 'store']);
    Route::get('/projects-edit/{id}', [ProjectController::class, 'edit']);
    Route::post('/projects-update/{id}', [ProjectController::class, 'update']);
    Route::get('/projects-delete/{id}', [ProjectController::class, 'destroy']);
    Route::get('/projects-show/{id}', [ProjectController::class, 'show']);



    Route::get('/projects-task', [ProjectController::class, 'Task']);
    Route::get('/task-create/{id}', [ProjectController::class, 'taskCreate']);
    Route::post('/task-store', [ProjectController::class, 'taskStore']);
    Route::get('/task-edit/{id}', [ProjectController::class, 'Taskedit']);
    Route::get('/task-category/', [ProjectController::class, 'Tskcategory']);
    Route::post('/task-category-store/', [ProjectController::class, 'TaskcategoryStore']);
    Route::get('/task-category-delete/{id}', [ProjectController::class, 'TaskcategoryDestroy']);


    Route::get('/daily-status', [DailyStatusController::class, 'index'])->name('daily-status');
    Route::get('/getProjectTasks', [DailyStatusController::class, 'getProjectTasks'])->name('getProjectTasks');


    Route::get('/timesheets', [TimesheetController::class, 'index']);

    Route::get('/timesheets/{timesheet}', [TimesheetController::class, 'show']);
    Route::put('/timesheets/{timesheet}', [TimesheetController::class, 'update']);
    Route::delete('/timesheets/{timesheet}', [TimesheetController::class, 'destroy']);


    Route::get('/leave-type', [LeaveManagementController::class, 'leavType']);
    Route::post('/leave-store', [LeaveManagementController::class, 'leaveStore']);
    Route::post('/leave-update/{id}', [LeaveManagementController::class, 'leaveUpdate']);
    Route::get('/leave-delete/{id}', [LeaveManagementController::class, 'leaveDelete']);


    Route::get('/leave-index', [LeaveManagementController::class, 'leave']);
    Route::get('/leave-create', [LeaveManagementController::class, 'leavecreate']);
    Route::post('/leave-store-data', [LeaveManagementController::class, 'leavestoredata']);


    Route::get('/leave-store-edit/{id}', [LeaveManagementController::class, 'leaveEdit']);
    Route::post('/leave-store-update/{id}', [LeaveManagementController::class, 'leaveUpdatePost']);
    Route::get('/leave-store-delete/{id}', [LeaveManagementController::class, 'leaveDeletes']);
    Route::post('/leave-approve/{id}', [LeaveManagementController::class, 'leaveStatusApprove']);
    Route::post('/leave-reject/{id}', [LeaveManagementController::class, 'leaveStatusReject']);
});

require __DIR__ . '/auth.php';
Route::post('/timesheets-store', [TimesheetController::class, 'store']);
Route::get('/csrf-token', function () {
    return ['csrf_token' => csrf_token()];
});
Route::post('/test', [TestController::class, 'index'])->name('test');
