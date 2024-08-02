<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;


    public function assignments()
    {
        return $this->hasMany(ProjectAssign::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($project) {
            $project->assignments()->delete();
        });
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
