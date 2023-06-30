<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\Review;
use App\Models\Site;

class HomeController extends Controller
{
    public function index(): View
    {
        return view('welcome', [
            "reviews" => Review::orderBy('created_at', 'DESC')->limit(5)->get(),
        ]);
    }
}
