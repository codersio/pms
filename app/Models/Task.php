<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;


    public function assignments()
    {
        return $this->hasMany(TaskAssign::class);
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function taskcategories()
    {
        return $this->belongsTo(TaskCategory::class, 'task_name');
    }
}
