<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchLater extends Model
{
    use HasFactory;

    protected $fillable = ['id_user', 'id_content', 'date_added'];

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    // Relasi ke content
    public function content()
    {
        return $this->belongsTo(Content::class, 'id_content');
    }
}
