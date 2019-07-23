<?php

	include "Session.php";
	include "connessione.php";
	include "connessionePDO.php";
	
	$nomeSalvataggio=$_REQUEST['nomeSalvataggio'];
	$stazione=$_REQUEST['stazione'];
	//$res=explode("|",$nomeSalvataggio);
	
	//$stazioneVisualizzata=$res[0];
	//$nomeSalvataggio=$res[1];
	
	set_time_limit(120);
	
	if($stazione=="CAB_LAC" || $stazione=="CAB_ACR")
		$stazioneVisualizzata="V";
	if($stazione=="PTO_PTO")
		$stazioneVisualizzata="P";
	if($stazione=="MNT_MAST" || $stazione=="MNT_ACA" || $stazione=="MNT_HOME" || $stazione=="MNT_LUT")
		$stazioneVisualizzata="M";
	
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
	
	//$week = getWeek($conn,date('Y-m-d', time()));
	$week = str_replace("autosalvataggio_","",$nomeSalvataggio);
	
	echo '<div id="dettagliSalvataggio">';
		echo '<div id="nomeSalvataggioDiv">&nbsp&nbsp<b style="color:#12365A;font-weight:bold;">Salvataggio:</b>&nbsp&nbsp&nbsp'.$nomeSalvataggio.'&nbsp&nbsp&nbsp</div>';
		echo "<ul>";
			echo "<li><b style='color:#12365A;font-weight:bold;'>Data salvataggio:&nbsp&nbsp&nbsp</b>".getData($conn,$nomeSalvataggio,$tabellaSalvataggio)."</li>";
			echo "<li><b style='color:#12365A;font-weight:bold;'>Utente salvataggio:&nbsp&nbsp&nbsp</b>".getUsername($conn,$nomeSalvataggio,$tabellaSalvataggio)."</li>";
			echo "<li><b style='color:#12365A;font-weight:bold;'>Stazione:&nbsp&nbsp&nbsp</b>$stazione (".$stazioneVisualizzata.")</li>";
			echo "<li><b style='color:#12365A;font-weight:bold;'>Settimana:&nbsp&nbsp&nbsp</b>".$week."</li>";
			echo "<li><b style='color:#12365A;font-weight:bold;'>Capacita produttiva:&nbsp&nbsp&nbsp</b>".getCapacitaProduttiva($conn,$week,$stazione)."</li>";
		echo "</ul>";
	echo '</div>';
	
	echo "<div id='containerTabellaSalvataggio'>";
		if($stazioneVisualizzata=="Montaggio")
			$query2="SELECT docnum, 0 AS mq,ISNULL(basi_portalavabo,0) AS basi_portalavabo,ISNULL(basi_accostabili,0) AS basi_accostabili,ISNULL(pensili,0) AS pensili,ISNULL(colonne,0) AS colonne,ISNULL(Altro,0) AS Altro,dataConsegna,ISNULL(totale_pezzi,0) AS totale_pezzi,stazione ";	
		else
			$query2="SELECT docnum,ISNULL(mq,0) AS mq,ISNULL(basi_portalavabo,0) AS basi_portalavabo,ISNULL(basi_accostabili,0) AS basi_accostabili,ISNULL(pensili,0) AS pensili,ISNULL(colonne,0) AS colonne,ISNULL(Altro,0) AS Altro,dataConsegna,ISNULL(totale_pezzi,0) AS totale_pezzi,stazione ";	
		$query2=$query2." FROM $tabellaSalvataggio WHERE nomeSalvataggio='$nomeSalvataggio' AND settimana='$week' AND stazione='$stazione'";		
		
		//echo $query2;
		
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "<table id='myTableSommarioProduzione'>";
			echo "<tr>";
				echo "<th>Ordine</th>";
				echo "<th>Mq</th>";
				echo "<th>Basi portalavabo</th>";
				echo "<th>Basi accostabili</th>";
				echo "<th>Pensili</th>";
				echo "<th>Colonne</th>";
				echo "<th>Altro</th>";
				echo "<th>Totale</th>";
				echo "<th>Data consegna</th>";
				echo "<th>Stato</th>";
			echo "</tr>";
			while($row2=sqlsrv_fetch_array($result2))
			{
				if(getStatoOrdine($conn,$row2['docnum'],$tabella,$stazione,$week,$tabellaSalvataggio)==1)
					$color="red";
				if(getStatoOrdine($conn,$row2['docnum'],$tabella,$stazione,$week,$tabellaSalvataggio)==0)
					$color="rgb(0, 153, 0);";
				echo "<tr>";
					echo "<td style='color:$color'>".$row2['docnum']."</td>";
					echo "<td style='color:$color'>".number_format($row2['mq'],1)."</td>";
					echo "<td style='color:$color'>".$row2['basi_portalavabo']."</td>";
					echo "<td style='color:$color'>".$row2['basi_accostabili']."</td>";
					echo "<td style='color:$color'>".$row2['pensili']."</td>";
					echo "<td style='color:$color'>".$row2['colonne']."</td>";
					echo "<td style='color:$color'>".$row2['Altro']."</td>";
					echo "<td style='color:$color'>".$row2['totale_pezzi']."</td>";
					echo "<td style='color:$color'>".$row2['dataConsegna']->format('d/m/Y')."</td>";
					if(getStatoOrdine($conn,$row2['docnum'],$tabella,$stazione,$week,$tabellaSalvataggio)==1)
						echo "<td style='color:$color'>Non prodotto <i class='fas fa-times-circle' style='margin-right:20px;float:right'></i></i></td>";
					if(getStatoOrdine($conn,$row2['docnum'],$tabella,$stazione,$week,$tabellaSalvataggio)==0)
						echo "<td style='color:$color'>Prodotto <i class='fas fa-check-circle' style='margin-right:20px;float:right'></i></td>";
				echo "</tr>";
			}
			getExtraOrdini($conn,$tabella,$week,$tabellaSalvataggio,$stazione,$stazioneVisualizzata);
			echo "</table>";
		}
	echo "</div>";
	
	
	
	
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
	}
	function getExtraOrdini($conn,$tabella,$week,$tabellaSalvataggio,$stazione,$stazioneVisualizzata)
	{
		if($stazioneVisualizzata=="Montaggio")
			$query2="SELECT docnum, 0 AS mq,ISNULL(basi_portalavabo,0) AS basi_portalavabo,ISNULL(basi_accostabili,0) AS basi_accostabili,ISNULL(pensili,0) AS pensili,ISNULL(colonne,0) AS colonne,ISNULL(Altro,0) AS Altro,dataConsegna,ISNULL(totale_pezzi,0) AS totale_pezzi,stazione ";	
		else
			$query2="SELECT docnum,ISNULL(mq,0) AS mq,ISNULL(basi_portalavabo,0) AS basi_portalavabo,ISNULL(basi_accostabili,0) AS basi_accostabili,ISNULL(pensili,0) AS pensili,ISNULL(colonne,0) AS colonne,ISNULL(Altro,0) AS Altro,dataConsegna,ISNULL(totale_pezzi,0) AS totale_pezzi,stazione ";	
		$query2=$query2." FROM $tabella WHERE  settimana=$week AND stazione='$stazione' AND docnum NOT IN (SELECT docnum FROM $tabellaSalvataggio where settimana=$week AND stazione='$stazione')";		
		
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
					$color="#4C91CB";
					echo "<tr>";
						echo "<td style='color:$color'>".$row['docnum']."</td>";
						echo "<td style='color:$color'>".number_format($row['mq'],1)."</td>";
						echo "<td style='color:$color'>".$row['basi_portalavabo']."</td>";
						echo "<td style='color:$color'>".$row['basi_accostabili']."</td>";
						echo "<td style='color:$color'>".$row['pensili']."</td>";
						echo "<td style='color:$color'>".$row['colonne']."</td>";
						echo "<td style='color:$color'>".$row['Altro']."</td>";
						echo "<td style='color:$color'>".$row['totale_pezzi']."</td>";
						echo "<td style='color:$color'>".$row['dataConsegna']->format('d/m/Y')."</td>";
						echo "<td style='color:$color'>Aggiunto <i class='fas fa-exclamation-circle' style='margin-right:20px;float:right'></td>";
					echo "</tr>";
				}
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
	function getData($conn,$nomeSalvataggio,$tabellaSalvataggio)
	{
		$query="SELECT TOP (1) dataSalvataggio FROM $tabellaSalvataggio WHERE nomeSalvataggio='$nomeSalvataggio'";
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
				return $row['dataSalvataggio']->format('d/m/Y');
			}
		}
	}
	function getUsername($conn,$nomeSalvataggio,$tabellaSalvataggio)
	{
		$query="SELECT utenti.username FROM $tabellaSalvataggio,utenti WHERE nomeSalvataggio='$nomeSalvataggio' AND $tabellaSalvataggio.utenteSalvataggio=utenti.id_utente";
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
				return $row['username'];
			}
		}
	}
	function getCapacitaProduttiva($conn,$week,$stazione)
	{
		$query="SELECT capacita,um FROM capacita_produttiva WHERE settimana=$week AND stazione='$stazione'";
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
				while($row=sqlsrv_fetch_array($result))
				{
					return $row['capacita']." ".$row['um'];
				}
			}
			else 
			{
				return "?";
			}
		}
	}
?>