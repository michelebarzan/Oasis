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
			<link rel="stylesheet" href="css/styleV32.css" />
			<script src="struttura.js"></script>
			<script>
				/*function getPopup(titolo,descrizione)
				{
					document.getElementById("popup").style.display="inline-block";
					document.getElementById("titoloPopupTutorialTicket").innerHTML=titolo;
					document.getElementById("descrizionePopupTutorialTicket").innerHTML=descrizione;
				}
				function chiudiPopup()
				{
					document.getElementById("popup").style.display="none";
				}*/
			</script>
			<style>
				@import url(http://fonts.googleapis.com/css?family=Exo:100,200,400);
				@import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:700,400,300);
			</style>
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<!--<div id="popup" style="display:none">
			<b><u id="titoloPopupTutorialTicket"></u></b><br><br>
			<span id="descrizionePopupTutorialTicket"></span>
		</div>
		<script>
			getPopup('Aggiornamento ticket<i class="fal fa-window-close" style="float:right;font-size:150%;cursor:pointer" onclick="chiudiPopup()"></i>','E stato implementato un sistema di assistenza mediante ticket.<br>Consulta la pagina <a href="ticketAssistenza.php" id="linkHistory">Ticket assistenza</a> per iniziare ad usare i ticket.');
		</script>-->
		<div id="container">
			<div id="content">
				<div id="immagineLogo" class="immagineLogo" ></div>
				<div class="homepageLinkContainer">
					<div class="homepageLink" data-tooltip="Apri, consulta, modifica o elimina un ticket" onclick="gotopath('ticketAssistenza.php')">
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
				</div>
			</div>
		</div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
