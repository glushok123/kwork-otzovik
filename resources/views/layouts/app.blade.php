
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="@yield('description')">
	<meta name="keywords" content="@yield('keywords')">
	<meta name="title" content="@yield('title')" />
	<meta name="robots" content="index,follow" />
	<meta name="revisit-after" content="2 days">
	<meta name="coverage" content="Worldwide">
	<meta name="distribution" content="Global">
	<link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
	<link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>@yield('title')</title>

	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	
	<link href="{{ asset('js/toastr/toastr.css') }}" rel="stylesheet">
	<script src="{{ asset('js/toastr/toastr.js') }}"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
	<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
	<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" />
	<script type="text/javascript" src="https://cdn.datatables.net/plug-ins/1.11.5/api/sum().js"></script>
	
	<script type="text/javascript" src="https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.html5.min.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.print.min.js"></script>
	<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.7/index.global.min.js'></script>

	@vite([
		'resources/css/app.css', 
		'resources/js/app.js',
		//'resources/js/modules/test.js',
	])

	<script>
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
	</script>

	@stack('scripts')
</head>

<body class='d-flex flex-column min-vh-100 bg-light' >
	<div class='container'>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
			  <a class="navbar-brand" href="{{ route('orders.show') }}">CRM</a>
			  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			  </button>
			  <div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				  <li class="nav-item">
					<a class="nav-link active" aria-current="page" href="{{ route('orders.show') }}">Заказы</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" href="{{ route('calendar.show') }}">Календарь</a>
				  </li>
				  <!--li class="nav-item">
					<a class="nav-link" href="#">Статистика</a>
				  </!li>
				  <li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					  Dropdown
					</a>
					<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
					  <li><a class="dropdown-item" href="#">Action</a></li>
					  <li><a class="dropdown-item" href="#">Another action</a></li>
					  <li><hr class="dropdown-divider"></li>
					  <li><a class="dropdown-item" href="#">Something else here</a></li>
					</ul>
				  </li>
				  <li class="nav-item">
					<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
				  </li -->
				</ul>
				<form class="d-flex">
					@if (backpack_auth() == true)
						<a href="{{ backpack_url('dashboard') }}" class="btn btn-outline-success m-2" >Админка</a>
						<a href="{{ backpack_url('logout') }}" class="btn btn-outline-success m-2" >Выход</a>
					@endif
				</form>
			  </div>
			</div>
		  </nav>
	</div>

	<br>

	<section class="messenger">
		<div class="container">
			<div class="row">
				@if(Session::has('message'))
					<p class="alert {{ Session::get('alert-class', 'alert-info') }}">{{ Session::get('message') }}</p>
				@endif
			</div>
		</div>
	</section>

	@yield('content')

	@yield('before_scripts')
	@yield('after_scripts')

	<style>

	</style>
</body>
</html>