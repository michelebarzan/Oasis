<?php
	include "session.php";
	include "connessione.php";
	$N_Pick=$_SESSION['N_Pick'];
	$q="SELECT id_bancale FROM bancali WHERE n_Pick=$N_Pick";
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
			$q2="UPDATE bancali SET peso = (SELECT SUM(pesoLordo) FROM T_Picking_01 WHERE bancale=".$row['id_bancale']." ) WHERE peso='' AND id_bancale=".$row['id_bancale'];
			$r2=sqlsrv_query($conn,$q2);
			if($r2==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$q2."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
		}
	}
	echo "<script>window.location = 'pesiEvolumi.php' </script>";
?>