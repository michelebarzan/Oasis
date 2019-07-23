<?php
	include "session.php";
	include "connessione.php";
	$id_bancale=$_POST['id_bancale'];
	if(isset($_POST['cancellaPeso']))
	{
		$q="UPDATE bancali SET peso=0 WHERE id_bancale=$id_bancale";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "<script>window.location = 'pesiEvolumi.php' </script>";
		}
	}
	if(isset($_POST['cancellaLunghezza']))
	{
		$q="UPDATE bancali SET lunghezza=0 WHERE id_bancale=$id_bancale";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "<script>window.location = 'pesiEvolumi.php' </script>";
		}
	}
	if(isset($_POST['cancellaLarghezza']))
	{
		$q="UPDATE bancali SET larghezza=0 WHERE id_bancale=$id_bancale";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "<script>window.location = 'pesiEvolumi.php' </script>";
		}
	}
	if(isset($_POST['cancellaAltezza']))
	{
		$q="UPDATE bancali SET altezza=0 WHERE id_bancale=$id_bancale";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "<script>window.location = 'pesiEvolumi.php' </script>";
		}
	}
	if(isset($_POST['cancellaNote']))
	{
		$q="UPDATE bancali SET note='' WHERE id_bancale=$id_bancale";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "<script>window.location = 'pesiEvolumi.php' </script>";
		}
	}
?>