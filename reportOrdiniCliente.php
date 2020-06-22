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
			<button class="action-bar-text-icon-button" id="btnRaggruppaOrdiniFornitore" style="margin-left:5px" onclick="toggleRaggruppaOrdini(this)"><span>Raggruppa ordini</span><i class="fal fa-object-group"></i></button>
			<!--<button class="action-bar-text-icon-button" style="margin-left:5px" onclick="window.find('galleria')"><span>cerca</span><i class="far fa-filter"></i></button>-->
			<button class="action-bar-text-icon-button" id="btnApplicaFiltro" style="margin-left:5px" onclick="getPopupFiltrISalvati()"><span>Filtri salvati</span><i class="far fa-filter"></i></button>
			<button class="action-bar-text-icon-button" id="btnCancellaFiltri" style="margin-left:5px" onclick="cancellaFiltri()"><span>Cancella filtri</span><i class="far fa-filter"></i></button>
			<button class="action-bar-text-icon-button" id="btnSalvaFiltro" style="margin-left:5px" onclick="getSalvaFiltroPopup()"><span>Salva filtro corrente</span><i class="far fa-save"></i></button>
			<button class="action-bar-text-icon-button" id="btnEsportaExcel" style="margin-left:5px" onclick="esportaExcel('*')"><span>Esporta tutto</span><i class="far fa-file-excel"></i></button>
			<button class="action-bar-text-icon-button" id="btnEsportaExcel" style="margin-left:5px" onclick="esportaExcel('ordini_cliente')"><span>Esporta ordini cliente</span><i class="far fa-file-excel"></i></button>
			<button class="action-bar-text-icon-button" id="btnRipristinaDimensioneColonna" style="margin-left:5px;display:none" onclick="ripristinaDimensioneColonne()"><span>Ripristina dimensione colonne</span><i class="fad fa-redo-alt"></i></button>
			<div class="action-bar-item" style="margin-left:auto;margin-right:0px" >
				<span style="margin-right:5px">Ultimo aggiornamento: <b id="ultimoAggiornamentoLabel"></b></span>
				<button class="action-bar-text-icon-button" style="margin-right:0px" id="btnAggiornaDati" onclick="aggiornaOrdiniClienteView()"><span>Aggiorna</span><i class="fad fa-sync-alt"></i></button>
			</div>
			<div class="action-bar-item" style="margin-left:auto;margin-right:5px;display:none" >
				<button class="action-bar-icon-button" id="btnRangeDati" style="font-family:'Quicksand',sans-serif;font-size:12px;font-weight:bold;color:#4C91CB;border:0.5px solid #4C91CB;" onclick="setRangeDati(2)">Ultimi 2 anni</button>
				<button class="action-bar-icon-button" id="btnRangeDatiTutti" style="font-family:'Quicksand',sans-serif;font-size:12px;font-weight:bold" onclick="setRangeDati('*')">Tutti gli anni</button>
			</div>
		</div>
		<div id="reportOrdiniClienteActiveFilterContainer">
			<div class="report-ordini-cliente-active-filter-container-item" style="border-top-left-radius:3px;border-bottom-left-radius:3px;height:25px;background-color:#404040;color:white;font-weight:normal;padding-left:10px;padding-right:10px;width:90px;overflow:hidden">
				<span>N. record:</span>
				<span id="numeroRecordReportOrdiniCliente" style='margin-left:5px'>0</span>
			</div>
			<div class="report-ordini-cliente-active-filter-container-item" style="margin-left:10px">
				<span style="margin-right:5px">Filtri attivi:</span>
				<div id="filtriAttiviReportOrdiniCliente"></div>
			</div>
		</div>
		<!--<input type="text" id="reportOrdiniClienteSearchBar" placeholder="Cerca..." onkeyup="searchPicks(this)">-->
		<div id="reportOrdiniClienteContainer"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
		<script src="js_libraries/jquery-ui.js"></script>
	</body>
</html>

