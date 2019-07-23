<?php

	include "Session.php";
	include "connessione.php";
	
	$stazione=$_REQUEST['stazione'];
	$weeksString=$_REQUEST['weeks'];
	$capacitaQntString=$_REQUEST['capacitaQnt'];
	
	$weeks=explode(",",$weeksString);
	$capacitaQnt=explode(",",$capacitaQntString);
		
	$percentuali=array();
	$capacitaMaxArray=array();
	$i=0;
	
	while($i<count($capacitaQnt))
	{
		$capacitaMax=getCapacitaMax($conn,$weeks[$i],$stazione);
		array_push($capacitaMaxArray,$capacitaMax);
		if($capacitaMax!=0)
		{
			$percentuale=($capacitaQnt[$i]*100)/$capacitaMax;
			if($percentuale>100)
				$percentuale=100;
		}
		else
			$percentuale=0;
		array_push($percentuali,intval($percentuale));
		$i++;
	}
	
	echo implode("|",$percentuali);
	echo "£";
	echo implode("|",$capacitaMaxArray);
	
	function getCapacitaMax($conn,$week,$stazione)
	{
		$query2="SELECT capacita FROM capacita_produttiva WHERE settimana=$week AND stazione='$stazione'";	
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows = sqlsrv_has_rows( $result2 );
			if ($rows === true)
			{
				while($row2=sqlsrv_fetch_array($result2))
				{
					return $row2['capacita'];
				}
			}
			else
				return 0;
		}
	}
	
?>