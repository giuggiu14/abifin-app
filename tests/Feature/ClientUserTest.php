<?php

namespace Tests\Feature;

use App\Models\Client;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientUserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Tests if a user is a client.
     */
    public function test_user_is_client(): void
    {
        $user = User::factory()->create();
        $client = Client::factory()->create(['user_id' => $user->id]);
        $this->assertInstanceOf(User::class, $client->user);
        $this->assertEquals($user->id, $client->user->id);
        $this->assertInstanceOf(Client::class, $user->client);
        $this->assertEquals($client->id, $user->client->id);
    }

    public function test_user_is_not_client(): void
    {
        $user = User::factory()->create();
        $this->assertNull($user->client);
    }
}
