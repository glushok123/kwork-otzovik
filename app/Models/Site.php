<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Review;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Site extends Model
{
    use CrudTrait;
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
        'created_at',
        'updated_at',
    ];

    public function reviews(): HasMany
    {
      return $this->hasMany(Review::class);
    }
}
