<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Video Sorveglianza";
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
		<script src="js/videosorveglianza.js"></script>
		<link rel="stylesheet" href="css/videosorveglianza.css" />
        <link rel="stylesheet" href="css/reusableContainer.css" />
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<script>
			Swal.fire
			({
				width:"100%",
				background:"transparent",
				title:"Caricamento in corso...",
				html:'<i class="fad fa-spinner-third fa-spin fa-3x" style="color:white"></i>',
				allowOutsideClick:false,
				showCloseButton:false,
				showConfirmButton:false,
				allowEscapeKey:false,
				showCancelButton:false,
				onOpen : function(){document.getElementsByClassName("swal2-title")[0].style.fontWeight="bold";document.getElementsByClassName("swal2-title")[0].style.color="white";}
			});
		</script>
		<iframe src="https://www.ispyconnect.com/app/" id="videosorveglianzaiFrame" onload="setTimeout(() => {Swal.close()}, 2000);"></iframe>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
