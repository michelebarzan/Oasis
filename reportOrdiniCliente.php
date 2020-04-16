<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Report ordini cliente";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		<title><?php echo $pageName; ?></title>
		<script src="js_libraries/spinnersV2/spinners.js"></script>
		<link rel="stylesheet" href="js_libraries/spinnersV2/spinners.css" />
		<link rel="stylesheet" href="css/styleV35.css" />
		<link rel="stylesheet" href="css/reusableContainer.css" />
		<script src="struttura.js"></script>
		<script src="js/reportOrdiniCliente.js"></script>
		<link rel="stylesheet" href="css/reportOrdiniCliente.css" />
	</head>
	<body onload="onloadActions()" onresize="fixTable()">
		<?php include('struttura.php'); ?>
		<div class="top-action-bar" id="reportOrdiniClienteActionBar">
			<div class="action-bar-item" style="margin-left:5px" ><b>Intestazione</b>
				<button class="action-bar-icon-button" id="btnHeaderTabellaSL" style="color:#4C91CB;border:0.5px solid #4C91CB;" onclick="setHeaderTabella('sl')"><i class="far fa-horizontal-rule"></i></button>
				<button class="action-bar-icon-button" id="btnHeaderTabellaML" onclick="setHeaderTabella('ml')"><i class="fad fa-line-height"></i></button>
			</div>
			<button class="action-bar-text-icon-button" id="btnApplicaFiltro" style="margin-left:5px" onclick="getPopupFiltrISalvati()"><span>Filtri salvati</span><i class="far fa-filter"></i></button>
			<button class="action-bar-text-icon-button" id="btnCancellaFiltri" style="margin-left:5px" onclick="cancellaFiltri()"><span>Cancella filtri</span><i class="far fa-filter"></i></button>
			<button class="action-bar-text-icon-button" id="btnSalvaFiltro" style="margin-left:5px" onclick="getSalvaFiltroPopup()"><span>Salva filtro corrente</span><i class="far fa-save"></i></button>
			<button class="action-bar-text-icon-button" id="btnEsportaExcel" style="margin-left:5px" onclick="esportaExcel()"><span>Esporta</span><i class="far fa-file-excel"></i></button>
		</div>
		<!--<input type="text" id="reportOrdiniClienteSearchBar" placeholder="Cerca..." onkeyup="searchPicks(this)">-->
		<div id="reportOrdiniClienteContainer"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

