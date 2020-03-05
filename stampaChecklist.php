<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Stampa checklist";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="js_libraries/spinnersV2/spinners.js"></script>
		<link rel="stylesheet" href="js_libraries/spinnersV2/spinners.css" />
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<script src="struttura.js"></script>
		<script src="js/stampaChecklist.js"></script>
		<link rel="stylesheet" href="css/stampaChecklist.css" />
		<link rel="stylesheet" href="https://unpkg.com/multiple-select@1.4.1/dist/multiple-select.min.css">
		<style>
			.swal2-title
			{
				font-family:'Montserrat',sans-serif;
				font-size:15px;
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
	<body onload="checkFlexDirection();getElencoPick()">
		<?php include('struttura.php'); ?>
		<div class="top-action-bar" id="stampaChecklistActionBar">
			<!--<button class="action-bar-text-icon-button" style="margin-left:0px" onclick="anteprimaDiStampa()"><span>Anteprima di stampa</span><i class="fad fa-print"></i></button>
			<button class="action-bar-text-icon-button" onclick="stampaImmediata()"><span>Stampa immediata</span><i class="fad fa-print"></i></button>-->
			<div class="action-bar-item" style="margin-left:5px" ><b>Visualizzazione</b>
				<button class="action-bar-icon-button" id="btnFlexDirectionRow" onclick="changeFlexDirection()"><i class="fad fa-line-columns"></i></button>
				<button class="action-bar-icon-button" id="btnFlexDirectionColumn" onclick="changeFlexDirection()"><i class="fad fa-line-height"></i></button>
			</div>
			<div class="action-bar-item"><b>Righe</b>
				<input type="number" class="action-bar-input" id="inputFilterTop" onfocusout="getElencoPick()" value="200">
			</div>
			<button class="action-bar-text-icon-button" id="bntFilterChiusi" style="margin-right:0px" onclick="filterChiuso='true';getElencoPick()"><span>Chiusi</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterAperti" style="margin-left:5px" onclick="filterChiuso='false';getElencoPick()"><span>Aperti</span><i class="far fa-exclamation-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterControllati" style="margin-right:0px" onclick="filterControllato='true';getElencoPick()"><span>Controllati</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterNonControllati" style="margin-left:5px" onclick="filterControllato='false';getElencoPick()"><span>Non controllati</span><i class="far fa-exclamation-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterStampati" style="margin-right:0px" onclick="filterStampato='true';getElencoPick()"><span>Stampati</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterNonStampati" style="margin-left:5px" onclick="filterStampato='false';getElencoPick()"><span>Non stampati</span><i class="far fa-exclamation-circle"></i></button>
			<div class="action-bar-item"><b style="margin-right:-5px">Ordina per</b>
				<button class="action-bar-text-icon-button" style="margin-right:-5px" id="bntOrderNPick" style="margin-right:0px" onclick="orderBy='n_Pick';getElencoPick()"><span>N pick</span><i class="fas fa-sort-numeric-down-alt"></i></button>
				<button class="action-bar-text-icon-button" id="bntOrderData" style="margin-right:0px" onclick="orderBy='DataPick';getElencoPick()"><span>Data</span><i class="far fa-calendar-alt"></i></button>
			</div>
		</div>
		<input type="text" id="stampaChecklistSearchBar" placeholder="Cerca..." onkeyup="searchPicks(this)">
		<div id="stampaChecklistContainer"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
		<script src="https://unpkg.com/multiple-select@1.4.1/dist/multiple-select.min.js"></script>
	</body>
</html>

