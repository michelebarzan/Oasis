
<?php

	include "Session.php";
	include "connessione.php";
	
	$query2="SELECT DISTINCT dbo.registrazioni_produzione.ordine FROM dbo.allegati_registrazioni_produzione INNER JOIN dbo.registrazioni_produzione ON dbo.allegati_registrazioni_produzione.registrazione_produzione = dbo.registrazioni_produzione.id_registrazione";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo '<input type="search" id="searchInputRegistrazioniProduzione" class="searchInputRegistrazioniProduzione" placeholder="Cerca un ordine..." onkeyup="seacrhOrdine()" />';
		echo '<div class="explorerCommandBar">';
			echo '<button class="containerIconExplorerCommandBar"><i class="far fa-long-arrow-left"></i></button>';
			echo '<button class="containerIconDisabledExplorerCommandBar"><i style="color:#fee799;text-shadow: 0px 2px 3px rgba(0,0,0,0.4),0px 4px 7px rgba(0,0,0,0.1),0px 9px 12px rgba(0,0,0,0.1);" class="fas fa-folder"></i></button>';
			echo '<button class="containerTextExplorerCommandBar">FotoProduzioneAndroid</button>';
		echo '</div>';
		while($row2=sqlsrv_fetch_array($result2))
		{
			echo "<div class='folderOrdine' onclick='getFotoStazioni(".htmlspecialchars(json_encode($row2['ordine'])).")'><i class='fas fa-folder folderImg'></i><br><div class='folderText'>".$row2['ordine']."</div></div>";
		}
	}
	
?>