<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('article.index', [

        ]);
    }

    public function home()
    {
        return view('article.home', [
            "articles" => Article::orderBy('created_at', 'DESC')->paginate(12),
        ]);
    }

    public function show(int $articleId)
    {
        $article = Article::whereId($articleId)->first();

        return view('article.show', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('article.create', [

        ]);
    }

    public function saveImage(Request $request)
    {
        //dd($request->all());


        $image = $request->file('file');
        $fileName = $image->getClientOriginalName();
        
        $f = new \Illuminate\Http\File($image);

        //$img = Image::make($image);
        //$img->stream(); // <-- Key point


        //dd();
        Storage::disk('public')->put('article/img/' . $fileName, $f);
    }

    public function createNewArticle(Request $request)
    {
        $error = false;
        $message = 'false';

        $review = new Article();
        $review->name = $request->input('userName');
        $review->email = $request->input('userEmail');
        $review->title = $request->input('title');
        $review->article = $request->input('content');
        $review->save();

        return response()->json([
            'success' => 'true',
        ]);
    }
}
