<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Models\Review;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class ReviewController extends Controller
{
    public $countReviewGrid = 2;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(?int $idSite = null, $site = null)
    {
        if (!empty($idSite)) {
            $site = Site::whereId($idSite)->first();
        }

        return view('review.create', [
            "sites" => Site::all(),
            "idSite" => $idSite,
            "reviews" => Review::where('site_id', $idSite)->where('verify', 1)->orderBy('created_at', 'DESC')->limit(3)->get(),
            "site" => $site,
        ]);
    }
    
    public function paginateGrid(Request $request)
    {
        //$reviews = Review::where('verify', 1)->orderBy('created_at', 'DESC')->get()
    }

    public function showReviews(int $site)
    {
        if (!empty($site) && !empty(Site::whereId($site)->exists())) {
            $site = Site::whereId($site)->first();
        }

        $countStart = 0;
        $starSum = 0;
        $starMedium = 0;

        $star = [
            '1' => 0,
            '2' => 0,
            '3' => 0,
            '4' => 0,
            '5' => 0,
        ];

        foreach ($site->reviews as $review) {
            if (!empty($review->rating)) {
                $star[$review->rating] = $star[$review->rating] + 1;
                $countStart = $countStart + 1;
                $starSum = $starSum + $review->rating;
            }
        }

        $starMedium = round($starSum/$countStart, 2);

        return view('review.show', [
            'site' => $site,
            'star' => $star,
            'countStart' => $countStart,
            'starMedium' => $starMedium,
        ]);
    }

    public function createNewReviewMessageSuccess()
    {
        return view('review.message_save', [

        ]);
    }

    public function createNewReview(Request $request)
    {
        $error = false;
        $message = 'false';

        if (!empty($request->input('selectIDSite'))) {
            $site = Site::whereId($request->input('selectIDSite'))->first();
            if (!empty($site)) {
                //
            }else {
                $error = true;
                $message = "ОШИБКА ВАЛИДАЦИИ, не найден сайт";
            }
        }else {
            if (!empty($request->input('createNameSite')) && !empty($request->input('createUrlSite'))) {
                if (empty(Site::where('name', $request->input('createNameSite'))->first()) && empty(Site::where('url', $request->input('createUrlSite'))->first())) {
                    $site = new Site();
                    $site->name = $request->input('createNameSite');
                    $site->url = $request->input('createUrlSite');
                    $site->save();
                }else {
                    $error = true;
                    $message = "ОШИБКА ВАЛИДАЦИИ, нельзя создать новый сайт, т.к. он уже сужествует!";
                }
            }else {
                $error = true;
                $message = "ОШИБКА ВАЛИДАЦИИ, нельзя создать новый сайт";
            }
        }

        if ($error == true) {
            return response()->json([
                'success' => 'false',
                'message' => $message
            ]);
        }

        $review = new Review();
        $review->name = $request->input('userName');
        $review->email = $request->input('userEmail');
        $review->rating = !empty($request->input('ratingInput')) ?  $request->input('ratingInput') : null;
        $review->rewiew = $request->input('userReview');
        $review->site_id = $site->id;
        $review->source = $request->input('sourceReview');
        $review->save();

        return response()->json([
            'success' => 'true',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReviewRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReviewRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReviewRequest  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReviewRequest $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        //
    }
}
