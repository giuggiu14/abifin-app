<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Paperwork;
use Illuminate\Database\Seeder;

class PaperworkSeeder extends Seeder
{
    /**
     * Create some paperwork for testing purposes.
     */
    public function run(): void
    {
        Paperwork::factory()->count(1000)->create([
            'client_id' => fn () => Client::inRandomOrder()->first()->id,
        ]);
    }
}
