<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Foto ordini";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<title><?php echo $pageName; ?></title>
        <link rel="stylesheet" href="css/styleV35.css" />
        <script src="struttura.js"></script>
        <script src="js/fotoOrdini.js"></script>
	</head>
	<body onload="checkSincronizzazioneImmaginiAndroid();getFotoOrdini()">
		<?php include('struttura.php'); ?>
		<div class="topRightCornerToast" id="topRightCornerToast" style="top:200"></div>
		<div id="registrazioniProduzioneContainer" style="top:100"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

