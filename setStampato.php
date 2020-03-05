<?php
	include "session.php";
	include "connessione.php";
	
	$N_Pick=$_REQUEST['N_Pick'];
	$stampato=$_REQUEST['stampato'];
	
	$q="UPDATE T_Picking_01 SET stampato='$stampato',data_stampa_cecklist=getdate(),utente_stampa_checklist=".$_SESSION['id_utente']." WHERE N_Pick=$N_Pick";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
		echo "ok";
?>