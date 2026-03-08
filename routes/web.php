<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PaperworkController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('dashboard', [AdminController::class, 'dashboard'])
    ->middleware(['auth', 'admin'])
    ->name('admin.dashboard');

Route::get('clients', [AdminController::class, 'clients'])
    ->middleware(['auth', 'admin'])
    ->name('admin.clients');

Route::post('clients', [AdminController::class, 'store'])
    ->middleware(['auth', 'admin'])
    ->name('admin.clients.store');

Route::put('clients/{client}', [AdminController::class, 'update'])
    ->middleware(['auth', 'admin'])
    ->name('admin.clients.update');

Route::delete('clients/{client}', [AdminController::class, 'delete'])
    ->middleware(['auth', 'admin'])
    ->name('admin.clients.delete');

Route::get('clients/{client}/paperworks', [PaperworkController::class, 'paperworks'])
    ->middleware(['auth'])
    ->name('paperworks');

Route::post('clients/{client}/paperworks', [PaperworkController::class, 'store'])
    ->middleware(['auth', 'admin'])
    ->name('paperworks.store');

Route::put('clients/{client}/paperworks/{paperwork}', [PaperworkController::class, 'update'])
    ->middleware(['auth', 'admin'])
    ->name('paperworks.update');

Route::delete('clients/{client}/paperworks/{paperwork}', [PaperworkController::class, 'delete'])
    ->middleware(['auth', 'admin'])
    ->name('paperworks.delete');

require __DIR__.'/settings.php';
