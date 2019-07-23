<?php
/*include "connessione.php";

	$ordineForDati=$_REQUEST['ordineForDati'];
	
	$query2="select DISTINCT TOP(1) Dscription AS descrizione,N_Pick AS nPick,DescrPick AS descrizionePick,CONVERT(date,DataConsegna) AS dataConsegna,CardName AS cliente,OrderNum AS ordine from Q_Picking_04 WHERE OrderNum='".$ordineForDati."'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row2=sqlsrv_fetch_array($result2))
		{
			echo $row2['nPick']."|".$row2['descrizionePick']."|".$row2['descrizione']."|".$row2['cliente']."|".$row2['dataConsegna']->format('d/m/Y');
		}
	}*/
	include "connessione.php";

	$ordineForDati=$_REQUEST['ordineForDati'];
	
	$query2="SELECT TOP(1) cliente FROM dbo.info_ordine1 where ordine='$ordineForDati'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row2=sqlsrv_fetch_array($result2))
		{
			echo $row2['cliente']."|";
		}
	}
	$query3="SELECT MAX(dbo.registrazioni_produzione.dataOra) AS dataOra, dbo.registrazioni_produzione.stazione, 
			MAX(CASE WHEN chiuso = 'true' THEN 'chiuso' ELSE 'aperto' END) AS stato, dbo.utenti.username
			FROM dbo.registrazioni_produzione INNER JOIN
			dbo.utenti ON dbo.registrazioni_produzione.utente = dbo.utenti.id_utente
			GROUP BY dbo.registrazioni_produzione.stazione, dbo.utenti.username, dbo.registrazioni_produzione.ordine
			HAVING (dbo.registrazioni_produzione.ordine = '$ordineForDati')";	
	$result3=sqlsrv_query($conn,$query3);
	if($result3==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$storiaOrdine='';
		while($row3=sqlsrv_fetch_array($result3))
		{
			$storiaOrdine=$storiaOrdine.$row3['dataOra']->format('d/m/Y')." - ".$row3['stazione']." - ".$row3['stato']." - ".$row3['username']."\n";
		}
		echo substr($storiaOrdine, 0, -1);
	}
?>