<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Documentazione";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<script src="struttura.js"></script>
		<script src="js/documentazione.js"></script>
		<link rel="stylesheet" href="css/documentazione.css" />
	</head>
	<body onload="onloadActions()">
		<?php include('struttura.php'); ?>
        <div class="documentazione-top-bar">
            <button onclick="popupCaricaDocumento()">
                <i class="fad fa-file-upload"></i>
                <span>Carica</span>
            </button>
            <button onclick="toggleOrderIcon(this);">
                <i class="fad fa-sort-amount-down"></i>
                <span>Nome</span>
            </button>
            <input type="search" id="searcBarDocumentazione" placeholder="Cerca..." onkeyup="searchdocumentazione(this.value.toLowerCase())">
            <select id="selectFiltroCategoria" onchange="getElencoDocumentazione()"></select>
        </div>
        <div id="containerDocumentazione"></div>
        <datalist id="datalistCategorie"></datalist>

		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

