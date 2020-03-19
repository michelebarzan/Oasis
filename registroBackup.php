<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Registro Backup";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<script src="struttura.js"></script>
		<script src="js/registroBackup.js"></script>
		<link rel="stylesheet" href="css/registroBackup.css" />
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
	<body onload="getRegistroBackup();">
		<?php include('struttura.php'); ?>
		<div id="registroBackupContainer">
            <div id="registroBackupTitleContainer"><span>Ciao</span></div>
            <div id="registroBackupInnerContainer"></div>
        </div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

