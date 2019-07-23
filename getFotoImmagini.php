
<?php

	include "Session.php";
	include "connessione.php";
	
	$ordine=$_REQUEST['ordine'];
	$stazione=$_REQUEST['stazione'];
	
	$query2="SELECT DISTINCT dbo.registrazioni_produzione.ordine, dbo.registrazioni_produzione.stazione, REPLACE(REPLACE(dbo.allegati_registrazioni_produzione.percorso, '+', ''), '//srv-01/Produzione/', '') AS percorso FROM dbo.allegati_registrazioni_produzione INNER JOIN dbo.registrazioni_produzione ON dbo.allegati_registrazioni_produzione.registrazione_produzione = dbo.registrazioni_produzione.id_registrazione WHERE ordine='$ordine' AND stazione='$stazione'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo '<input type="search" id="searchInputRegistrazioniProduzione" class="searchInputRegistrazioniProduzione" placeholder="Cerca un’ immagine..." onkeyup="seacrhImmagine()" />';
		echo '<div class="explorerCommandBar">';
			echo '<button class="containerIconExplorerCommandBar" onclick="getFotoStazioni('.htmlspecialchars(json_encode($ordine)).')"><i class="far fa-long-arrow-left"></i></button>';
			echo '<button class="containerIconDisabledExplorerCommandBar"><i style="color:#fee799;text-shadow: 0px 2px 3px rgba(0,0,0,0.4),0px 4px 7px rgba(0,0,0,0.1),0px 9px 12px rgba(0,0,0,0.1);" class="fas fa-folder"></i></button>';
			echo '<button class="containerTextExplorerCommandBar" onclick="getFotoOrdini()">FotoProduzioneAndroid</button>';
			echo '<button class="containerIconDisabledExplorerCommandBar">></button>';
			echo '<button class="containerTextExplorerCommandBar" onclick="getFotoStazioni('.htmlspecialchars(json_encode($ordine)).')">'.$ordine.'</button>';
			echo '<button class="containerIconDisabledExplorerCommandBar">></button>';
			echo '<button class="containerTextExplorerCommandBar">'.$stazione.'</button>';
		echo '</div>';
		while($row2=sqlsrv_fetch_array($result2))
		{
			$nomeFile=str_replace("FotoProduzioneAndroid/".$ordine."/".$stazione."/","",$row2['percorso']);
			echo "<div class='imgOrdiniContainer' >";
				echo "<div class='nomeImgOrdini'>$nomeFile</div>";
				echo "<img class='imgOrdini' src='".$row2['percorso']."' />";
			echo "</div>";
		}
	}
	
?>