@extends('layouts.app')

@section('content')

  	<script src="https://cdn.tiny.cloud/1/hw85xe145txckluurrl5gbcrs91v1upjpk2mf4er05bajlw6/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>

	<main class="margin_main_container">
		<div class="container margin_60_35">
			<div class="row">
				<div class="col-lg-12">
					<form id="create-review">
						<div class="box_general write_review">
							<h1>Создание Статьи</h1>

							<hr>

							<!-- /rating_submit -->
							<div class="form-group floating">
								<input type="text" class="form-control floating" id="userName" name='userName' required value="">
								<label for="usr">Ваше Имя</label>
							</div>

							<div class="form-group floating">
								<input type="email" class="form-control floating" id="userEmail" name='userEmail' required value="">
								<label for="usr">Email</label>
							</div>

							<!-- /rating_submit -->
							<div class="form-group floating">
								<input type="text" class="form-control floating" id="userName" name='title' required value="">
								<label for="usr">Заголовок (название статьи)</label>
							</div>


							<div class="form-group">
								<textarea class="form-control" style="height: 180px;" id='userReview' name='userReview' required placeholder="Напишите текст для статьи"></textarea>
							</div>



							<!-- добавление элемента div -->
							<div class="g-recaptcha" data-sitekey="6LcqSuMmAAAAAGaZbRZ3fhsQw9N6P--26w0ke-Jn"></div>
							<!-- элемент для вывода ошибок -->
							<div class="text-danger" id="recaptchaError"></div>
							<!-- js-скрипт гугл капчи -->
							<script src='https://www.google.com/recaptcha/api.js'></script>


							<button class="btn_1" id="createButtonReview" type='button'>Отправить отзыв</button>
						</div>
					</form>
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

	tinymce.init({
		selector: 'textarea',
		plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
		toolbar: 'link image | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | language | code',
		content_langs: [
			{ title: 'Russian', code: 'ru' }
		],
		language: 'ru',
		plugins: 'image code',
		image_title: true,
		automatic_uploads: true,
		images_upload_url: '/article/save-image',
		images_upload_base_path: '/public/article/img',
		file_picker_callback: (cb, value, meta) => {
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');

			input.addEventListener('change', (e) => {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.addEventListener('load', () => {
				/*
				Note: Now we need to register the blob in TinyMCEs image blob
				registry. In the next release this part hopefully won't be
				necessary, as we are looking to handle it internally.
				*/
				const id = 'blobid' + (new Date()).getTime();
				const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
				const base64 = reader.result.split(',')[1];
				const blobInfo = blobCache.create(id, file, base64);
				blobCache.add(blobInfo);

				/* call the callback and populate the Title field with the file name */
				cb(blobInfo.blobUri(), { title: file.name });
			});
			reader.readAsDataURL(file);
			});

			input.click();
		},
		content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
	});
</script>
<script>

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	function validForm() {
		let prov = true;

        $('#userEmail').removeClass('is-invalid');
        $('#userName').removeClass('is-invalid');

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

		if (prov == false) {
			return false;
		}

		var captcha = grecaptcha.getResponse();

		// 2. Если ответ пустой, то выводим сообщение о том, что пользователь не прошёл тест.
		// Такую форму не будем отправлять на сервер.
		if (!captcha.length) {
		// Выводим сообщение об ошибке
			$('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
		} else {
		// получаем элемент, содержащий капчу
			$('#recaptchaError').text('');
		}

		if (!captcha.length){
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

		data['content'] = tinyMCE.activeEditor.getContent();

		$.ajax({
            url: '/article/create-new-article',
            method: 'post',
            data: data,
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
            success: function (data) {
				console.log(data);
				if (data.success == 'true') {
					toastr.success('Статья добавлена');
					location.href = '/article/show-all';
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

<style>
	.tox-statusbar__branding{
		display: none !important;
	}
</style>
@endsection

@section('description', '')
@section('keywords', '')
@section('title', '')