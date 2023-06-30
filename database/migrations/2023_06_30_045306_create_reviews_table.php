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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Имя пользователя');
            $table->string('email')->comment('Email пользователя');
            $table->string('rating')->nullable()->comment('Рейтинг');
            $table->text('rewiew')->nullable()->comment('Текст отзыва');
            $table->tinyInteger('verify')->default(0)->comment('Подтверждение');
            $table->unsignedBigInteger('site_id')->comment('Id сайта'); 
            $table->string('source')->nullable()->comment('Источник');
            $table->timestamps();

            $table->foreign('site_id')->references('id')->on('sites');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
