<?php
	include "session.php";
	include "connessione.php";
		
	$docnum=$_REQUEST['docnum'];
	$weekDest=$_REQUEST['weekDest'];
	$weekStart=$_REQUEST['weekStart'];
	$anno=$_REQUEST['anno'];
	$annoPrecedente=$anno-1;
	$annoSuccessivo=$anno+1;
	
	$weekMon=$weekDest;
	$weekMon=str_pad($weekMon,2,"0",STR_PAD_LEFT);
	/* Begin the transaction. */
	if ( sqlsrv_begin_transaction( $conn ) === false ) 
	{
		die( print_r( sqlsrv_errors(), true ));
	}

	/* Initialize parameter values. */
	$stmt1=false;
	$stmt2=false;
	$stmt3=false;
	$stmt4=false;
	$stmt5=false;
	$stmt6=false;
	$stmt7=false;
	$stmt8=false;
	$stmt9=false;
	$stmt10=false;
	$errore=0;
	
	$tipoMontaggio=getTipoMontaggio($conn,$docnum,$stmt1);

	$q="SELECT * FROM Settimane WHERE Tipo_mont='$tipoMontaggio'";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		$errore=1;
	}
	else
	{
		$rows = sqlsrv_has_rows( $r );  
		if ($rows === true)  
		{		
			while($row=sqlsrv_fetch_array($r))
			{
				$weekVer=$weekMon-$row['Verniciatura'];
				$weekVer=str_pad($weekVer,2,"0",STR_PAD_LEFT);
				$weekPto=$weekVer-$row['Punto-Punto'];
				$weekPto=str_pad($weekPto,2,"0",STR_PAD_LEFT);
				if($weekPto<=0)
					$weekPto=$annoPrecedente."52";
				else
					$weekPto=$anno.$weekPto;
				
				if($weekMon>=53)
					$weekMon=$annoSuccessivo.($weekMon-52);
				else
					$weekMon=$anno.$weekMon;
				
				$weekVer=$anno.$weekVer;
					
			}
			
			$UDF1 = getData1($conn,$weekPto,$stmt2)->format('d/m/Y');
			$UDF2 = getData2($conn,$weekVer,$stmt3)->format('d/m/Y');
			$UDF3 = getData3($conn,$weekMon,$stmt4)->format('d/m/Y');		
			
			if($weekStart>$weekDest)
			{
				updateTabellaPto($conn,$weekPto,$docnum,$stmt5);
				updateSapPto($conn,$UDF1,$docnum,$stmt6);
				updateTabellaVer($conn,$weekVer,$docnum,$stmt7);
				updateSapVer($conn,$UDF2,$docnum,$stmt8);
			}
			else
			{
				$stmt5=true;
				$stmt6=true;
				$stmt7=true;
				$stmt8=true;
			}
			updateTabellaMon($conn,$weekMon,$docnum,$stmt9);
			updateSapMon($conn,$UDF3,$docnum,$stmt10);
		}
		else
		{
			$errore=1;
		}
	}

	/* If both queries were successful, commit the transaction. */
	/* Otherwise, rollback the transaction. */
	if( $r && $stmt1 && $stmt2 && $stmt3 && $stmt4 && $stmt5 && $stmt6 && $stmt7 && $stmt8 && $stmt9 && $stmt10 && $errore==0) 
	{
		sqlsrv_commit( $conn );
		echo "ok";
	} 
	else 
	{
		sqlsrv_rollback( $conn );
		echo "Errore";
	}
		
	
	
	
	function updateSapPto($conn,$UDF1,$docnum,&$stmt6)
	{
		$query2="UPDATE [Oasis_Live].[dbo].[BEAS_FTHAUPT] SET UDF1='$UDF1' WHERE AUFTRAGINT=$docnum";
		$stmt6=sqlsrv_query($conn,$query2);
	}
	function updateSapVer($conn,$UDF2,$docnum,&$stmt8)
	{
		$query2="UPDATE [Oasis_Live].[dbo].[BEAS_FTHAUPT] SET UDF2='$UDF2' WHERE AUFTRAGINT=$docnum";
		$stmt8=sqlsrv_query($conn,$query2);
	}
	function updateSapMon($conn,$UDF3,$docnum,&$stmt10)
	{
		$query2="UPDATE [Oasis_Live].[dbo].[BEAS_FTHAUPT] SET UDF3='$UDF3' WHERE AUFTRAGINT=$docnum";
		$stmt10=sqlsrv_query($conn,$query2);
	}
	function getData1($conn,$week,&$stmt2)
	{
		$q="SELECT lunedi FROM lunediSettimane WHERE settimana='$week'";
		$stmt2=sqlsrv_query($conn,$q);
		if($stmt2!=FALSE)
		{
			while($row=sqlsrv_fetch_array($stmt2))
			{
				return $row['lunedi'];
			}
		}
	}
	function getData2($conn,$week,&$stmt3)
	{
		$q="SELECT lunedi FROM lunediSettimane WHERE settimana='$week'";
		$stmt3=sqlsrv_query($conn,$q);
		if($stmt3!=FALSE)
		{
			while($row=sqlsrv_fetch_array($stmt3))
			{
				return $row['lunedi'];
			}
		}
	}
	function getData3($conn,$week,&$stmt4)
	{
		$q="SELECT lunedi FROM lunediSettimane WHERE settimana='$week'";
		$stmt4=sqlsrv_query($conn,$q);
		if($stmt4!=FALSE)
		{
			while($row=sqlsrv_fetch_array($stmt4))
			{
				return $row['lunedi'];
			}
		}
	}
	function getTipoMontaggio($conn,$docnum,&$stmt1)
	{
		$q="SELECT montaggio FROM montaggioOrdini WHERE docnum='$docnum'";
		$stmt1=sqlsrv_query($conn,$q);
		if($stmt1!=FALSE)
		{
			while($row=sqlsrv_fetch_array($stmt1))
			{
				return $row['montaggio'];
			}
		}
	}
	function updateTabellaPto($conn,$weekPto,$docnum,&$stmt5)
	{
		$q="UPDATE gestione_punto_punto SET settimana=$weekPto WHERE docnum='$docnum'";
		$stmt5=sqlsrv_query($conn,$q);
	}
	function updateTabellaVer($conn,$weekVer,$docnum,&$stmt7)
	{
		$q="UPDATE gestione_verniciatura SET settimana=$weekVer WHERE docnum='$docnum'";
		$stmt7=sqlsrv_query($conn,$q);
	}
	function updateTabellaMon($conn,$weekMon,$docnum,&$stmt9)
	{
		$q="UPDATE gestione_montaggio SET settimana=$weekMon WHERE docnum='$docnum'";
		$stmt9=sqlsrv_query($conn,$q);
	}
?>