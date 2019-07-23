<?php
	include "connessione.php";
	
	$stazione=$_REQUEST['stazione'];

	$query2="SELECT distinct [id_registrazione],[dataOra],[stazione],[utente],[ordine],CASE WHEN chiuso = 'true' THEN 'chiuso' ELSE 'aperto' END as stato  FROM [Cecklist].[dbo].[registrazioni_produzione] where stazione='$stazione' ORDER BY dataOra DESC";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$storicoOrdini="";
		while($row2=sqlsrv_fetch_array($result2))
		{
			$storicoOrdini=$storicoOrdini.$row2['ordine']." - ".$row2['stato']." - ".$row2['dataOra']->format('d/m/Y')."\n";
		}
		echo substr($storicoOrdini, 0, -1);
	}
?>