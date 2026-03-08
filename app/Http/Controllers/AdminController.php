<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Client;
use App\Models\Paperwork;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    use AuthorizesRequests;

    public function clients()
    {
        return Inertia::render('admin/clients', [
            'listClients' => Client::all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Client::class);

        DB::transaction(function () use ($request) {
            $validated = $request->validate([
                'company_name' => 'required',
                'email' => 'required',
                'address' => 'required',
                'phone' => 'required',
                'vat_number' => 'required',
            ]);

            $user = User::create([
                'name' => $request->company_name,
                'email' => $request->email,
                'role' => UserRole::CLIENT,
                'password' => '',
            ]);
            $cliente = new Client($validated);
            $cliente->user()->associate($user);
            $cliente->save();
        });
    }

    public function update(Request $request, Client $client)
    {
        $this->authorize('update', $client);

        DB::transaction(function () use ($request, $client) {
            $validated = $request->validate([
                'company_name' => 'required',
                'email' => 'required',
                'address' => 'required',
                'phone' => 'required',
                'vat_number' => 'required',
            ]);

            try {
                $client->updateOrFail($validated);
            } catch (\Exception $e) {
                dd($e->getMessage());
            }
        });
    }

    public function delete(Client $client)
    {
        $this->authorize('delete', $client);
        $client->delete();
    }

    public function dashboard()
    {
        $user = Auth::user();
        if ($user->isAdmin())
        {
            return Inertia::render('admin/dashboard', [
                'clients' => Client::orderBy('created_at', 'desc')->get(),
                'paperworks' => Paperwork::orderBy('created_at', 'desc')->get(),
            ]);
        }
        else
        {
            return Inertia::render('dashboard', [
                'paperworks' => Paperwork::with('client')->orderBy('created_at', 'desc')->get(),
            ]);
        }
    }
}
