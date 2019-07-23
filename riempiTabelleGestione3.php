<?php
	include "connessione.php";
	//include "Session.php";

	if(set_time_limit(120))
	{
		svuotaVerniciatura($conn);
		riempiVerniciatura($conn);
		addOrder($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	
	
	function svuotaVerniciatura($conn)
	{
		$query="DELETE gestione_verniciatura FROM gestione_verniciatura";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	
	function riempiVerniciatura($conn)
	{
		$query="INSERT INTO [dbo].[gestione_verniciatura]
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
           ,[sigla]) SELECT DISTINCT * FROM dettaglioVer_2";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	function addOrder($conn)
	{
		$query="SELECT DISTINCT settimana FROM [dbo].[gestione_verniciatura]";
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
				$query2="SELECT id_gestione_verniciatura FROM [dbo].[gestione_verniciatura] WHERE settimana='$settimana'";
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
						$id_gestione_verniciatura=$row2['id_gestione_verniciatura'];
						updateId($conn,$id_gestione_verniciatura,$n);
						$n++;
					}
				}
			}
		}
	} 
	function updateId($conn,$id_gestione_verniciatura,$n)
	{
		$query="UPDATE [dbo].[gestione_verniciatura] SET posizione=$n WHERE id_gestione_verniciatura=$id_gestione_verniciatura";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
?>