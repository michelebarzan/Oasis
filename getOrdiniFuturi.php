<?php
	include "connessione.php";

	$stazione=$_REQUEST['stazione'];
	$stazioneVisualizzata=$_REQUEST['stazioneVisualizzata'];
	$lastWeek=$_REQUEST['lastWeek'];
	
	if($stazioneVisualizzata=="Verniciatura")
	{
		$tabella="gestione_verniciatura";
	}
	if($stazioneVisualizzata=="Montaggio")
	{
		$tabella="gestione_montaggio";
	}
	if($stazioneVisualizzata=="Punto punto")
	{
		$tabella="gestione_punto_punto";
	}
	
	$query2="SELECT * FROM $tabella WHERE settimana>$lastWeek AND stazione='$stazione'";	
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
			echo "<option value='".$row2['docnum']."'>";
		}
	}
?>