<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed admin user for the application.
     */
    public function run(): void
    {
        $user = User::where('email', 'admin@test.it')->first();
        if ($user) {
            return;
        }

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@test.it',
            'password' => bcrypt('admin'),
            'role' => UserRole::ADMIN,
        ]);
    }
}
