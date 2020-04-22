<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Registrazioni produzione";

	if(isset($_GET["colonnaFiltro"]))
		echo '<input type="hidden" value="'.$_GET["colonnaFiltro"].'" id="getParamsColonnaFiltro">';
	if(isset($_GET["valoreFiltro"]))
	{
		$valoreFiltro=$_GET["valoreFiltro"];
		$valoreFiltro=str_replace("||","'",$valoreFiltro);
		$valoreFiltro=str_replace("|_|"," ",$valoreFiltro);
		$valoreFiltro=str_replace("|-|","/",$valoreFiltro);
		$valoreFiltro=str_replace("|--|","\\",$valoreFiltro);
		$valoreFiltro=str_replace("|e|","&",$valoreFiltro);
		$valoreFiltro=str_replace("|uguale|","=",$valoreFiltro);
		echo '<input type="hidden" value="'.$valoreFiltro.'" id="getParamsValoreFiltro">';
	}
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="js/registrazioniProduzione.js"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<script src="struttura.js"></script>
		<style>
			@import url(http://fonts.googleapis.com/css?family=Exo:100,200,400);
			@import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:700,400,300);
			
			/* width */
			::-webkit-scrollbar {
				width: 10px;
			}

			/* Track */
			::-webkit-scrollbar-track {
				background: #f1f1f1; 
			}
				
			/* Handle */
			::-webkit-scrollbar-thumb {
				background: #888; 
			}

			/* Handle on hover */
			::-webkit-scrollbar-thumb:hover {
				background: #555; 
			}
		</style>
	</head>
	<body onload="checkSincronizzazioneImmaginiAndroid();getElencoRegistrazioniProduzione()">
		<?php include('struttura.php'); ?>
		<div class="topRightCornerToast" id="topRightCornerToast"></div>
		<div id="container">
			<div id="content">
				<div id="immagineLogo" class="immagineLogo" ></div>
				<div class="menuListContainer">
					<div class="menuListInputContainer">
						<button class="menuListButton" id="btnElencoRegistrazioni" onclick="resetStyle();getElencoRegistrazioniProduzione()">Registrazioni<i class="fal fa-list" style="font-size:100%;margin-left:15px"></i></button>
						<button class="menuListButton" id="btnFotoOrdini" onclick="resetStyle();getFotoOrdini()">Foto ordini<i class="fal fa-camera" style="font-size:100%;margin-left:15px"></i></button>
					</div>
				</div>
				<div id="registrazioniProduzioneContainer">
					<?php
						
					?>
				</div>
			</div>
		</div>
		<div id="push"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

