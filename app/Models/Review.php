<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Site;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'rating',
        'rewiew',
        'verify',
        'site_id',
        'source',
        'created_at',
        'updated_at',
    ];

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
