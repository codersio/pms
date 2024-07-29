<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
});

require __DIR__ . '/auth.php';
