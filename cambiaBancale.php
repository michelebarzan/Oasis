<?php
	include "connessione.php";
	$id_bancale = $_REQUEST["id_bancale"];
	$id_picking = $_REQUEST["id_picking"];
	
	$query2="UPDATE T_Picking_01 SET bancale=$id_bancale WHERE T_Picking_01.id_picking = $id_picking";
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "Errore";
	}
?>