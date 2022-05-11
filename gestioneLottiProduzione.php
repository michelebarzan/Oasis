<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Gestione Lotti Produzione";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<!--<script src="canvasjs.min.js"></script>-->
		<script src="struttura.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		<script src="js/gestioneLottiProduzione.js"></script>
		<link rel="stylesheet" href="css/gestioneLottiProduzione.css" />
        <script src="js_libraries/handsontable/handsontable.full.min.js"></script>
		<link href="js_libraries/handsontable/handsontable.full.min.css" rel="stylesheet" media="screen">
		<script type="text/javascript" src="js_libraries/handsontable/languages/it-IT.js"></script>
		<link rel="stylesheet" href="css/inPageNavBar.css" />
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="in-page-nav-bar">
			<div class="in-page-nav-bar-row"></div>
			<div class="in-page-nav-bar-row">
				<button class="in-page-nav-bar-button" id="btn_creazione_lotto" onclick="getMascheraCreazioneLotto(this)">
					<span>Creazione lotto</span>
                    <i class="fad fa-layer-plus"></i>
                </button>
				<button class="in-page-nav-bar-button" id="btn_produzione_lotto" onclick="getMascheraProduzioneLotto(this)">
					<span>Messa in produzione lotto</span>
					<i class="fa-duotone fa-screwdriver-wrench"></i>
                </button>
				<button class="in-page-nav-bar-button" id="btn_anagrafica_articoli" onclick="getMascheraAnagraficaArticoli(this)">
					<span>Anagrafica articoli</span>
                    <i class="fad fa-database"></i>
                </button>
				<button class="in-page-nav-bar-button" id="btn_anagrafica_stazioni" onclick="getMascheraAnagraficaStazioni(this)">
					<span>Anagrafica stazioni</span>
                    <i class="fa-duotone fa-industry-windows"></i>
                </button>
				<button class="in-page-nav-bar-button" id="btn_percorso_produttivo_articoli" onclick="getMascheraPercorsoProduttivoArticoli(this)">
					<span>Percorso produttivo articoli</span>
					<i class="fa-duotone fa-diagram-project"></i>
                </button>
			</div>
		</div>
		<div class="reusable-control-bar" id="actionBarGestioneLottiProduzione" style="display:none"></div>
		<div id="gestioneLottiProduzioneContainer"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>