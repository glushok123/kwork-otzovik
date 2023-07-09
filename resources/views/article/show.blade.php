@extends('layouts.app')

@section('content')
	<main>
	
		<div class="reviews_summary">
			<div class="wrapper">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<h1>{{ $article->title }}</h1>
						</div>
					</div>
				</div>
				<!-- /container -->
			</div>
		</div>
		<!-- /reviews_summary -->
		
		<div class="container margin_60_35">
			<div class="row">
				<div class="col-lg-12">


					<div class="review_card">
					    {!! $article->article !!}
					</div>

				</div>

			</div>
			<!-- /row -->
		</div>
		<!-- /container -->
		
	</main>
	<!--/main-->
	
@endsection

@section('after_scripts')

<script>

	
</script>
@endsection

@section('description', '')
@section('keywords', '')
@section('title', '')