<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Sommario produzione";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="canvasjs.min.js"></script>
		<script src="struttura.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		<script src="js_libraries/jquery.table2excel.js"></script>
		<script src="js/sommarioProduzione.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="css/reusableContainer.css" />
		<link rel="stylesheet" href="css/sommarioProduzione.css" />
		<link rel="stylesheet" href="editableTable/editableTable.css" />
		<script src="js_libraries/fileSaver.min.js"></script>
        <script src="js_libraries/xlsx.full.min.js"></script>
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
	<body onload="onloadsommarioProduzione()">
		<?php include('struttura.php'); ?>
		<div class="reusable-control-bar" id="actionBarSommarioProduzione">
			<div class="rcb-select-container">
				<select class="bottom-control-bar-select" id="rcbselectSettimanaSommarioProduzione" onchange="getSommarioProduzioneCharts()"></select>
			</div>
			<div class="rcb-select-container">
				<select class="bottom-control-bar-select" id="rcbselectStazioneSommarioProduzione" onchange="getSommarioProduzioneCharts()">
					<optgroup label="Punto punto">
						<option value="PTO_PTO">Stazione: PTO_PTO</option>
					</optgroup>
					<optgroup label="Verniciatura">
						<option value="CAB_ACR">Stazione: CAB_ACR</option>
						<option value="CAB_LAC">Stazione: CAB_LAC</option>
					</optgroup>
					<optgroup label="Montaggio">
						<option value="MNT_ACA">Stazione: MNT_ACA</option>
						<option value="MNT_HOME">Stazione: MNT_HOME</option>
						<option value="MNT_LUT">Stazione: MNT_LUT</option>
						<option value="MNT_MAST">Stazione: MNT_MAST</option>
					</optgroup>
				</select>
			</div>
		</div>
		<div id="containerSommarioProduzione"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
