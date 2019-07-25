<?php
	include "connessione.php";
	//include "Session.php";

	if(set_time_limit(120))
	{
		svuotaPtoPto($conn);
		riempiPtoPto($conn);
		addOrder($conn);
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
     SELECT DISTINCT * FROM dettaglioPtoPto_2  OPTION ( QUERYTRACEON 9481 )";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	function addOrder($conn)
	{
		$query="SELECT DISTINCT settimana FROM [dbo].[gestione_punto_punto]";
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
				$query2="SELECT id_gestione_punto_punto FROM [dbo].[gestione_punto_punto] WHERE settimana='$settimana'";
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
						$id_gestione_punto_punto=$row2['id_gestione_punto_punto'];
						updateId($conn,$id_gestione_punto_punto,$n);
						$n++;
					}
				}
			}
		}
	} 
	function updateId($conn,$id_gestione_punto_punto,$n)
	{
		$query="UPDATE [dbo].[gestione_punto_punto] SET posizione=$n WHERE id_gestione_punto_punto=$id_gestione_punto_punto";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
?>