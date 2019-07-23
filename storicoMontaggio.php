<?php

	include "Session.php";
	include "connessione.php";

	if(set_time_limit(240))
	{
		
		$nSettimane=$_REQUEST['nSettimane'];
		
		$query="SELECT DISTINCT stazione FROM storico_montaggi";
		
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
						echo '<td onclick="'. 'getDettaglioMonResiduo(' . htmlspecialchars(json_encode($row['stazione'])) . ','. htmlspecialchars(json_encode($time[0])) . ')">'.getResiduo($conn,$row['stazione'],$time[0]).'</td>';
						for ($x = 0; $x < sizeof($time); $x++) 
						{
							echo '<td onclick="'. 'getDettaglioMon(' . htmlspecialchars(json_encode($row['stazione'])) . ','. htmlspecialchars(json_encode($time[$x])) . ')">';
								echo getNOrdini($conn,$row['stazione'],$time[$x]);
								echo "<br>";
								echo getBasiPortalavabo($conn,$row['stazione'],$time[$x]);
								echo "<br>";
								echo getBasiAccostabili($conn,$row['stazione'],$time[$x]);
								echo "<br>";
								echo getColonne($conn,$row['stazione'],$time[$x]);
								echo "<br>";
								echo getPensili($conn,$row['stazione'],$time[$x]);
								echo "<br>";
								echo getAltro($conn,$row['stazione'],$time[$x]);
								echo "<br>";
								echo getTotPezzi($conn,$row['stazione'],$time[$x]);
							echo '</td>';
						} 
					echo '</tr>';
				}
			echo "</table>";
		}
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";

	
	function getResiduo($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT SUM(nOrdini) AS nOrdini,SUM(basi_portalavabo) AS basi_portalavabo,SUM(basi_accostabili) AS basi_accostabili,SUM(colonne) AS colonne,SUM(pensili) AS pensili,SUM(altro) AS altro,SUM(totale_pezzi) AS totale_pezzi FROM storico_montaggi WHERE settimana<$settimana AND stazione='$stazione'";
	
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
				return "Numero ordini: <b style='color:#3367d6;float:right'>".$row['nOrdini']."</b><br>Basi portalavabo: <b style='color:#3367d6;float:right'>".$row['basi_portalavabo']."</b><br>Basi accostabili: <b style='color:#3367d6;float:right'>".$row['basi_accostabili']."</b><br>Colonne: <b style='color:#3367d6;float:right'>".$row['colonne']."</b><br>Pensili: <b style='color:#3367d6;float:right'>".$row['pensili']."</b><br>Altro: <b style='color:#3367d6;float:right'>".$row['altro']."</b><br>Totale pezzi: <b style='color:#3367d6;float:right'>".$row['totale_pezzi']."</b>";
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
	function getNOrdini($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT nOrdini FROM storico_montaggi WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Numero ordini: <b style='color:#3367d6;float:right'>".$row['nOrdini']."</b>";
			}
			return "Numero ordini: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
	
	function getBasiPortalavabo($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT basi_portalavabo FROM storico_montaggi WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Basi portalavabo: <b style='color:#3367d6;float:right'>".$row['basi_portalavabo']."</b>";
			}
			return "Basi portalavabo: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
	
	function getBasiAccostabili($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT basi_accostabili FROM storico_montaggi WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Basi accostabili: <b style='color:#3367d6;float:right'>".$row['basi_accostabili']."</b>";
			}
			return "Basi accostabili: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
	
	function getColonne($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT colonne FROM storico_montaggi WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Colonne: <b style='color:#3367d6;float:right'>".$row['colonne']."</b>";
			}
			return "Colonne: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
	
	function getPensili($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT pensili FROM storico_montaggi WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Pensili: <b style='color:#3367d6;float:right'>".$row['pensili']."</b>";
			}
			return "Pensili: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
	
	function getAltro($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT altro FROM storico_montaggi WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Altro: <b style='color:#3367d6;float:right'>".$row['altro']."</b>";
			}
			return "Altro: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
	
	function getTotPezzi($conn,$stazione,$time)
	{
		$week=explode("_",$time);
		$settimana=$week[0].$week[1];
		
		$query="SELECT totale_pezzi FROM storico_montaggi WHERE stazione='$stazione' AND settimana=$settimana";
	
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
				return "Totale pezzi: <b style='color:#3367d6;float:right'>".$row['totale_pezzi']."</b>";
			}
			return "Totale pezzi: <b style='font-weight:normal;float:right;'>0</b>";
		}
	}
		
	function getTime($conn,&$time,$nSettimane)
	{
		$timeH=array();
		getWeeks($conn,$timeH);
		$time2 = getWeek($conn,date('Y-m-d', time()));
		$pos2=array_search($time2,$timeH);
		$time1=$timeH[$pos2+1];
		
		$posEnd=$pos2-1;
		$posStart=$posEnd-$nSettimane;
		
		for ($x = $posStart; $x <= $posEnd; $x++) 
		{
			$t=$timeH[$x];
			$y = substr($t, 0, 4);
			$w = substr($t, 4, 2);
			array_push($time,$y."_".$w);
		} 
	}
	function getWeeks($conn,&$timeH)
	{
		$query="SELECT [settimana] FROM [Cecklist].[dbo].[nSettimana] ORDER BY settimana";
	
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
				array_push($timeH, $row['settimana']);
			}
		}
	}
	function getMaxWeekYearBefore($conn)
	{
		$year=date('Y', time());
		$year--;
		$query="SELECT MAX([settimana]) as settimana FROM [Cecklist].[dbo].[settimanaData] WHERE settimana LIKE '$year%'";
	
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
	
?>