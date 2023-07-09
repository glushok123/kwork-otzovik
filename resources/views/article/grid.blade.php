

		<div class="container margin_60_35">
			
			<div class="isotope-wrapper">
			<div class="row">

				@foreach ($articles as $article)
                    <div class="col-xl-4 col-lg-6 col-md-6 isotope-item latest">
                        <div class="review_listing">
                            <div class="clearfix add_bottom_15">
                                <figure><img src="{{ asset('img/avatar1.jpg') }}" alt=""></figure>
                                <small>{{ $article->title}}</small>
                            </div>
							<h3><strong>{{ $article->name }}</strong> </h3>
							<hr>
							<h3>{{ $article->title }}</h3>
							<hr>
							<ul class="clearfix">
								<li><small>{{ $article->created_at }}</small></li>
								<li><a href="{{ route('article-show', ['id' => $article->id ]) }}" class="btn_1 small">Читать</a></li>
							</ul>
                        </div>
                    </div>
                    <!-- /review_listing grid -->
                @endforeach

			</div>
			<!-- /row -->
			</div>
			<!-- /isotope-wrapper -->

			@if (!empty($articles->nextPageUrl()))
				<p class="text-center">
					<a href="{{ $articles->nextPageUrl() }}" class="btn_1 rounded add_top_15">Следующая страница</a>
				</p>
			@endif

			
		</div>
		<!-- /container -->