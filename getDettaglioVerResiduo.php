<?php

	include "connessione.php";

	$stazione=$_REQUEST['stazione'];
	$week=$_REQUEST['week'];
	
	getDettaglio($conn,$stazione,$week);
	getDettaglio2($conn,$stazione,$week);
	
	function getDettaglio($conn,$stazione,$week)
	{
		$query2="SELECT * FROM dettaglioVer WHERE settimana<'$week' AND stazione='$stazione' ORDER BY docnum";	
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
				echo "<table id='myTableDettaglio'>";
					echo "<tr>";
						echo "<th>Ordine</th>";
						echo "<th>Descrizione</th>";
						echo "<th>N.</th>";
						echo "<th>Mq</th>";
					echo "</tr>";
				while($row2=sqlsrv_fetch_array($result2))
				{
					echo "<tr>";
						echo "<td><input type='button' class='btnBlu' value='".$row2['docnum']."' onclick='setDocnumPopupSap(".$row2['docnum'].")' title='Modifica date' style='width:100px;height:20px;' /></td>";
						echo "<td>".$row2['descrizione']."</td>";
						echo "<td>".$row2['n']."</td>";
						echo "<td>".number_format($row2['mq'],4)."</td>";
					echo "</tr>";
				}
				echo "</table>";
			}
		}
	}
	function getDettaglio2($conn,$stazione,$week)
	{
		$query2="SELECT [docnum],[stazione],ISNULL([totale_pezzi],0) AS totale_pezzi,ISNULL([basi_portalavabo],0) AS basi_portalavabo,ISNULL([colonne],0) AS colonne,ISNULL([pensili],0) AS pensili,ISNULL([basi_accostabili],0) AS basi_accostabili,ISNULL([Altro],0) AS Altro,ISNULL([mq],0) AS mq,[settimana] FROM dettaglioVer_2 WHERE settimana<'$week' AND stazione='$stazione' ORDER BY docnum";	
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
				echo "<table id='myTableDettaglio2'>";
					echo "<tr>";
						echo "<th>Ordine</th>";
						echo "<th>Mq</th>";
						echo "<th>Basi portalavabo</th>";
						echo "<th>Basi accostabili</th>";
						echo "<th>Pensili</th>";
						echo "<th>Colonne</th>";
						echo "<th>Altro</th>";
						echo "<th>Tot. pezzi</th>";
					echo "</tr>";
				while($row2=sqlsrv_fetch_array($result2))
				{
					echo "<tr>";
						echo "<td><input type='button' class='btnBlu' value='".$row2['docnum']."' onclick='setDocnumPopupSap(".$row2['docnum'].")' title='Modifica date' style='width:100px;height:20px;' /></td>";
						echo "<td>".number_format($row2['mq'],4)."</td>";
						echo "<td>".$row2['basi_portalavabo']."</td>";
						echo "<td>".$row2['basi_accostabili']."</td>";
						echo "<td>".$row2['pensili']."</td>";
						echo "<td>".$row2['colonne']."</td>";
						echo "<td>".$row2['Altro']."</td>";
						echo "<td>".$row2['totale_pezzi']."</td>";
					echo "</tr>";
				}
				echo "</table>";
			}
		}
	}
?>