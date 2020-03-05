<?php
	include "session.php";
	include "connessione.php";
	
	$N_Pick=$_REQUEST['N_Pick'];
	$controllato=$_REQUEST['controllato'];
	$docNum=$_REQUEST['docNum'];
	
	if($controllato=="true")
		$q="UPDATE T_Picking_01 SET controllato='$controllato',utenteControllato=".$_SESSION['id_utente'].",dataControllato=GETDATE() WHERE N_Pick=$N_Pick AND docNum='$docNum'";
	else
		$q="UPDATE T_Picking_01 SET controllato='$controllato',utenteControllato=NULL,dataControllato=NULL WHERE N_Pick=$N_Pick AND docNum='$docNum'";
	//$q="UPDATE T_Picking_01 SET controllato='$controllato' WHERE N_Pick=$N_Pick AND docNum='$docNum'";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
		echo "ok";
?>