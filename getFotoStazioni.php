
<?php

	include "Session.php";
	include "connessione.php";
	
	$ordine=$_REQUEST['ordine'];
	
	$query2="SELECT DISTINCT dbo.registrazioni_produzione.ordine, dbo.registrazioni_produzione.stazione FROM dbo.allegati_registrazioni_produzione INNER JOIN dbo.registrazioni_produzione ON dbo.allegati_registrazioni_produzione.registrazione_produzione = dbo.registrazioni_produzione.id_registrazione WHERE ordine='$ordine'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo '<input type="search" id="searchInputRegistrazioniProduzione" class="searchInputRegistrazioniProduzione" placeholder="Cerca una stazione..." onkeyup="seacrhOrdine()" />';
		echo '<div class="explorerCommandBar">';
			echo '<button class="containerIconExplorerCommandBar" onclick="getFotoOrdini()"><i class="far fa-long-arrow-left"></i></button>';
			echo '<button class="containerIconDisabledExplorerCommandBar"><i style="color:#fee799;text-shadow: 0px 2px 3px rgba(0,0,0,0.4),0px 4px 7px rgba(0,0,0,0.1),0px 9px 12px rgba(0,0,0,0.1);" class="fas fa-folder"></i></button>';
			echo '<button class="containerTextExplorerCommandBar" onclick="getFotoOrdini()">FotoProduzioneAndroid</button>';
			echo '<button class="containerIconDisabledExplorerCommandBar">></button>';
			echo '<button class="containerTextExplorerCommandBar">'.$ordine.'</button>';
		echo '</div>';
		while($row2=sqlsrv_fetch_array($result2))
		{
			echo "<div class='folderOrdine' onclick='getFotoImmagini(".htmlspecialchars(json_encode($row2['ordine'])).",".htmlspecialchars(json_encode($row2['stazione'])).")'><i class='fas fa-folder folderImg'></i><br><div class='folderText'>".$row2['stazione']."</div></div>";
		}
	}
	
?>