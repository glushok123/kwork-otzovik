<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Имя пользователя');
            $table->string('email')->comment('Email пользователя');
            $table->tinyInteger('verify')->default(0)->comment('Подтверждение');
            $table->string('title')->nullable()->comment('Заголовок');
            $table->text('article')->comment('Статья');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};