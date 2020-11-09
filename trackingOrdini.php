<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Tracking Ordini";
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
		<script src="js/trackingOrdini.js"></script>
		<link rel="stylesheet" href="css/trackingOrdini.css" />
        <link rel="stylesheet" href="css/reusableContainer.css" />
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="reusable-control-bar" id="actionBarTrackingOrdini">
            <div class="rcb-input-icon-container" style="padding-left:10px;padding-right:10px">
                <input type="search" placeholder="Ordine..." style="border:none;height:100%;margin-right:10px;" id="inputSearchTrackingOrdine" onsearch="getTrackingOrdine()">
                <i class="fad fa-search" onclick="getTrackingOrdine()"></i>
            </div>
		</div>
		<div id="containerTrackingOrdini"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
