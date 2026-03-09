<?php

namespace App\Models;

use App\Enums\PaperworkStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Paperwork extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'status' => PaperworkStatus::class,
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
