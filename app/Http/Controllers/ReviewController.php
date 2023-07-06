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

    public function showReviews(int $site, Request $request)
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

        if (!empty($request->get('filter'))) {
            if ($request->get('filter') == 'positive') {
                $reviews = Review::where('verify', 1)->where('site_id', $site->id)->where('rating', 5)->orWhere('rating', 4)->orderBy('created_at', 'DESC')->paginate(12);
            }
            if ($request->get('filter') == 'negative') {
                $reviews = Review::where('verify', 1)->where('site_id', $site->id)->where('rating', 1)->orWhere('rating', 2)->orderBy('created_at', 'DESC')->paginate(12);
            }
            if ($request->get('filter') == 'all') {
                $reviews = Review::where('verify', 1)->where('site_id', $site->id)->orderBy('created_at', 'DESC')->paginate(12);
            }
        } else{
            $reviews = Review::where('verify', 1)->where('site_id', $site->id)->orderBy('created_at', 'DESC')->paginate(12);
        }

        $starMedium = round($starSum/$countStart, 2);

        return view('review.show', [
            'site' => $site,
            'star' => $star,
            'countStart' => $countStart,
            'starMedium' => $starMedium,
            'reviews' => $reviews,
            'request' => $request,
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


    public function store()
    {
        ini_set('max_execution_time', '900');

        foreach($this->array as $item) {
            $comment = $item[1] . ' ' . $item[2];
            $name = $item[0];

            $star = 1;

            if (!empty($item[3]) && $item[3] == 'width: 20%;') {
                $star = 1;
            }

            if (!empty($item[3]) && $item[3] == 'width: 40%;') {
                $star = 2;
            }

            if (!empty($item[3]) && $item[3] == 'width: 60%;') {
                $star = 3;
            }

            if (!empty($item[3]) && $item[3] == 'width: 80%;') {
                $star = 4;
            }

            if (!empty($item[3]) && $item[3] == 'width: 100%;') {
                $star = 5;
            }

            $review = new Review();
            $review->name = $name;
            $review->rating = $star;
            $review->rewiew = $comment;
            $review->site_id = 1;
            $review->source = 'https://otzyvmarketing.ru/direct-yandex/';

            $review->save();
        }
    }
}
