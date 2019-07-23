<?php

	include "connessione.php";
	include "Session.php";

	if(!$conn)
	{
		echo "Impossibile connettersi al database";
		die();
	}
	
	$elencoQuery=explode(",",$_REQUEST['query']);;
	
	$i=0;
	while($i<sizeof($elencoQuery))
	{
		$query2=$elencoQuery[$i];
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		$i++;
	}
	echo "ok";
	
?>