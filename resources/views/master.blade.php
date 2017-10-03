<html ng-app="myApp">
	<head>
		<title>SPA ANGULAR</title>
		<link rel="stylesheet" type="text/css" href="{{asset('css/cerulean.css')}}">
		<link rel="stylesheet" type="text/css" href="{{asset('bower_components/bootstrap/dist/css/bootstrap.min.css')}}">
		<link rel="stylesheet" type="text/css" href="{{asset('bower_components/dropzone/dist/basic.css')}}">
		<link rel="stylesheet" type="text/css" href="{{asset('bower_components/dropzone/dist/dropzone.css')}}">
		<link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}">
		<script type="text/javascript">var baseUrl="{{ url('/')}}/";</script>
		<meta name="csrf-token" content="{{ csrf_token() }}" />
	</head>
	<body>
		<div class="container" ng-controller="globalController">
			<div ng-view></div>
		</div>
		<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
		<script type="text/javascript" src="{{asset('bower_components/angular-cookies/angular-cookies.min.js')}}"></script>
		<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
		<script type="text/javascript" src="{{asset('js/apps.js')}}"></script>
		<script type="text/javascript" src="{{asset('js/models.js')}}"></script>
		<script type="text/javascript" src="{{asset('js/controllers.js')}}"></script>
		<script type="text/javascript" src="{{asset('bower_components/dropzone/dist/dropzone.js')}}"></script>
			<script type="text/javascript"  src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script type="text/javascript"  src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	</body>
</html>