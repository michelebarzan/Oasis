<?php
	include "connessione.php";
	$q = $_REQUEST["id_picking"];
	
	$q2="SELECT docNum,lineNum,n_Pick,dscription FROM T_Picking_01 WHERE id_picking = $q";
	$r2=sqlsrv_query($conn,$q2);
	if($r2==FALSE)
	{
		echo "Errore esecuzione query. Query: ".$q2.". Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row=sqlsrv_fetch_array($r2))
		{
			$docNum=$row['docNum'];
			$lineNum=$row['lineNum'];
			$n_Pick=$row['n_Pick'];
			$dscription=$row['dscription'];
		}
		$q3="INSERT INTO colli_eliminati (docNum,lineNum,n_Pick,dscription) VALUES ($docNum,$lineNum,$n_Pick,'$dscription')";
		$r3=sqlsrv_query($conn,$q3);
		if($r3==FALSE)
		{
			echo "Errore esecuzione query. Query: ".$q3.". Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	
		$query2="DELETE T_Picking_01 FROM T_Picking_01 WHERE T_Picking_01.id_picking = $q";
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "Errore eliminazione riga";
		}
	}
	echo "Riga eliminata";
	
?>