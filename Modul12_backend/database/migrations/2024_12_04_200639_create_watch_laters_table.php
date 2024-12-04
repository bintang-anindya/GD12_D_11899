<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWatchLatersTable extends Migration
{
    public function up()
    {
        Schema::create('watch_laters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_content');
            $table->timestamp('date_added')->useCurrent();
            
            // Foreign keys
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_content')->references('id')->on('contents')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('watch_laters');
    }
}
