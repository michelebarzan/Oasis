<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Riepilogo Presenze";
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
		<script src="js/riepilogoPresenze.js"></script>
		<link rel="stylesheet" href="css/riepilogoPresenze.css" />
        <link rel="stylesheet" href="css/reusableContainer.css" />
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="reusable-control-bar" id="actionBarRiepilogoPresenze">
            <button class="rcb-button-text-icon" onclick="esportaExcel()"><span>Esporta</span><i class="fad fa-file-excel" style="margin-left:5px"></i></button>
            <button style="margin-left:auto" class="rcb-button-text-icon btn-range" onclick="setRangeDate(this,'oggi')"><span>Oggi</span><i class="far fa-calendar" style="font-size:13px;font-weight:normal;margin-left:10px"></i></button>
            <button class="rcb-button-text-icon btn-range" onclick="setRangeDate(this,'ieri')"><span>Ieri</span><i class="far fa-calendar" style="font-size:13px;font-weight:normal;margin-left:10px"></i></button>
            <button class="rcb-button-text-icon btn-range" onclick="setRangeDate(this,'questo_mese')"><span>Questo mese</span><i class="far fa-calendar" style="font-size:13px;font-weight:normal;margin-left:10px"></i></button>
            <button class="rcb-button-text-icon btn-range" onclick="setRangeDate(this,'mese_scorso')"><span>Mese scorso</span><i class="far fa-calendar" style="font-size:13px;font-weight:normal;margin-left:10px"></i></button>
            <button class="rcb-button-text-icon btn-range" onclick="setRangeDate(this,'quest_anno')"><span>Quest'anno</span><i class="far fa-calendar" style="font-size:13px;font-weight:normal;margin-left:10px"></i></button>
            <button class="rcb-button-text-icon btn-range" onclick="setRangeDate(this,'anno_scorso')"><span>L'anno scorso</span><i class="far fa-calendar" style="font-size:13px;font-weight:normal;margin-left:10px"></i></button>
            <input class="rcb-input" type="date" id="dataInizio" onchange="getTabellaRegistrazioni()">
            <input class="rcb-input" type="date" id="dataFine" onchange="getTabellaRegistrazioni()">
		</div>
		<div id="containerRiepilogoPresenze">
            <div id="calendarioOuterContainer"></div>
            <div id="tabellaOuterContainer"></div>
        </div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
    </body>
    <script src= "//cdn.rawgit.com/rainabba/jquery-table2excel/1.1.0/dist/jquery.table2excel.min.js"> </script> 
</html>
