<?php
	include "Session.php";
	include "connessione.php";
	include "connessionePDO.php";

	$pageName="Storico produzione";
	
	if(!$conn || !$connPDO)
		die("Errore: impossibile connettersi al server SQL");	
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<link rel="stylesheet" href="css/storicoProduzione.css" />
		<script src="struttura.js"></script>
		<script src="js/storicoProduzione.js"></script>
		<script src="canvasjs.min.js"></script>
		<script src="tableToExcel.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
	</head>
	<body onload="document.getElementById('btnConfermaSettimane').disabled=false;document.getElementById('btnNonAggiornare').disabled=false;">
		<div id="containerProgressBar">
			<div id="middle">
				<div id="messaggi"></div>
				<div id="inner">
					<div id="containerRangeBar">
						<span style="display:inline-block;float:left">Numero di settimane da visualizzare (4-52):</span>
						<div id="containerNSettimane">
							<button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" id="btnMeno">-</button>
							<input type="number" id="nSettimane" value="20" min="4" max="52" onchange="fixNSettimane()" />
							<button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="btnPiu">+</button>
						</div>
						<input type="button" id="btnConfermaSettimane" class="btnBlu" value="Conferma" onclick="riempiTabelle();" disabled>
						<input type="button" id="btnNonAggiornare" value="Non aggiornare le tabelle" onclick="nonAggiornare();" disabled>
					</div>
				</div>
			</div>
		</div>
		<div id="hiddenContenutoDettaglio" style="display:none"></div>
		<div id="popupDettaglio">
			<div id="intestazioneDettaglio">
				<div id='bottoniPopupDettaglio'>
					<input type="button" id="btnChiudiPopupDettaglio" onclick="dettaglio=0;document.getElementById('popupDettaglio').style.display='none'" value="" />
					<input type="button" id="btnFullScreenPopupDettaglio" onclick="fullscreenDettaglio()" value="" />
					<input type="button" id="btnExcelDettaglio" onclick="downloadExcel();" value="" />
				</div>
				<div id='titoloDettaglio'></div>
			</div>
			<div id="contenitoreBntNextDettaglio">
				<input type="button" id="btnLeftDettaglio" onclick="nextDettaglio()" value="" />
				<input type="button" id="btnRightDettaglio" onclick="nextDettaglio()" value="" />
			</div>
			<div id="contenutoDettaglio"></div>
		</div>
		<form target="_blank" id="TheForm" method="post" action="fullscreenDettaglioStorico.php" style="display:none;">
			<input type="hidden" name="tipoH" id="tipoH" value="" />
			<input type="hidden" name="stazioneH" id="stazioneH" value="" />
			<input type="hidden" name="weekH" id="weekH" value="" />
		</form>
		<div id="popupModificaSettimane" onclick="document.getElementById('popupModificaSettimane').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmouseup="document.getElementById('popupModificaSettimane').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmousedown="document.getElementById('popupModificaSettimane').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	">
			<div id="popupModificaSettimaneheader">
				<div style="color:white;box-sizing:border-box;height:60px;padding-left:40px;padding-top:20px;width:250px;float:left;display:inline-block;font-weight:bold">Modifica settimane</div>
				<input type="button" id="btnChiudiPopupModificaSettimane" onclick="chiudiPopupModificaSettimane()" value="" />
			</div>
			<div id="tabellaPopupModificaSettimane"></div>
			<div id="containerInputPopupModificaSettimane">
				<input type="button" id="btnConfermaPopupModificaSettimane" class="btnBlu" value="Conferma" onclick="confermaModificaSettimane()" />
				<div id="statoModificaSettimane"></div>
				<input type="button" id="btnAnnullaPopupModificaSettimane" class="btnBlu" value="Annulla" onclick="getTableModificaSettimane()" />
			</div>
		</div>
		<?php include('struttura.php'); ?>
		<div id="container" onclick="changeOpacity()">
			<div id="content">
				<div id="intestazioneCarichiDiLavoro">
					<input type="button" id="btnPuntoPunto" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();puntoPunto()" value="Storico punto punto" />
					<input type="button" id="btnVerniciatura" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();verniciatura()" value="Storico verniciatura" />
					<input type="button" id="btnMontaggio" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();montaggio()" value="Storico montaggio" />
				</div>
				<div id="comandiTabelle">
					<!--<input type="button" id="btnStampaCaricoDiLavoro" class="btnBlu" value="Stampa" onclick="stampa();" />-->
					<!--<input type="button" id="btnExcelCaricoDiLavoro" class="btnBlu" value="Scarica" onclick="tableToExcel('myTableTabelleCarichiDiLavoro');" />-->
					<select id="btnExcelCaricoDiLavoro" class="btnBlu" onchange="esportaExcelTabella(this);">
						<option value="">Esporta</option>
						<option value="1">Tabella a video</option>
						<option value="2">Tabella senza testi</option>
					</select>
					<input type="button" id="btnAggiornaTabelle" class="btnBlu" value="Importa tabelle" onclick="document.getElementById('push2').style.height='0px';document.getElementById('containerProgressBar').style.display='table';document.getElementById('btnConfermaSettimane').click();resetStyle()" />
					<input type="button" id="btnModificaSettimane" class="btnBlu" value="Settimane" onclick="apriPopupModificaSettimane();" />
				</div>
				<div id="containerStoricoProduzione" class="absoluteContainer2" style="top:230;overflow:auto"></div>
			</div>
		</div>
		<div id="push2"></div>
		<div id="footer" onclick="changeOpacity()">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
