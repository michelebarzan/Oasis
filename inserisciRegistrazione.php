<?php
	include "connessione.php";

	$stazione=$_REQUEST['stazione'];
	$ordine=$_REQUEST['ordine'];
	$chiudi=$_REQUEST['chiudi'];
	$username=$_REQUEST['username'];
	$fileNameList=$_REQUEST['fileNameList'];
	$codiceNonPresente=$_REQUEST['codiceNonPresente'];
	$codiceNonPresente='false';
	
	$query2="INSERT INTO [dbo].[registrazioni_produzione] ([dataOra],[stazione],[utente],[ordine],[chiuso],[codiceNonPresente]) SELECT getDate(),'".$stazione."',utenti.id_utente,'".$ordine."','".$chiudi."','$codiceNonPresente' FROM utenti WHERE username='".$username."'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		if($fileNameList!='vuoto')
		{
			$query3="SELECT MAX(id_registrazione) AS id_registrazione FROM [dbo].[registrazioni_produzione],utenti WHERE [dbo].[registrazioni_produzione].utente=utenti.id_utente AND utenti.username='".$username."'";	
			$result3=sqlsrv_query($conn,$query3);
			if($result3==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
			else
			{
				while($row3=sqlsrv_fetch_array($result3))
				{
					$id_registrazione=$row3['id_registrazione'];
				}
				foreach($fileNameList as $item) 
				{
					$query4="INSERT INTO [dbo].[allegati_registrazioni_produzione] ([percorso],[registrazione_produzione]) VALUES ('//srv-dati/Produzione/FotoProduzioneAndroid/".$ordine."/+".$stazione."/".$item."',".$id_registrazione.")";	
					$result4=sqlsrv_query($conn,$query4);
					if($result4==FALSE)
					{
						echo "<br><br>Errore esecuzione query<br>Query: ".$query4."<br>Errore: ";
						die(print_r(sqlsrv_errors(),TRUE));
					}
				}
			}
		}
	}
	echo "ok";
?>