<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Presenze";
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Presenze</title>

        <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
        <link href="css_libraries/fontawesome/css/all.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <script src="js/presenze.js"></script>
        <script src="struttura.js"></script>
        <link rel="stylesheet" href="css/presenze.css">
    </head>
    <body onload="onloadpresenze()">
        <div style="height:50px;width:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;background-color:#404040">
            <span style="font-family:'Quicksand',sans-serif;color:white;font-size:14px;margin-left:15px">Presenze</span>
        </div>
        <div class="bottom-control-bar" style="background-color: #404040;height:50px">
            <button class="bottom-control-bar-button" onclick="getPopupNuovaRegistrazione()" style="font-size:12px;color:#ddd;height:50px">
                <div><i class="fad fa-calendar-plus"></i></div>
                <div><span style="font-weight:normal">Nuova registrazione</span></div>
            </button>
            <button class="bottom-control-bar-button" onclick="getPopupChiudiRegistrazione()" style="font-size:12px;color:#ddd;height:50px">
                <div><i class="fad fa-calendar-check"></i></div>
                <div><span style="font-weight:normal">Chiudi registrazione</span></div>
            </button>
        </div>
        <div id="containerRegistrazioneOre">
            <?php echo $_SESSION["id_utente"]; ?>
        </div>
    </body>
</html>