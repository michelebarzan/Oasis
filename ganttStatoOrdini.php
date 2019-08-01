<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Gantt stato ordini";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Graduate&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV32.css" />
		<script src="js_libraries/jquery.table2excel.js"></script>
		<script src="struttura.js"></script>
		<script src="js/ganttStatoOrdini.js"></script>

        <script src="js_libraries/dhtmlxgantt/codebase/dhtmlxgantt.js" ></script>
		<link id="ganntThemeLink" rel="stylesheet" href="js_libraries/dhtmlxgantt/codebase/dhtmlxgantt.css" type="text/css">
		<script src="js_libraries/dhtmlxgantt/codebase/ext/dhtmlxgantt_fullscreen.js"></script>
		<!--<script src="js_libraries/dhtmlxgantt/codebase/ext/dhtmlxgantt_tooltip.js"></script>-->

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
	<body onload="">
        <?php include('struttura.php'); ?>
        <div class="absoluteActionBarGanttStatoOrdini" id="absoluteActionBarGanttStatoOrdini">
			<button class="absoluteActionBarGanttStatoOrdiniButton" onclick="apriPopupDati()">Dati <i style="margin-left:5px;" class="fad fa-database"></i></button>
			<button class="absoluteActionBarGanttStatoOrdiniButton" onclick="apriPopupImpostazioni()">Impostazioni <i style="margin-left:5px;" class="fad fa-cog"></i></button>
			<button class="absoluteActionBarGanttStatoOrdiniButton" onclick="apriPopupVisualizzazione()">Visualizzazione <i style="margin-left:5px;" class="fad fa-window"></i></button>

			<button class="absoluteActionBarGanttStatoOrdiniButton" style="float:right" onclick="toggleGanttFullScreen()"><i class="fal fa-window-maximize" id="ganttStatoOrdiniFullscreenIcon" title="Schermo intero"></i></button>
		</div>
		<div id="containerGanttStatoOrdini"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

