<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/clients', [\App\Http\Controllers\AdminController::class, 'all'])
    ->middleware(['auth', 'admin'])
    ->name('admin.clients.all');
