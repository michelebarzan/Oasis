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
		<script src="js_libraries/fileSaver.min.js"></script>
        <script src="js_libraries/xlsx.full.min.js"></script>
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
			<div class="action-bar-item" style="margin-left:5px" ><b>Visualizzazione</b>
				<button class="action-bar-icon-button" id="btnFlexDirectionRow" style="width:30px" onclick="changeFlexDirection()"><i class="fad fa-line-columns"></i></button>
				<button class="action-bar-icon-button" id="btnFlexDirectionColumn" style="width:30px" onclick="changeFlexDirection()"><i class="fad fa-line-height"></i></button>
			</div>
			<div class="action-bar-item"><b>Righe</b>
				<input type="number" class="action-bar-input" id="inputFilterTop" onfocusout="getElencoPick()" value="200">
			</div>
			<button class="action-bar-text-icon-button" id="bntFilterChiusi" style="margin-right:0px" onclick="toggleFilterButtons('bntFilterChiusi','chiuso');getElencoPick()"><span>Chiusi</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterAperti" style="margin-left:5px" onclick="toggleFilterButtons('bntFilterAperti','chiuso');getElencoPick()"><span>Aperti</span><i class="far fa-exclamation-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterControllati" style="margin-right:0px" onclick="toggleFilterButtons('bntFilterControllati','controllato');getElencoPick()"><span>Controllati</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterNonControllati" style="margin-left:5px" onclick="toggleFilterButtons('bntFilterNonControllati','controllato');getElencoPick()"><span>Non controllati</span><i class="far fa-exclamation-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterStampati" style="margin-right:0px" onclick="toggleFilterButtons('bntFilterStampati','stampato');getElencoPick()"><span>Stampati</span><i class="far fa-check-circle"></i></button>
			<button class="action-bar-text-icon-button" id="bntFilterNonStampati" style="margin-left:5px" onclick="toggleFilterButtons('bntFilterNonStampati','stampato');getElencoPick()"><span>Non stampati</span><i class="far fa-exclamation-circle"></i></button>
			<div class="action-bar-item"><b style="margin-right:-5px">Ordina per</b>
				<button class="action-bar-text-icon-button" style="margin-right:-5px" id="bntOrderNPick" style="margin-right:0px" onclick="orderBy='n_Pick';getElencoPick()"><span>N pick</span><i class="fas fa-sort-numeric-down-alt"></i></button>
				<button class="action-bar-text-icon-button" id="bntOrderData" style="margin-right:0px" onclick="orderBy='DataPick';getElencoPick()"><span>Data</span><i class="far fa-calendar-alt"></i></button>
			</div>
			<button class="action-bar-text-icon-button" id="bntAggiornaCarichi" style="margin-left:5px" onclick="aggiornaCarichi()"><span>Aggiorna carichi</span><i class="fad fa-redo-alt"></i></button>
		</div>
		<input type="text" id="stampaChecklistSearchBar" placeholder="Cerca..." onkeyup="searchPicks(this)">
		<div id="stampaChecklistContainer"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
		<script src="https://unpkg.com/multiple-select@1.4.1/dist/multiple-select.min.js"></script>
	</body>
</html>

