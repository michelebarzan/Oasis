<?php

	include "Session.php";
	include "connessione.php";

	$nSettimane=$_REQUEST['nSettimane'];
	
	$query="SELECT DISTINCT stazione FROM carico_punto_punto";
	
	$result=sqlsrv_query($conn,$query);
	if($result==FALSE)
	{
		echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$time=array();
		
		getTime($conn,$time,$nSettimane);
		
		echo '<table id="myTableTabelleCarichiDiLavoro">';
			echo '<tr class="TheaderTabelleCarichiDiLavoro">';
				echo '<th>Stazione</th>';
				echo '<th>Residuo</th>';
				for ($x = 0; $x < sizeof($time); $x++) 
				{
					$elem=$time[$x];
					$elem2=explode("_",$elem);
					$sett=$elem2[0].$elem2[1];
					echo '<th><b style="font-weight:normal;">'.$time[$x].'</b><br>'.getDays($conn,$sett).'</th>';
				} 
			echo '</tr>';
			while($row=sqlsrv_fetch_array($result))
			{
				echo '<tr>';
					echo '<td>'.$row['stazione'].'</td>';
					echo '<td onclick="'. 'getDettaglioPtoPtoResiduo(' . htmlspecialchars(json_encode($row['stazione'])) . ','. htmlspecialchars(json_encode($time[0])) . ')">'.getResiduo($conn,$row['stazione'],$time[0]).'</td>';
					for ($x = 0; $x < sizeof($time); $x++) 
					{
						echo '<td onclick="'. 'getDettaglioPtoPto(' . htmlspecialchars(json_encode($row['stazione'])) . ','. htmlspecialchars(json_encode($time[$x])) . ')">';
							echo getOrdini($conn,$row['stazione'],$time[$x]);
							echo "<br>";
							echo getPezzi($conn,$row['stazione'],$time[$x]);
						echo '</td>';
					} 
				echo '</tr>';
			}
		echo "</table>";
	}

	
	
	function getResiduo($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT SUM(ordini) AS ordini,SUM(pezzi) AS pezzi FROM carico_punto_punto WHERE settimana<$settimana AND stazione='$stazione'";
	
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
				return "Numero ordini: <b style='color:#3367d6;float:right'>".$row['ordini']."</b><br>Pezzi: <b style='color:#3367d6;float:right'>".$row['pezzi']."</b>";
			}
		}
	}
	function getDays($conn,$settimana)
	{
		$query="SELECT MIN(data) AS min, MAX(data) AS max FROM settimanaData WHERE settimana=$settimana";
	
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
				return "<b style='font-weight:normal; color:gray; font-size:80%' >".$row['min']->format('d/m/Y')." - ".$row['max']->format('d/m/Y')."</b>";
			}
		}
	}
	function getOrdini($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT ordini FROM carico_punto_punto WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Ordini: <b style='color:#3367d6;float:right'>".$row['ordini']."</b>";
			}
			return "Ordini: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
	
	function getPezzi($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT pezzi FROM carico_punto_punto WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Pezzi: <b style='color:#3367d6;float:right;'>".$row['pezzi']."</b>";
			}
			return "Pezzi: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
	
	function getTime($conn,&$time,$nSettimane)
	{
		$arrayN=array();
		$time2 = getWeek($conn,date('Y-m-d', time()));
		$n2 = getN($conn,$time2);
		$n1=getNAfter($conn,$n2);
		$time1=getWeekByN($conn,$n1);
		
		array_push($time,$time1);
		array_push($time,$time2);
		
		array_push($arrayN,$n1);
		array_push($arrayN,$n2);
		
		for ($x = 2; $x < $nSettimane; $x++) 
		{
			$nN=getNBefore($conn,$arrayN[$x-1]);
			array_push($arrayN,$nN);
			array_push($time,getWeekByN($conn,$nN));
		} 
		
		for ($x = 0; $x < sizeof($time); $x++) 
		{
			$t=$time[$x];
			$y = substr($t, 0, 4);
			$w = substr($t, 4, 2);
			$time[$x]=$y."_".$w;
		} 
	}
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
	function getN($conn,$settimana)
	{
		$query="SELECT n FROM nSettimana WHERE settimana='$settimana'";
	
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
				return $row['n'];
			}
		}
	}
	function getNBefore($conn,$n)
	{
		$query="SELECT MAX(n) AS n FROM nSettimana WHERE n<$n";
	
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
				return $row['n'];
			}
		}
	}
	function getNAfter($conn,$n)
	{
		$query="SELECT MIN(n) AS n FROM nSettimana WHERE n>$n";
	
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
				return $row['n'];
			}
		}
	}
	function getWeekByN($conn,$n)
	{
		$query="SELECT settimana FROM nSettimana WHERE n=$n";
	
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			/*echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));*/
			die("La tabella settimane di SAP non è aggiornata al 2019. Contatta l' amministratore.");
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				return $row['settimana'];
			}
		}
	}
	
?>