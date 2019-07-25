<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Report ufficio commerciale";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="fontawesomepro/css/fontawesomepro.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="editableTable/editableTable.css" />
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<script src="js_libraries/handsontable/handsontable.full.min.js"></script>
		<link href="js_libraries/handsontable/handsontable.full.min.css" rel="stylesheet" media="screen">
		<script type="text/javascript" src="js_libraries/handsontable/languages/it-IT.js"></script>
		<script src="jquery.table2excel.js"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV28.css" />
		<script src="js_libraries/jquery.table2excel.js"></script>
		<script src="struttura.js"></script>
		<script src="js/reportUfficioCommerciale.js"></script>
		<style>
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
		</style>
	</head>
	<body onload="apriPopupIntervalloDate()">
		<?php include('struttura.php'); ?>
		<input type="hidden" id="id_utente" value="<?php echo $_SESSION['id_utente']; ?>" />
		<div class="reportUfficioCommercialeAbsoluteActionBar">
			<!--<div class="absoluteActionBarElement">Righe: <span id="rowsNumEditableTable"></span></div>-->
			<button class="absoluteActionBarButton" onclick="apriPopupIntervalloDate()">Origine dati<i style="margin-left:5px" class="far fa-calendar-alt"></i></button>
			<button class="absoluteActionBarButton" onclick="salvaModifiche()">Salva modifiche<i style="margin-left:5px" class="far fa-save"></i></button>
			<button class="absoluteActionBarButton" onclick="esportaExcel()">Esporta<i style="margin-left:5px;color:green" class="fal fa-file-excel"></i></button>
		</div>
		<div id="outerContainerReportUfficioCommerciale">
			<div id="innerContainerReportUfficioCommerciale"></div>
		</div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

