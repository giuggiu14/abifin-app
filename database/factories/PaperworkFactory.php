<?php

namespace Database\Factories;

use App\Enums\PaperworkStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paperwork>
 */
class PaperworkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->text(255),
            'description' => $this->faker->text(255),
            'status' => $this->faker->randomElement(PaperworkStatus::cases()),
            'client_id' => null,
        ];
    }
}
