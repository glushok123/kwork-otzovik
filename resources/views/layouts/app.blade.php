<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="VANNO - Premium directory consumer reviews and listings template by Ansonika">
	<meta name="csrf-token" content="{{ csrf_token() }}">
    <title>VANNO | Premium directory consumer reviews and listings template by Ansonika.</title>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
    <!-- Favicons-->
    <link rel="shortcut icon" href="{{ asset('img/favicon.ico') }}" type="image/x-icon">
    <link rel="apple-touch-icon" type="image/x-icon" href="{{ asset('img/apple-touch-icon-57x57-precomposed.png') }}">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="72x72" href="{{ asset('img/apple-touch-icon-72x72-precomposed.png') }}">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="114x114" href="{{ asset('img/apple-touch-icon-114x114-precomposed.png') }}">
    <link rel="apple-touch-icon" type="image/x-icon" sizes="144x144" href="{{ asset('img/apple-touch-icon-144x144-precomposed.png') }}">
	<script src="https://www.google.com/recaptcha/enterprise.js?render=6Ld4tOImAAAAAFpFKaJyLBdCm8GPtG01SfS8pz0C"></script>

    <!-- GOOGLE WEB FONT -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">

	@vite([
        'resources/topic/css/bootstrap.min.css',
        'resources/topic/css/style.css',
        'resources/topic/css/vendors.css',
        'resources/topic/css/custom.css',
	])

	<script>
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
	</script>

</head>
<body>
		
	<div id="page">
		
	<header class="header_in is_fixed menu_fixed">
		<div id="logo">
			<a href="{{ route('home') }}">
				<img src="{{ asset('img/logo.svg') }}" width="140" height="35" alt="" class="logo_normal">
				<img src="{{ asset('img/logo_sticky.svg') }}" width="140" height="35" alt="" class="logo_sticky">
			</a>
		</div>
		<ul id="top_menu">
			<li><a href="{{ route('create-review') }}" class="btn_top">Оставить отзыв</a></li>
			<li><a href="{{ backpack_url('dashboard') }}"  class="login" title="Sign In">Sign In</a></li>
		</ul>
		<!-- /top_menu -->
		<a href="#menu" class="btn_mobile">
			<div class="hamburger hamburger--spin" id="hamburger">
				<div class="hamburger-box">
					<div class="hamburger-inner"></div>
				</div>
			</div>
		</a>
		<!-- /btn_mobile -->
		<nav id="menu" class="main-menu">
			<ul>
				<li><span><a href="{{ route('home') }}">Главная</a></span></li>
				<li class="d-block d-sm-none"><span><a href="{{ route('create-review') }}" class="btn_top">Оставить отзыв</a></span></li>
			</ul>
		</nav>
	</header>
	<!-- /header -->


	@yield('content')


	@yield('before_scripts')
	@yield('after_scripts')



	@include('layouts.footer')

	<div id="toTop"></div><!-- Back to top button -->

    <script src="{{ asset('thema/js/common_scripts.js') }}"></script>
    <script src="{{ asset('thema/js/functions.js') }}"></script>
    <script src="{{ asset('thema/assets/validate.js') }}"></script>
	<link href="{{ asset('js/toastr/toastr.css') }}" rel="stylesheet">
	<script src="{{ asset('js/toastr/toastr.js') }}"></script>


	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js"></script>

	<script>
		function onClick(e) {
			e.preventDefault();
			grecaptcha.enterprise.ready(async () => {
			const token = await grecaptcha.enterprise.execute('6Ld4tOImAAAAAFpFKaJyLBdCm8GPtG01SfS8pz0C', {action: 'LOGIN'});
			// IMPORTANT: The 'token' that results from execute is an encrypted response sent by
			// reCAPTCHA Enterprise to the end user's browser.
			// This token must be validated by creating an assessment.
			// See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
			});
		}
	</script>
</body>
</html>