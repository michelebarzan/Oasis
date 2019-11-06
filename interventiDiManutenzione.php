<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Interventi di manutenzione";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Graduate&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="editableTable/editableTable.css" />
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<script src="struttura.js"></script>
		<script src="js/interventiDiManutenzione.js"></script>
		<link rel="stylesheet" href="css/interventiDiManutenzione.css" />
		<script src="js_libraries/jquery.table2excel.js"></script>
		<link rel="stylesheet" href="https://unpkg.com/multiple-select@1.4.1/dist/multiple-select.min.css">
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
	<body onload="getInterventiDiManutenzione()">
		<?php include('struttura.php'); ?>
        <div class="absoluteActionBar2" style="top:100">
            <button class="absoluteActionBarButton" onclick="apriPopupNuovoIntervento()">
                Nuovo intervento
                <i class="fad fa-layer-plus" style="margin-left:5px"></i>
			</button>
			<div class="absoluteActionBarSommarioArchiviElement">Righe: <span id="rowsNumEditableTable"></span></div>
			<button class="absoluteActionBarSommarioArchiviButton" onclick="scaricaExcel('interventiDiManutenzioneContainer')">Esporta <i style="margin-left:5px;color:green" class="far fa-file-excel"></i></button>
			<button class="absoluteActionBarSommarioArchiviButton" onclick="resetFilters();getTable(selectetTable)">Ripristina <i style="margin-left:5px" class="fal fa-filter"></i></button>
        </div>
        <div id="interventiDiManutenzioneSearchBarContainer">
            <input type="text" id="interventiDiManutenzioneMainSearchInput" onkeyup="mainSearchInterventi(this)"  placeholder="Cerca tra gli interventi...">
        </div>
        <div id="interventiDiManutenzioneContainer"></div>
		</div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
		<script src="https://unpkg.com/multiple-select@1.4.1/dist/multiple-select.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="js_libraries/selectize/selectize.min.js"></script>
		<link rel="stylesheet" href="js_libraries/selectize/selectize.css" />
	</body>
</html>

