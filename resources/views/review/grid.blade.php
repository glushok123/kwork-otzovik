

		<div class="container margin_60_35">
			
			<div class="isotope-wrapper">
			<div class="row">

				@foreach ($reviews2 as $review)
                    <div class="col-xl-4 col-lg-6 col-md-6 isotope-item latest">
                        <div class="review_listing">
                            <div class="clearfix add_bottom_15">
                                <figure><img src="{{ asset('img/avatar1.jpg') }}" alt=""></figure>
                                <span class="rating">
									<i class="icon_star @if ($review->rating < 1) empty @endif"></i>
									<i class="icon_star @if ($review->rating < 2) empty @endif"></i>
									<i class="icon_star @if ($review->rating < 3) empty @endif"></i>
									<i class="icon_star @if ($review->rating < 4) empty @endif"></i>
									<i class="icon_star @if ($review->rating < 5) empty @endif"></i>
                                    <em>{{ $review->rating }}/5</em>
                                <small>{{ $review->site->name}}</small>
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
                    <!-- /review_listing grid -->
                @endforeach

			</div>
			<!-- /row -->
			</div>
			<!-- /isotope-wrapper -->

			<p class="text-center">
                <a href="{{ $reviews2->nextPageUrl() }}" class="btn_1 rounded add_top_15">Следующая страница</a>
            </p>
			
		</div>
		<!-- /container -->