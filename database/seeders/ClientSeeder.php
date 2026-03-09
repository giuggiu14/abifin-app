<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Create some clients for testing purposes.
     */
    public function run(): void
    {
        Client::factory()->has(User::factory())->count(50)->create(['user_id' => User::factory()->state(['role' => 'client'])]);
    }
}
