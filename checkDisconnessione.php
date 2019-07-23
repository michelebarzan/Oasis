<?php
	include "session.php";
	include "connessione.php";
		
	$username=$_SESSION['Username'];
		
	$q="SELECT * FROM tmpGestione WHERE username='$username'";
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
		{
			echo "ok";
		}
		else
		{
			echo "Stai per essere disconnesso forzatamente";
		}
	}
?>