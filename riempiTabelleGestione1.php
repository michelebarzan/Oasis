<?php
	include "connessione.php";
	//include "Session.php";

	if(set_time_limit(240))
	{
		svuotaMontaggio($conn);
		riempiMontaggio($conn);
		addOrder($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	function svuotaMontaggio($conn)
	{
		$query="DELETE gestione_montaggio FROM gestione_montaggio";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiMontaggio($conn)
	{
		$query="INSERT INTO [dbo].[gestione_montaggio]
           ([docnum]
           ,[settimana]
           ,[stazione]
           ,[totale_pezzi]
           ,[basi_portalavabo]
           ,[colonne]
           ,[pensili]
           ,[basi_accostabili]
           ,[Altro]
           ,[dataConsegna]
           ,[collezione]
           ,[sigla]) SELECT DISTINCT * FROM dettaglioMon_2 OPTION ( QUERYTRACEON 9481 )";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	function addOrder($conn)
	{
		$query="SELECT DISTINCT settimana FROM [dbo].[gestione_montaggio]";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				$n=1;
				$settimana=$row['settimana'];
				$query2="SELECT id_gestione_montaggio FROM [dbo].[gestione_montaggio] WHERE settimana='$settimana'";
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
						$id_gestione_montaggio=$row2['id_gestione_montaggio'];
						updateId($conn,$id_gestione_montaggio,$n);
						$n++;
					}
				}
			}
		}
	} 
	function updateId($conn,$id_gestione_montaggio,$n)
	{
		$query="UPDATE [dbo].[gestione_montaggio] SET posizione=$n WHERE id_gestione_montaggio=$id_gestione_montaggio";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
?>