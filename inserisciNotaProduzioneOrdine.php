<?php

	include "connessione.php";

	$ordine=$_REQUEST['ordine'];
	$nota=$_REQUEST['nota'];
	$username=$_REQUEST['username'];
	
	$query2="SELECT * FROM note_registrazioni_produzione where ordine='$ordine'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		die ("error");
	}
	else
	{
		$rows = sqlsrv_has_rows( $result2 );
		if ($rows === true)
		{
			$query3="UPDATE note_registrazioni_produzione SET testo='$nota' where ordine='$ordine'";	
			$result3=sqlsrv_query($conn,$query3);
			if($result3==FALSE)
			{
				die ("error");
			}
			else
			{
				echo "ok";
			}
		}
		else 
		{
			$query3="INSERT note_registrazioni_produzione (testo,utente,dataOra,ordine) VALUES ('$nota',".getIdUtente($conn,$username).",getdate(),'$ordine')";	
			$result3=sqlsrv_query($conn,$query3);
			if($result3==FALSE)
			{
				die ("error");
			}
			else
			{
				echo "ok";
			}
		}
	}
	function getIdUtente($conn,$username)
	{
		$q="SELECT id_utente FROM utenti WHERE username='$username'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($r))
			{
				return $row['id_utente'];
			}
		}
	}
?>