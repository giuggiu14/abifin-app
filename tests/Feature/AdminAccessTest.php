<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Define a test route that uses the EnsureUserIsAdmin middleware
        Route::get('/_test/admin', function () {
            return 'success';
        })->middleware(EnsureUserIsAdmin::class);
    }

    public function test_block_non_admin_users()
    {
        $user = User::factory()->create(['role' => UserRole::CLIENT]);
        $this->assertFalse($user->isAdmin());

        $this->actingAs($user)
            ->get('/_test/admin')
            ->assertStatus(403);
    }

    public function test_allow_admin_users()
    {
        $user = User::factory()->create(['role' => UserRole::ADMIN]);
        $this->assertTrue($user->isAdmin());

        $this->actingAs($user)
            ->get('/_test/admin')
            ->assertStatus(200)
            ->assertSee('success');
    }
}
