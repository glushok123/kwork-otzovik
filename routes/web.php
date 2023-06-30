<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PDFController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'App\Http\Controllers\HomeController@index')->name('home');

Route::group(['prefix'=>'review'], function(){
    Route::get('/create-review/{id?}', 'App\Http\Controllers\ReviewController@create')->name('create-review');
    Route::post('/create-new-review', 'App\Http\Controllers\ReviewController@createNewReview')->name('create-new-review');
    Route::get('/create-new-review-message-success', 'App\Http\Controllers\ReviewController@createNewReviewMessageSuccess')->name('create-new-review-message-success');
    Route::get('/show-reviews/{id}', 'App\Http\Controllers\ReviewController@showReviews')->name('show-reviews');
});


Route::group(["middleware" => ["web", "admin"]], function () {
    Route::group(['prefix'=>'orders'], function(){
        Route::get('show/baget', 'App\Http\Controllers\OrderController@showOrdersBaget')->name('orders.show');
        Route::get('create/', 'App\Http\Controllers\OrderController@showCreateForm')->name('orders.create');
        Route::get('create/post/', 'App\Http\Controllers\OrderController@createOrder')->name('orders.create.post');
        Route::get('edit/post/', 'App\Http\Controllers\OrderController@editOrder')->name('orders.edit.post');
        Route::get('edit/{id}', 'App\Http\Controllers\OrderController@showEditForm')->name('orders.edit');
        Route::post('get/json', 'App\Http\Controllers\OrderController@getOrdersJson')->name('orders.get.json');
        Route::get('print-pdf/{id}', [PDFController::class, 'generatePDFForPrint'])->name('orders.pdf.print');
        Route::get('download-pdf/{id}', [PDFController::class, 'generatePDFForDownload'])->name('orders.pdf.download');
    });

    Route::group(['prefix'=>'calendar'], function(){
        Route::get('show', 'App\Http\Controllers\CalendarController@show')->name('calendar.show');
        Route::get('get/json/{branch}', 'App\Http\Controllers\CalendarController@getOrdersJson')->name('calendar.get.json');
        Route::post('get/json/id/{id}', 'App\Http\Controllers\CalendarController@getOrderJson')->name('calendar.get.json.id');
    });
});