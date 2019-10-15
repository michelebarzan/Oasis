<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Sommario archivi";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="editableTable/editableTable.css" />
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV33.css" />
		<script src="js_libraries/jquery.table2excel.js"></script>
		<script src="struttura.js"></script>
		<script src="js/sommarioArchivi.js"></script>
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
	<body onload="getSommariUtenti()">
		<?php include('struttura.php'); ?>
        <div class="funcionListContainer" style="top:100;">
			<div class="functionList">
				<!--<button class="functionListButton" onclick="resetStyle(this);getTable('report_ufficio_commerciale_user_view')">Sommario ufficio commerciale</button>
				<button class="functionListButton" onclick="resetStyle(this);getTable('report_ufficio_commerciale_manager_view')">Sommario ufficio commerciale (manager)</button>-->
			</div>
		</div>
		<div class="absoluteActionBarSommarioArchivi">
			<div class="absoluteActionBarSommarioArchiviElement">Righe: <span id="rowsNumEditableTable"></span></div>
			<button class="absoluteActionBarSommarioArchiviButton" onclick="scaricaExcel('containerSommarioArchivi')">Esporta <i style="margin-left:5px;color:green" class="far fa-file-excel"></i></button>
			<button class="absoluteActionBarSommarioArchiviButton" onclick="resetFilters();getTable(selectetTable)">Ripristina <i style="margin-left:5px" class="fal fa-filter"></i></button>
		</div>
		<div id="containerSommarioArchivi"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

