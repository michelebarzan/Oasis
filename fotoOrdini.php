<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Foto ordini";
?>
<html>
	<head>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
		<title><?php echo $pageName; ?></title>
		<script src="js_libraries/spinnersV2/spinners.js"></script>
		<link rel="stylesheet" href="js_libraries/spinnersV2/spinners.css" />
		<link rel="stylesheet" href="css/styleV35.css" />
		<link rel="stylesheet" href="css/fotoOrdini.css" />
		<script src="struttura.js"></script>
		<script src="js/fotoOrdini.js"></script>
	</head>
	<body onload="onloadFotoOrdini()">
		<?php include('struttura.php'); ?>
        <div class="reusable-control-bar" id="actionBarFotoOrdini">
            <input type="search" id="searcBarFotoOrdini" placeholder="Cerca..." class="rcb-input" onkeyup="searchFotoOrdini(this.value.toLowerCase())">
			<button class="rcb-button-text-icon" onclick="document.getElementById('fotoOrdiniInputCarica').click()">
				<span>Carica foto</span>
				<i class="fal fa-images" style="margin-left:5px"></i>
            </button>
            <input type="file" id="fotoOrdiniInputCarica" style="display: none;" accept="image/*" onchange="checkImage(this,event)" multiple>
			<button class="rcb-button-text-icon" onclick="sincronizzaFotoOrdini()">
				<span>Aggiorna</span>
				<i class="fal fa-inbox-in" style="margin-left:5px"></i>
			</button>
        </div>
        
        <!--<div class="bottom-control-bar">
            <button class="bottom-control-bar-button" onclick="fotoOrdiniIndietro()">
                <div><i class="fal fa-long-arrow-left"></i></div>
                <div><span>Indietro</span></div>
            </button>
            <button class="bottom-control-bar-button" onclick="document.getElementById('fotoOrdiniInputCarica').click()">
                <div><i class="fal fa-images"></i></div>
                <div><span>Carica foto</span></div>
            </button>
            <input type="file" id="fotoOrdiniInputCarica" style="display: none;" accept="image/*" onchange="checkImage(this,event)" multiple>
            <button class="bottom-control-bar-button" onclick="document.getElementById('fotoOrdiniInputScatta').click()">
                <div><i class="fal fa-camera-alt"></i></div>
                <div><span>Scatta foto</span></div>
            </button>
            <input type="file" id="fotoOrdiniInputScatta" style="display: none;" accept="image/*" capture="camera" onchange="checkImage(this,event)" multiple>
            <button class="bottom-control-bar-button" onclick="sincronizzaFotoOrdini()">
                <div><i class="fal fa-inbox-in"></i></div>
                <div><span>Aggiorna</span></div>
            </button>
        </div>-->
        <!--<input type="text" id="searcBarFotoOrdini" placeholder="Cerca ordine..." onkeyup="searchFotoOrdini(this.value.toLowerCase())">-->
        <div id="pathBarFotoOrdini">
            <i class="fas fa-folder"></i>
            <button onclick="getElencoFotoOrdini()">Ordini</button>
        </div>
        <div id="containerFotoOrdini"></div>

        
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

