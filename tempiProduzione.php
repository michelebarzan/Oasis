<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Tempi produzione";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="canvasjs.min.js"></script>
		<script src="struttura.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		<script src="js/tempiProduzione.js"></script>
		<link rel="stylesheet" href="css/tempiProduzione.css" />
        <script src="js_libraries/handsontable/handsontable.full.min.js"></script>
		<link href="js_libraries/handsontable/handsontable.full.min.css" rel="stylesheet" media="screen">
		<script type="text/javascript" src="js_libraries/handsontable/languages/it-IT.js"></script>
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="reusable-control-bar" id="actionBarTempiProduzione">
            <button class="rcb-button-text-icon" onclick="esportaExcelTempiProduzione()"><span>Esporta</span><i class="fad fa-file-excel" style="margin-left:5px"></i></button>
		</div>
		<div id="containerTempiProduzione"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
