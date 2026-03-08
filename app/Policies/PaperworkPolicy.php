<?php

namespace App\Policies;

use App\Models\Client;
use App\Models\Paperwork;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PaperworkPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, Client $client): bool
    {
        return $user->isAdmin() || $user->id === $client->user_id;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Paperwork $paperwork): bool
    {
        return $user->isAdmin() || $user->id === $paperwork->client->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Paperwork $paperwork): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Paperwork $paperwork): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Paperwork $paperwork): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Paperwork $paperwork): bool
    {
        return false;
    }
}
