@extends('layouts.app')

@section('content')
	<main>
		<div class="reviews_summary">
			<div class="wrapper">
				<div class="container">
					<div class="row">
						<div class="col-lg-8">
							<!--figure>
								<img src="img/logo-company.png" alt="">
							</!figure-->
							<small>Сайт {{ $site->url }}</small>
							<h1>{{ $site->name }}</h1>
							<span class="rating">
							<i class="icon_star @if ($starMedium < 1) empty @endif"></i>
							<i class="icon_star @if ($starMedium < 2) empty @endif"></i>
							<i class="icon_star @if ($starMedium < 3) empty @endif"></i>
							<i class="icon_star @if ($starMedium < 4) empty @endif"></i>
							<i class="icon_star @if ($starMedium < 5) empty @endif"></i>
							<em>{{ $starMedium }}/5.00 -  {{ count($site->reviews) }} отзыва</em></span>
						</div>
						<div class="col-lg-4 review_detail">
							<div class="row">
								<div class="col-lg-9 col-9">
									<div class="progress">
										<div class="progress-bar" role="progressbar" style="width: {{ $star['5']*100/$countStart }}%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
								<div class="col-lg-3 col-3 text-right"><strong>оценка "5"</strong></div>
							</div>
							<!-- /row -->
							<div class="row">
								<div class="col-lg-9 col-9">
									<div class="progress">
										<div class="progress-bar" role="progressbar" style="width: {{ $star['4']*100/$countStart }}%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
								<div class="col-lg-3 col-3 text-right"><strong>оценка "4"</strong></div>
							</div>
							<!-- /row -->
							<div class="row">
								<div class="col-lg-9 col-9">
									<div class="progress">
										<div class="progress-bar" role="progressbar" style="width: {{ $star['3']*100/$countStart }}%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
								<div class="col-lg-3 col-3 text-right"><strong>оценка "3"</strong></div>
							</div>
							<!-- /row -->
							<div class="row">
								<div class="col-lg-9 col-9">
									<div class="progress">
										<div class="progress-bar" role="progressbar" style="width: {{ $star['2']*100/$countStart }}%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
								<div class="col-lg-3 col-3 text-right"><strong>оценка "2"</strong></div>
							</div>
							<!-- /row -->
							<div class="row">
								<div class="col-lg-9 col-9">
									<div class="progress last">
										<div class="progress-bar" role="progressbar" style="width: {{ $star['1']*100/$countStart }}" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
								<div class="col-lg-3 col-3 text-right"><strong>оценка "1"</strong></div>
							</div>
							<!-- /row -->
						</div>
					</div>
				</div>
				<!-- /container -->
			</div>
		</div>
		<!-- /reviews_summary -->
		
		<div class="container margin_60_35">
			<div class="row">
				<div class="col-lg-8">

					@foreach ($site->reviews as $review)
					<div class="review_card">
						<div class="row">
							<div class="col-md-2 user_info">
								<figure><img src="{{ asset('img/avatar1.jpg') }}" alt=""></figure>
								<h5>{{ $review->name }}</h5>
							</div>
							<div class="col-md-10 review_content">
								<div class="clearfix add_bottom_15">
									<span class="rating">
										<i class="icon_star @if ($review->rating < 1) empty @endif"></i>
										<i class="icon_star @if ($review->rating < 2) empty @endif"></i>
										<i class="icon_star @if ($review->rating < 3) empty @endif"></i>
										<i class="icon_star @if ($review->rating < 4) empty @endif"></i>
										<i class="icon_star @if ($review->rating < 5) empty @endif"></i>
										<em>{{ $review->rating }}/5.00</em>
									</span>
									<em>{{ $review->created_at }}</em>
								</div>
								<p>{{ $review->rewiew }}</p>
								<ul>
									<li><a href="#0"><i class="icon_like_alt"></i><span></span></a></li>
									<li><a href="#0"><i class="icon_dislike_alt"></i><span></span></a></li>
									<li><a href="{{ $review->source }}">Источник</a></li>
								</ul>
							</div>
						</div>
						<!-- /row -->
						<!--div class="row reply">
							<div class="col-md-2 user_info">
								<figure><img src="img/avatar.jpg" alt=""></figure>
							</div>
							<div class="col-md-10">
								<div class="review_content">
									<strong>Reply from Good Electronics</strong>
									<em>Published 3 minutes ago</em>
									<p><br>Hi Monika,<br><br>Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod scaevola sea. Et nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has ut. Rebum laudem cum ea, ius essent fuisset ut. Viderer petentium cu his. Tollit molestie suscipiantur his et.<br><br>Thanks</p>
								</div>
							</div>
						</div-->
						<!-- /reply -->
					</div>
					@endforeach



					<!-- /review_card -->
					<!--div class="pagination__wrapper add_bottom_15">
						<ul class="pagination">
							<li><a href="#0" class="prev" title="previous page">&#10094;</a></li>
							<li><a href="#0" class="active">1</a></li>
							<li><a href="#0">2</a></li>
							<li><a href="#0">3</a></li>
							<li><a href="#0">4</a></li>
							<li><a href="#0" class="next" title="next page">&#10095;</a></li>
						</ul>
					</div-->
					<!-- /pagination -->
				</div>
				<!-- /col -->
				<div class="col-lg-4">
					<div class="box_general company_info">
						<h3>{{ $site->name }}</h3>
						<p><strong>Website</strong><br><a href="{{ $site->url }}">{{ $site->url }}</a></p>
						<a href="{{ route('create-review', ['id' => $site->id]) }}" class="btn_top my-3">Добавить отзыв</a>
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

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	function validForm() {
		let prov = true;
        $('#selectIDSite').removeClass('is-invalid');
        $('#createNameSite').removeClass('is-invalid');
        $('#createUrlSite').removeClass('is-invalid');
        $('#rating-input').removeClass('is-invalid');
        $('#sourceReview').removeClass('is-invalid');
        $('#userEmail').removeClass('is-invalid');
        $('#userName').removeClass('is-invalid');
        $('#userReview').removeClass('is-invalid');

		if (!$('#userName').val()) {
			$('#userName').addClass('is-invalid');
			toastr.error('Необходимо заполнить Имя');
			return false;
		}

		if (!$('#userEmail').val()) {
			$('#userEmail').addClass('is-invalid');
			toastr.error('Необходимо заполнить Email');
			return false;
		}

		if (!$('#userReview').val()) {
			$('#userReview').addClass('is-invalid');
			toastr.error('Необходимо заполнить Отзыв');
			return false;
		}

		if (!$('#selectIDSite').val()) {
			if (!$('#createNameSite').val()) {
				$('#createNameSite').addClass('is-invalid');
				toastr.error('Необходимо Выбрать сайт из списка или добавить новый!');
				prov = false;
				return false;
			}

			if (!$('#createUrlSite').val()) {
				$('#createUrlSite').addClass('is-invalid');
				toastr.error('Необходимо Выбрать сайт из списка или добавить новый!');
				prov = false;
				return false;
			}

			$('#selectIDSite').addClass('is-invalid');
		}

		if (prov == false) {
			return false;
		}

		return true;
	}

	function createReview() {
		if (validForm() == false) {
			return;
		}
		// создадим пустой объект
		var data = {};
		// переберём все элементы input, textarea и select формы с id="myForm "
		$('#create-review').find ('input, textarea, select').each(function() {
		// добавим новое свойство к объекту $data
		// имя свойства – значение атрибута name элемента
		// значение свойства – значение свойство value элемента
			data[this.name] = $(this).val();
		});

		data['ratingInput'] = $('input[name="rating-input"]:checked').val();

		$.ajax({
            url: '/review/create-new-review',
            method: 'post',
            data: data,
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

	$(document).on('click', '#createButtonReview', function () {
        createReview()
    }); // Запрос на добавление новой картины
</script>
@endsection

@section('description', '')
@section('keywords', '')
@section('title', '')