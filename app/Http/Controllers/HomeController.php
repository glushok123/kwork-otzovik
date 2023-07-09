<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\Review;
use App\Models\Site;
use App\Models\Article;

class HomeController extends Controller
{
    public function index(): View
    {
        return view('welcome', [
            "reviews" => Review::where('verify', 1)->orderBy('created_at', 'DESC')->limit(7)->get(),
            "reviews2" => Review::where('verify', 1)->orderBy('created_at', 'DESC')->paginate(12),
            "articles" => Article::orderBy('created_at', 'DESC')->limit(7)->get()
        ]);
    }
}
