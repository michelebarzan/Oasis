<?php
	include "connessione.php";
	//include "Session.php";

	if(set_time_limit(120))
	{
		svuotaPtoPto($conn);
		riempiPtoPto($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	
	
	function svuotaPtoPto($conn)
	{
		$query="DELETE gestione_punto_punto FROM gestione_punto_punto";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiPtoPto($conn)
	{
		$query="INSERT INTO [dbo].[gestione_punto_punto]
           ([docnum]
           ,[stazione]
           ,[totale_pezzi]
           ,[basi_portalavabo]
           ,[colonne]
           ,[pensili]
           ,[basi_accostabili]
           ,[Altro]
           ,[mq]
           ,[settimana]
           ,[dataConsegna]
           ,[collezione]
           ,[sigla])
     SELECT DISTINCT * FROM dettaglioPtoPto_2";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
?>