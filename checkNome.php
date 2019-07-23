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
		$q="SELECT * FROM stato_punto_punto WHERE nomeSalvataggio='$nomeSalvataggio'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows = sqlsrv_has_rows( $r );
			if ($rows === true)
				echo "errore";
			else 
				echo "ok";
		}
	}
	function salvaVerniciatura($conn,$nomeSalvataggio)
	{
		$q="SELECT * FROM stato_verniciatura WHERE nomeSalvataggio='$nomeSalvataggio'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows = sqlsrv_has_rows( $r );
			if ($rows === true)
				echo "errore";
			else 
				echo "ok";
		}
	}
	function salvaMontaggio($conn,$nomeSalvataggio)
	{
		$q="SELECT * FROM stato_montaggio WHERE nomeSalvataggio='$nomeSalvataggio'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows = sqlsrv_has_rows( $r );
			if ($rows === true)
				echo "errore";
			else 
				echo "ok";
		}
	}
	
?>