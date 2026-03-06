<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function clients()
    {
        return Inertia::render('admin/clients');
    }

    public function all()
    {
        return Client::all();
    }
}
