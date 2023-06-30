@extends('layouts.app')

@section('content')
	<main class="margin_main_container">
		<div class="container margin_60_35">
			<div class="row">
				<div class="col-lg-8">
					<form id="create-review">
						<div class="box_general write_review">
							<h1>Написать отзыв</h1>

							<hr>
								<div class="form-group">
									<label for="exampleFormControlSelect1">Выберите сайт для отзыва</label>
									<select class="form-control" id="selectIDSite" name="selectIDSite">
										<option value=''>Веберите сайт</option>

										@foreach ($sites as $site)
											<option value='{{ $site->id }}' 
											@if ($idSite == $site->id)
												selected
											@endif>{{ $site->name }} ({{ $site->url }})</option>
										@endforeach

									</select>
								</div>
							@if (empty($idSite))
								<span><b>Если сайта нет в списке, введите его название и ссылку:</b></span>

								<div class="form-group floating my-2">
									<input type="text" class="form-control floating" id="createNameSite" name="createNameSite" value="">
									<label for="usr">Название Сайта</label>
								</div>
								<div class="form-group floating">
									<input type="text" class="form-control floating" id="createUrlSite"  name="createUrlSite" value="">
									<label for="usr">Ссылка</label>
								</div>
								
							@endif
							<hr>


							<div class="rating_submit">
								<div class="form-group">
								<label class="d-block">Рейтинг</label>
								<span class="rating">
									<input type="radio" class="rating-input" id="5_star" name="rating-input" value="5"><label for="5_star" class="rating-star"></label>
									<input type="radio" class="rating-input" id="4_star" name="rating-input" value="4"><label for="4_star" class="rating-star"></label>
									<input type="radio" class="rating-input" id="3_star" name="rating-input" value="3"><label for="3_star" class="rating-star"></label>
									<input type="radio" class="rating-input" id="2_star" name="rating-input" value="2"><label for="2_star" class="rating-star"></label>
									<input type="radio" class="rating-input" id="1_star" name="rating-input" value="1"><label for="1_star" class="rating-star"></label>
								</span>
								</div>
							</div>
							<!-- /rating_submit -->
							<div class="form-group floating">
								<input type="text" class="form-control floating" id="userName" name='userName' required value="">
								<label for="usr">Имя</label>
							</div>
							<div class="form-group floating">
								<input type="email" class="form-control floating" id="userEmail" name='userEmail' required value="">
								<label for="usr">Email</label>
							</div>
							<div class="form-group">
								<label>Отзыв</label>
								<textarea class="form-control" style="height: 180px;" id='userReview' name='userReview' required placeholder="Напишите свой отзыв"></textarea>
							</div>

							<div class="form-group floating">
								<input type="email" class="form-control floating" id="sourceReview" name='sourceReview' value="">
								<label for="usr">Источник</label>
							</div>
							<button class="btn_1" id="createButtonReview" type='button'>Отправить отзыв</button>
						</div>
					</form>
				</div>

				@if (!empty($idSite) && !empty($reviews))
				<!-- /col -->
				<div class="col-lg-4">
					<div class="latest_review">
						<h4>Последнии отзывы</h4>

						@foreach ($reviews as $review)
							<div class="review_listing">
								<div class="clearfix add_bottom_10">
									<figure><img src="img/avatar3.jpg" alt=""></figure>
									<span class="rating">
										<i class="icon_star @if ($review->rating < 1) empty @endif"></i>
										<i class="icon_star @if ($review->rating < 2) empty @endif"></i>
										<i class="icon_star @if ($review->rating < 3) empty @endif"></i>
										<i class="icon_star @if ($review->rating < 4) empty @endif"></i>
										<i class="icon_star @if ($review->rating < 5) empty @endif"></i>
										<em>{{ $review->rating }}/5</em>
									</span>
								</div>
								<h3><strong>{{ $review->name }}</strong></h3>
								<h4>
									@if (!empty($site))
										"{{ $site->name }}"
									@endif
								</h4>
								<p>{{ $review->rewiew }}</p>
								<ul class="clearfix">
									<li><small>{{ $review->created_at }}</small></li>
									<li><a href="{{ route('show-reviews', ['id' => $review->site_id ]) }}" class="btn_1 small">Читать отзывы</a></li>
								</ul>
							</div>
						@endforeach

					</div>
				</div>
				@endif

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