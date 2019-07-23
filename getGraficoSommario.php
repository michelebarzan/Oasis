<?php
	
	include "Session.php";
	include "connessione.php";
	include "connessionePDO.php";
	
	$nomeSalvataggio=$_REQUEST['nomeSalvataggio'];
	$stazione=$_REQUEST['stazione'];
	$res=explode("|",$nomeSalvataggio);
	
	$stazioneVisualizzata=$res[0];
	$nomeSalvataggio=$res[1];
	
	if($stazioneVisualizzata=="P")
	{
		$stazioneVisualizzata="Punto punto";
		$tabellaSalvataggio="stato_punto_punto";
		$tabella="gestione_punto_punto";
		$grafico="graficoSommarioPuntoPunto";
	}
	if($stazioneVisualizzata=="V")
	{
		$stazioneVisualizzata="Verniciatura";
		$tabellaSalvataggio="stato_verniciatura";
		$tabella="gestione_verniciatura";
		$grafico="graficoSommarioVerniciatura";
	}
	if($stazioneVisualizzata=="M")
	{
		$stazioneVisualizzata="Montaggio";
		$tabellaSalvataggio="stato_montaggio";
		$tabella="gestione_montaggio";
		$grafico="graficoSommarioMontaggio";
	}
	
	$week = getWeek($conn,date('Y-m-d', time()));
	getOrdiniProdotti($conn,$tabella,$stazione,$week,$tabellaSalvataggio,$nomeSalvataggio);
	echo "%";
	getOrdiniAggiunti($conn,$tabella,$stazione,$week,$tabellaSalvataggio,$nomeSalvataggio);//V
	echo "%";
	getOrdiniNonProdotti($conn,$tabella,$stazione,$week,$tabellaSalvataggio,$nomeSalvataggio);
	
	
	
	//-------------------------------------------------------------------------------------------------------------------------------------------
	function getWeek($conn,$data)
	{
		$query="SELECT settimana FROM settimanaData WHERE data='$data'";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				return $row['settimana'];
			}
		}
	}
	
	function getOrdiniProdotti($conn,$tabella,$stazione,$week,$tabellaSalvataggio,$nomeSalvataggio)
	{
		$query2="SELECT COUNT(*) AS nOrdini FROM $tabellaSalvataggio
					WHERE (docnum NOT IN (SELECT docnum FROM $tabella WHERE (settimana = $week) AND stazione='$stazione')) 
					AND (settimana = $week) AND stazione='$stazione' AND nomeSalvataggio='$nomeSalvataggio'";
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows2 = sqlsrv_has_rows( $result2 );
			if ($rows2 === true)
			{
				while($row=sqlsrv_fetch_array($result2))
				{
					echo $week."|".$row['nOrdini'];
				}
			}
			else
				echo $week."|0";
		}
		
	}
	function getOrdiniAggiunti($conn,$tabella,$stazione,$week,$tabellaSalvataggio,$nomeSalvataggio)
	{
		$query2="SELECT COUNT(*) AS nOrdini FROM $tabella WHERE  settimana=$week AND stazione='$stazione' AND docnum NOT IN (SELECT docnum FROM $tabellaSalvataggio where settimana=$week AND stazione='$stazione')";		
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows2 = sqlsrv_has_rows( $result2 );
			if ($rows2 === true)
			{
				while($row=sqlsrv_fetch_array($result2))
				{
					echo $week."|".$row['nOrdini'];
				}
			}
			else
				echo $week."|0";
		}
	}
	function getOrdiniNonProdotti($conn,$tabella,$stazione,$week,$tabellaSalvataggio,$nomeSalvataggio)
	{
		$query2="SELECT COUNT(*) AS nOrdini FROM $tabella WHERE  settimana=$week AND stazione='$stazione' AND docnum IN (SELECT docnum FROM $tabellaSalvataggio where settimana=$week AND stazione='$stazione')";		
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows2 = sqlsrv_has_rows( $result2 );
			if ($rows2 === true)
			{
				while($row=sqlsrv_fetch_array($result2))
				{
					echo $week."|".$row['nOrdini'];
				}
			}
			else
				echo $week."|0";
		}
	}
	
	/*
	$query3="SELECT COUNT(*) AS nOrdini FROM $tabella WHERE  settimana=$week AND stazione='$stazione' AND docnum NOT IN (SELECT docnum FROM $tabellaSalvataggio where settimana=$week AND stazione='$stazione')";		
	$result3=sqlsrv_query($conn,$query3);
	if($result3==FALSE)
	{
		echo "Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row3=sqlsrv_fetch_array($result3))
		{
			$prodotti=$row3['nOrdini'];
			echo $week."|".$prodotti;
		}
	}*/
	/*$query="SELECT settimana AS x,nOrdini as y FROM $grafico WHERE settimana=$week AND nomeSalvataggio='$nomeSalvataggio' AND stazione='$stazione'";
	$result=sqlsrv_query($conn,$query);
	if($result==FALSE)
	{
		echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row=sqlsrv_fetch_array($result))
		{
			$nonProdotti=$row['y']-$prodotti;
			echo $row['x']."|".$nonProdotti;
		}
	}
	
	function getOrdiniAggiunti($conn,$tabella,$stazione,$week,$tabellaSalvataggio,$nomeSalvataggio)
	{
		$n=0;
		$query2="SELECT docnum FROM $tabellaSalvataggio WHERE nomeSalvataggio='$nomeSalvataggio' AND settimana='$week' AND stazione='$stazione'";		
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row2=sqlsrv_fetch_array($result2))
			{
				if(getStatoOrdine($conn,$row2['docnum'],$tabella,$stazione,$week,$tabellaSalvataggio)==1)
					$n++;
			}
			return $n;
		}
	}
	function getStatoOrdine($conn,$docnum,$tabella,$stazione,$week,$tabellaSalvataggio)
	{
		$query="SELECT * FROM $tabella WHERE docnum=$docnum AND stazione='$stazione' AND settimana=$week";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows = sqlsrv_has_rows( $result );
			if ($rows === true)
			{
				return 1;
			}
			else 
			{
				return 0;
			}
		}
	}*/
?>