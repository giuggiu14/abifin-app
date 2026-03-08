<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Paperwork;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaperworkController extends Controller
{
    use AuthorizesRequests;

    public function paperworks(Client $client)
    {
        $this->authorize('viewAny', [Paperwork::class, $client]);

        $client->load('paperworks');

        return Inertia::render('paperwork/main', [
            'listPaperworks' => $client->paperworks,
            'client' => $client,
            'can' => [
                'doActions' => Auth::user()->isAdmin(),
                'create' => Auth::user()->can('create', Paperwork::class),
            ],
        ]);
    }

    public function store(Request $request, Client $client)
    {
        $this->authorize('create', Paperwork::class);

        $validated = $request->validate([
            'title' => 'required',
            'description' => '',
        ]);
        $paperwork = new Paperwork($validated);
        $paperwork->client()->associate($client);
        $paperwork->save();
    }

    public function update(Request $request, Client $client, Paperwork $paperwork)
    {
        $this->authorize('update', $paperwork);

        $validated = $request->validate([
            'title' => 'required',
            'description' => '',
        ]);
        $paperwork->update($validated);
    }

    public function delete(Client $client, Paperwork $paperwork)
    {
        $this->authorize('delete', $paperwork);
        $paperwork->delete();
    }
}
