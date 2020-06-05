<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Cloud Foto";
?>
<html>
	<head>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
		<title><?php echo $pageName; ?></title>
		<script src="js_libraries/spinnersV2/spinners.js"></script>
		<link rel="stylesheet" href="js_libraries/spinnersV2/spinners.css" />
		<link rel="stylesheet" href="css/styleV35.css" />
		<link rel="stylesheet" href="css/cloudFoto.css" />
		<script src="struttura.js"></script>
		<script src="js/cloudFoto.js"></script>
	</head>
	<body onload="onloadcloudFoto()">
		<?php include('struttura.php'); ?>
		<!--<div class="bottom-control-bar">
            <button class="bottom-control-bar-button" onclick="cloudFotoIndietro()" style="width:33%;align-items:center;justify-content:center">
            <div><i class="fal fa-long-arrow-left"></i></div>
            <div><span>Indietro</span></div>
            </button>
            <button class="bottom-control-bar-button" onclick="nuovaCarella()" style="width:33%;align-items:center;justify-content:center">
                <div><i class="fal fa-folder-plus"></i></div>
                <div><span>Nuova cartella</span></div>
            </button>
            <button class="bottom-control-bar-button" onclick="document.getElementById('cloudFotoInputScatta').click()" style="width:33%;align-items:center;justify-content:center">
                <div><i class="fal fa-camera-alt"></i></div>
                <div><span>Carica foto</span></div>
            </button>
            <input type="file" id="cloudFotoInputScatta" style="display: none;" accept="image/*" onchange="checkImage(this,event)" multiple>
        </div>-->
        <div class="reusable-control-bar" id="actionBarCloudFoto">
            <input type="search" id="searcBarCloudFoto" placeholder="Cerca..." class="rcb-input" onkeyup="searchCloudFoto(this.value.toLowerCase())">
			<button class="rcb-button-text-icon" onclick="nuovaCarella()">
				<span>Nuova cartella</span>
				<i class="fad fa-folder-plus" style="margin-left:5px"></i>
			</button>
			<button class="rcb-button-text-icon" onclick="document.getElementById('cloudFotoInputScatta').click()">
				<span>Carica foto</span>
				<i class="fad fa-camera-alt" style="margin-left:5px"></i>
			</button>
            <input type="file" id="cloudFotoInputScatta" style="display: none;" accept="image/*" onchange="checkImage(this,event)" multiple>
		</div>
        <div id="pathBarCloudFoto">
            <i class="fas fa-folder"></i>
            <div id="innerPathBarCloudFoto"></div>
        </div>
        <div id="containerCloudFoto"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

