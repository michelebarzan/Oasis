<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Homepage";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Nunito|Raleway" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Quicksand:300" rel="stylesheet">
		<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<link rel="stylesheet" href="css/index.css" />
		<script src="struttura.js"></script>
		<script src="js/index.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<style>
		.logoHeader{display:none}
		.swal2-title
			{
				font-family:'Montserrat',sans-serif;
				font-size:18px;
			}
			.swal2-content
			{
				font-family:'Montserrat',sans-serif;
				font-size:13px;
			}
			.swal2-confirm,.swal2-cancel
			{
				font-family:'Montserrat',sans-serif;
				font-size:13px;
			}
			.swal2-container
			{
				z-index: 98;
			}
			body
			{
				display:flex;
				flex-direction:column;
				align-items:center;
				justify-content:flex-start;
			}
		</style>
	</head>
	<body onload="getPagineHomepage()">
		<?php include('struttura.php'); ?>
		<div id="immagineLogo" class="immagineLogo" ></div>
		<div class="homepageLinkContainer"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
