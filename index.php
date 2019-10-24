<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Homepage";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Nunito|Raleway" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Quicksand:300" rel="stylesheet">
		<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<script src="struttura.js"></script>
		<script src="js/index.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<style>
		.logoHeader{display:none}
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
			.swal2-container
			{
				z-index: 98;
			}
		</style>
	</head>
	<body onload="getPagineHomepage()">
		<?php include('struttura.php'); ?>
		<div id="container" style="width:1500px">
			<div id="content" style="width:1500px">
				<div id="immagineLogo" class="immagineLogo" ></div>
				<div class="homepageLinkContainer">
					<!--<div class="homepageLink" data-tooltip="Apri, consulta, modifica o elimina un ticket" onclick="gotopath('ticketAssistenza.php')">
						<i class="fal fa-question-circle"></i>
						<div>Ticket Assistenza</div>
					</div>
					<div class="homepageLink" data-tooltip="Stampa le etichette delle liste di carico" onclick="gotopath('gestionePicking.php')">
						<i class="fal fa-tasks"></i>
						<div>Liste di carico</div>
					</div>
					<div class="homepageLink" data-tooltip="Visualizza e stampa il contenuto dei bancali" onclick="gotopath('stampaPallet.php')">
						<i class="fal fa-print"></i>
						<div>Stampa pallet</div>
					</div>
					<div class="homepageLink" data-tooltip="Controlla i picking chiusi dal magazziniere" onclick="gotopath('controlloPick.php')">
						<i class="fal fa-check-square"></i>
						<div>Controlla pick</div>
					</div>
					<div class="homepageLink" data-tooltip="Visualizza il carico di lavoro delle stazioni" onclick="gotopath('carichiDiLavoro.php')">
						<i class="fal fa-tasks-alt"></i>
						<div>Carichi di lavoro</div>
					</div>
					<div class="homepageLink" data-tooltip="Visualizza lo storico della produzione delle stazioni" onclick="gotopath('storicoProduzione.php')">
						<i class="fal fa-history"></i>
						<div>Storico produzione</div>
					</div>
					<div class="homepageLink" data-tooltip="Gestisci i carichi di lavoro delle stazioni" onclick="gotopath('gestioneCarichiDiLavoro.php')">
						<i class="fal fa-balance-scale"></i>
						<div>Gestione carichi di lavoro</div>
					</div>
					<div class="homepageLink" data-tooltip="Confronta la previsione e la reale produzione delle stazioni" onclick="gotopath('sommarioProduzione.php')">
						<i class="fal fa-chart-bar"></i>
						<div>Sommario produzione</div>
					</div>
					<div class="homepageLink" data-tooltip="Controlla le registrazioni e le foto degli ordini" onclick="gotopath('registrazioniProduzione.php')">
						<i class="fal fa-table"></i>
						<div>Registrazioni produzione</div>
					</div>
					<div class="homepageLink" data-tooltip="Controlla lo stato delle merci ricevute" onclick="gotopath('ricevimentoMerci.php')">
						<i class="fal fa-ballot-check"></i>
						<div>Ricevimento merci</div>
					</div>
					<div class="homepageLink" data-tooltip="Genera il report dell' ufficio commerciale" onclick="gotopath('reportUfficioCommerciale.php')">
						<i class="fal fa-file-plus"></i>
						<div>Report ufficio commerciale</div>
					</div>
					<div class="homepageLink" data-tooltip="Consulta, filtra ed esporta i report, gli archivi, le tabelle, le query ecc..." onclick="gotopath('sommarioArchivi.php')">
						<i class="fal fa-database"></i>
						<div>Sommario archivi</div>
					</div>
					<div class="homepageLink" data-tooltip="Controlla lo stato degli ordini da un grafico Gantt" onclick="gotopath('ganttStatoOrdini.php')">
						<i class="fal fa-analytics"></i>
						<div>Gantt stato ordini</div>
					</div>
					<div class="homepageLink" data-tooltip="Apri una nuova richiesta o consulta quelle esistenti" onclick="gotopath('richiesteEfaq.php')">
						<i class="fal fa-question-square"></i>
						<div>FAQ &<br>richieste</div>
					</div>
					<div class="homepageLink" data-tooltip="Gestisci e rispondi alle richieste che ti riguardano" onclick="gotopath('gestioneRichiesteEfaq.php')">
						<i class="fal fa-inbox-in"></i>
						<div>Gestione FAQ & richieste</div>
					</div>-->
				</div>
			</div>
		</div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
