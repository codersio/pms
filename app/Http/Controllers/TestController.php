<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TestController extends Controller
{
    public function index(Request $request)
    {
        dd($request->all());
        return Inertia::render('Test');
    }
}
