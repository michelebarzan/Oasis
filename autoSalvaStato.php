<?php
	include "session.php";
	include "connessione.php";
		
	$stazione=$_REQUEST['stazione'];
	$stazioneVisualizzata=$_REQUEST['stazioneVisualizzata'];
	$week=$_REQUEST['week'];
	
	$nomeSalvataggio="autosalvataggio_".$week;
		
	if($stazioneVisualizzata=="Punto punto")
	{
		svuotaPuntoPunto($conn,$nomeSalvataggio,$stazione,$week);
		salvaPuntoPunto($conn,$nomeSalvataggio,$stazione);
	}
	if($stazioneVisualizzata=="Verniciatura")
	{
		svuotaVerniciatura($conn,$nomeSalvataggio,$stazione,$week);
		salvaVerniciatura($conn,$nomeSalvataggio,$stazione);
	}
	if($stazioneVisualizzata=="Montaggio")
	{
		svuotaMontaggio($conn,$nomeSalvataggio,$stazione,$week);
		salvaMontaggio($conn,$nomeSalvataggio,$stazione);
	}
	
	function svuotaPuntoPunto($conn,$nomeSalvataggio,$stazione,$week)
	{
		$q="DELETE FROM [dbo].[stato_punto_punto] WHERE nomeSalvataggio='$nomeSalvataggio' AND stazione='$stazione'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			die("error");
		}
	}
	function svuotaVerniciatura($conn,$nomeSalvataggio,$stazione,$week)
	{
		$q="DELETE FROM [dbo].[stato_verniciatura] WHERE nomeSalvataggio='$nomeSalvataggio' AND stazione='$stazione'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			die("error");
		}
	}
	function svuotaMontaggio($conn,$nomeSalvataggio,$stazione,$week)
	{
		$q="DELETE FROM [dbo].[stato_montaggio] WHERE nomeSalvataggio='$nomeSalvataggio' AND stazione='$stazione'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			die("error");
		}
	}
	function salvaPuntoPunto($conn,$nomeSalvataggio,$stazione)
	{
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
		   ,[sigla],'$nomeSalvataggio',getdate(),'".getIdUtente($conn,$_SESSION['Username'])."' FROM gestione_punto_punto WHERE stazione='$stazione'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			die("error");
		}
		else
		{
			echo "ok";
		}
	}
	function salvaVerniciatura($conn,$nomeSalvataggio,$stazione)
	{
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
		   ,[sigla],'$nomeSalvataggio',getdate(),'".getIdUtente($conn,$_SESSION['Username'])."' FROM gestione_verniciatura WHERE stazione='$stazione'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			die("error");
		}
		else
		{
			echo "ok";
		}
	}
	function salvaMontaggio($conn,$nomeSalvataggio,$stazione)
	{
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
		   ,[sigla],'$nomeSalvataggio',getdate(),'".getIdUtente($conn,$_SESSION['Username'])."' FROM gestione_montaggio WHERE stazione='$stazione'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			die("error");
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
			die("error");
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