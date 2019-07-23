<?php
	include "Session.php";

	include "connessione.php";
						
	if($conn)
	{
		
		$peso=NULL;
		$lunghezza=NULL;
		$larghezza=NULL;
		$altezza=NULL;
		$note=NULL;
		
		$id_bancale=$_POST['id_bancale'];
		if(isset($_POST['peso']))
			$peso=$_POST['peso'];
		if(isset($_POST['lunghezza']))
			$lunghezza=$_POST['lunghezza'];
		if(isset($_POST['larghezza']))
			$larghezza=$_POST['larghezza'];
		if(isset($_POST['altezza']))
			$altezza=$_POST['altezza'];
		if(isset($_POST['note']))
			$note=$_POST['note'];
		
		/*echo "<br>ID: ".$id_bancale;
		echo "<br>Peso: ".$peso;
		echo "<br>Lungh: ".$lunghezza;
		echo "<br>Largh: ".$larghezza;
		echo "<br>Alt: ".$altezza;
		echo "<br>Note: ".$note;*/
		
		$q="UPDATE bancali SET bancali.peso='$peso', bancali.lunghezza='$lunghezza', bancali.larghezza='$larghezza', bancali.altezza='$altezza', bancali.note='$note' WHERE bancali.id_bancale=$id_bancale ";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
			echo "<script>window.location = 'pesiEvolumi.php' </script>";
	}
	else
	{
		echo "Connessione fallita";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	
	
?>