@extends('layouts.app')

@section('content')

	<br><br>
	@include('review.grid')
	<main>
		
		<!--section class="hero_single version_1">
			<div class="wrapper">
				<div class="container">
					<h3>Каждый отзыв - это незабываемый опыт!</h3>
					<p>Проверяйте рейтинги, читайте отзывы</p>
					
				</div>
			</div>
		</section-->

		<br><br>
		<div class="bg_color_1">
		
		<div class="container margin_60">
			<div class="main_title_3">
				<h2>Последние отзывы</h2>
				<!--a href="reviews-page.html">View all</a-->
			</div>
			
			<div id="reccomended" class="owl-carousel owl-theme">
				@foreach ($reviews as $review)
					<div class="item">
						<div class="review_listing">
							<div class="clearfix">
								<figure><img src="{{ asset('img/avatar1.jpg') }}" alt=""></figure>
								<span class="rating">
									<i class="icon_star @if ($review->rating < 1) empty @endif"></i>
									<i class="icon_star @if ($review->rating < 2) empty @endif"></i>
									<i class="icon_star @if ($review->rating < 3) empty @endif"></i>
									<i class="icon_star @if ($review->rating < 4) empty @endif"></i>
									<i class="icon_star @if ($review->rating < 5) empty @endif"></i>
									<em>{{ $review->rating }}/5</em>
								</span>
							</div>
							<h3><strong>{{ $review->name }}</strong> прокоментировал <a href="{{ route('show-reviews', ['id' => $review->site_id ]) }}">{{ $review->site->name}}</a></h3>
							<hr>
							<p>{{ $review->rewiew }}</p>
							<ul class="clearfix">
								<!--li><small>{{ $review->created_at }}</small></li-->
								<li><a href="{{ route('show-reviews', ['id' => $review->site_id ]) }}" class="btn_1 small">Читать отзывы</a></li>
							</ul>
						</div>
					</div>
				@endforeach

			</div>
			<!-- /carousel -->
		</div>
		

		<!-- /container -->
		</div>
		<!-- /bg_color_1 -->

		<div class="container margin_60">
			<div class="main_title_3">
				<h2>Последние Статьи</h2>
			</div>
			
			<div id="carousel" class="owl-carousel owl-theme">
				@foreach ($articles as $article)
					<div class="item">
						<div class="review_listing">
							<div class="clearfix">
								<figure>
									<img src="{{ asset('img/avatar1.jpg') }}" alt="">
								</figure>
							</div>
							<h3><strong>{{ $article->name }}</strong></h3>

							<hr>
							<h3>{{ $article->title }}</h3>
							<hr>

							<ul class="clearfix">
								<li><small>{{ $article->created_at }}</small></li>
								<li><a href="{{ route('article-show', ['id' => $article->id ]) }}" class="btn_1 small">Читать</a></li>
							</ul>
						</div>
					</div>
				@endforeach

			</div>
			<!-- /carousel -->
		</div>
		
		<!--div class="call_section_3">
			<div class="wrapper">
				<div class="container clearfix">
					<div class="col-lg-5 col-md-7 float-right">
						<h3>Let's Help You</h3>
						<p>Vanno is a review platform open to everyone. Share your experiences to help others make better choices, and help companies up their game. Our mission is to bring people and companies together to create experiences for everyone.</p>
						<p><a class="btn_1 add_top_10 wow bounceIn" href="pricing.html" data-wow-delay="0.5s">Join Vanno Now!</a></p>
					</div>
				</div>
			</div>
		</div-->
		<!-- /call_section -->

	</main>
	<!-- /main -->

	


	</div>
	<!-- page -->
	
@endsection

@section('after_scripts')

<script>
	function searchRequest() {

		$.ajax({
            url: '/review/create-new-review',
            method: 'post',
            data: {
				seacrh : $('#input-search').val()
			},
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            success: function (data) {
				console.log(data);
				if (data.success == 'true') {
					location.href = '/review/create-new-review-message-success';
				}else{
					toastr.error(data.message);
				}
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    alert('Not connect. Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found (404).');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error (500).');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error. ' + jqXHR.responseText);
                }
            }
        });
	}

	$(document).on('click', '#button-search', function () {
        searchRequest()
    }); // Запрос на добавление новой картины
</script>
@endsection

@section('description', '')
@section('keywords', '')
@section('title', '')