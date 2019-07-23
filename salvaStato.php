<?php
	include "session.php";
	include "connessione.php";
		
	$stazione=$_REQUEST['stazione'];
	$nomeSalvataggio=$_REQUEST['nomeSalvataggio'];
		
	if($stazione=="Punto punto")
		salvaPuntoPunto($conn,$nomeSalvataggio);
	if($stazione=="Verniciatura")
		salvaVerniciatura($conn,$nomeSalvataggio);
	if($stazione=="Montaggio")
		salvaMontaggio($conn,$nomeSalvataggio);
	
	function salvaPuntoPunto($conn,$nomeSalvataggio)
	{
		$dataOra = date('m-d-Y h:i:s', time());
		$q="INSERT INTO [dbo].[stato_punto_punto]
		   ([id_gestione_punto_punto]
		   ,[docnum]
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
		   ,[sigla],[nomeSalvataggio],[dataSalvataggio],utenteSalvataggio) SELECT [id_gestione_punto_punto]
		   ,[docnum]
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
		   ,[sigla],'$nomeSalvataggio',getdate(),'".getIdUtente($conn,$_SESSION['Username'])."' FROM gestione_punto_punto";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "ok";
		}
	}
	function salvaVerniciatura($conn,$nomeSalvataggio)
	{
		$dataOra = date('m-d-Y h:i:s', time());
		$q="INSERT INTO [dbo].[stato_verniciatura]
		   ([id_gestione_verniciatura]
		   ,[docnum]
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
		   ,[sigla],[nomeSalvataggio],[dataSalvataggio],utenteSalvataggio) SELECT [id_gestione_verniciatura]
		   ,[docnum]
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
		   ,[sigla],'$nomeSalvataggio',getdate(),'".getIdUtente($conn,$_SESSION['Username'])."' FROM gestione_verniciatura";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "ok";
		}
	}
	function salvaMontaggio($conn,$nomeSalvataggio)
	{
		$dataOra = date('m-d-Y h:i:s', time());
		$q="INSERT INTO [dbo].[stato_montaggio]
		   ([id_gestione_montaggio]
		   ,[docnum]
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
		   ,[sigla],[nomeSalvataggio],[dataSalvataggio],utenteSalvataggio) SELECT [id_gestione_montaggio]
		   ,[docnum]
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
		   ,[sigla],'$nomeSalvataggio',getdate(),'".getIdUtente($conn,$_SESSION['Username'])."' FROM gestione_montaggio";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "ok";
		}
	}
	function getIdUtente($conn,$username)
	{
		$query2="SELECT id_utente FROM utenti WHERE username='$username'";		
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
				return $row2['id_utente'];
			}
		}
	}
?>