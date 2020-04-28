<?php

	include "Session.php";
	include "connessione.php";

	//$nSettimane=11;
	$nSettimane=11;
	$stazione=$_REQUEST['stazione'];
	
	if($stazione=="CAB_LAC" || $stazione=="CAB_ACR")
		$stazioneVisualizzata="gestione_verniciatura";
	if($stazione=="PTO_PTO")
		$stazioneVisualizzata="gestione_punto_punto";
	if($stazione=="MNT_MAST" || $stazione=="MNT_ACA" || $stazione=="MNT_HOME" || $stazione=="MNT_LUT")
		$stazioneVisualizzata="gestione_montaggio";
	
	if(set_time_limit(120))
	{
		//$time=array("2018_49","2018_50","2019_02","2019_03","2019_04");
		$time=array();
		getTime($conn,$time,$nSettimane);

		echo "<div id='containerResiduoGestioneSettimane' class='colonnaContainerGestioneSettimane'>";
			//SETTIMANA
			echo "<div class='periodo'>Residuo</div>";
			//PROGRESS BAR VUOTA
			echo '<div class="progressBarContainer"></div>';
			//TOTALI
			echo "<div class='totali'>";
				echo "<div class='colonnaOrdineVer' style='color:#CC0000' id='totaleResiduoORD'></div>";
				echo "<div class='colonnaNVer' style='width:10%;color:#CC0000' id='totaleResiduoMQ'></div>";
				echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleResiduoBP'></div>";
				echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleResiduoBA'></div>";
				echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleResiduoP'></div>";
				echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleResiduoC'></div>";
				echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleResiduoA'></div>";
				echo "<div class='colonnaNVer' style='width:30%;border:none;color:#CC0000' id='totaleResiduoTOT'></div>";
				echo "<div class='colonnaDataConsegnaVer' style='width:0%'></div>";
			echo "</div>";
			//HEADER
			echo '<div class="containerColonne">';
				echo "<div class='colonnaOrdineVer' title='Docnum'>ORDINE</div>";
				echo "<div class='colonnaNVer' style='width:10%' title='Mq'>M.Q.</div>";
				echo "<div class='colonnaNVer' title='Basi portalavabo'>B.P.</div>";
				echo "<div class='colonnaNVer' title='Basi accostabili'>B.A.</div>";
				echo "<div class='colonnaNVer' title='Pensili'>P.</div>";
				echo "<div class='colonnaNVer' title='Colonne'>C.</div>";
				echo "<div class='colonnaNVer' title='Altro'>A.</div>";
				echo "<div class='colonnaNVer' title='Totale pezzi'>TOT.</div>";
				echo "<div class='colonnaDataConsegnaVer' title='Data consegna'>DATA C.</div>";
			echo "</div>";
			//DATI
			echo "<div id='containerResiduoVER' class='containerResiduo'>";
				echo "<div id='residuoVER'>";
					getOrdiniResiduo($conn,$time[0],$stazione,$stazioneVisualizzata);
				echo "</div>";
			echo "</div>";
		echo "</div>";
		
		for ($x = 0; $x < sizeof($time); $x++) 
		{
			$weekN=$x+1;
			$elem=$time[$x];
			$elem2=explode("_",$elem);
			$sett=$elem2[0].$elem2[1];
			echo '<div id="containerWeek'.$weekN.'GestioneSettimane" class="colonnaContainerGestioneSettimane">';
				//SETTIMANA E DATE
				echo '<div class="periodo">';
					echo '<div id="week'.$weekN.'" class="week">'.$time[$x].'</div>';
					echo '<div class="days">'.getDays($conn,$sett).'</div>';
				echo "</div>";
				//PROGRESS BAR
				echo '<div class="progressBarContainer" onclick="apriPopupCapacitaProduttiva(' . htmlspecialchars(json_encode($time[$x])) . ')" title="Modifica la capacita produttiva">';
					echo '<div class="progressBarHeader">';
						echo "<span class='capacitaProduttivaTitle'>Capacita produttiva:</span><span class='capacitaProduttivaTitle2'><span style='font-weight:bold' id='capacitaProduttivaQnt".$weekN."'>0/</span><span style='font-weight:bold' id='capacitaProduttivaTot".$weekN."'>0</span></span>";
					echo '</div>';
					echo '<progress max="100" value="0" aria-valuemax="100" aria-valuemin="0"  tabindex="-1" id="progressBarCapacitaProduttiva'.$time[$x].'" class="progressBarCapacitaProduttiva">';
					echo '</progress>';
				echo "</div>";
				//TOTALI
				echo "<div class='totali'>";
					echo "<div class='colonnaOrdineVer' style='color:#CC0000' id='totaleOrdini".$weekN."ORD'></div>";
					echo "<div class='colonnaNVer' style='width:10%;color:#CC0000' id='totaleOrdini".$weekN."MQ'></div>";
					echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleOrdini".$weekN."BP'></div>";
					echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleOrdini".$weekN."BA'></div>";
					echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleOrdini".$weekN."P'></div>";
					echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleOrdini".$weekN."C'></div>";
					echo "<div class='colonnaNVer' style='color:#CC0000' id='totaleOrdini".$weekN."A'></div>";
					echo "<div class='colonnaNVer' style='width:30%;border:none;color:#CC0000' id='totaleOrdini".$weekN."TOT'></div>";
					echo "<div class='colonnaDataConsegnaVer' style='width:0%'></div>";
				echo "</div>";
				//HEADER
				echo '<div class="containerColonne">';
					echo "<div class='colonnaOrdineVer' title='Docnum'>ORDINE</div>";
					echo "<div class='colonnaNVer' style='width:10%' title='Mq'>M.Q.</div>";
					echo "<div class='colonnaNVer' title='Basi portalavabo'>B.P.</div>";
					echo "<div class='colonnaNVer' title='Basi accostabili'>B.A.</div>";
					echo "<div class='colonnaNVer' title='Pensili'>P.</div>";
					echo "<div class='colonnaNVer' title='Colonne'>C.</div>";
					echo "<div class='colonnaNVer' title='Altro'>A.</div>";
					echo "<div class='colonnaNVer' title='Totale pezzi'>TOT.</div>";
					echo "<div class='colonnaDataConsegnaVer' title='Data consegna'>DATA C.</div>";
				echo "</div>";
				//DATI
				echo "<div id='containerOrdiniVER$weekN' class='containerOrdini' ondrop='drop(event,$weekN)' ondragover='allowDrop(event,$weekN)' ondragenter='counter++' ondragleave='dragLeaveContainer(event,this);dragLeave(event,$weekN)'>";
					echo "<div id='ordiniVER$weekN' class='ordiniVER'>";
						getOrdiniWeek($conn,$time[$x],$stazione,$stazioneVisualizzata);
					echo "</div>";
				echo "</div>";
			echo "</div>";
		} 
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";

	
	function getPercentualeCapacitaProduttiva($conn,$week,$stazione)
	{
		$query2="SELECT capacita,um FROM capacita_produttiva WHERE settimana=$week AND stazione='$stazione'";	
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
					$capacita=$row2['capacita'];
					$um=$row2['um'];
					
					
				}
			}
			else
				return 0;
		}
	}
	function getOrdiniResiduo($conn,$elem,$stazione,$stazioneVisualizzata)
	{
		$elem2=explode("_",$elem);
		$week=$elem2[0].$elem2[1];
		$query2="SELECT TOP (100) PERCENT dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, 0 AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna, dbo.colori_collezioni.colore, dbo.$stazioneVisualizzata.collezione FROM            dbo.colori_collezioni RIGHT OUTER JOIN dbo.$stazioneVisualizzata ON dbo.colori_collezioni.collezione = dbo.$stazioneVisualizzata.collezione WHERE        (dbo.$stazioneVisualizzata.settimana < '$week') AND (dbo.$stazioneVisualizzata.stazione = '$stazione') ORDER BY dbo.$stazioneVisualizzata.docnum";	
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
				$i=1000;
				while($row2=sqlsrv_fetch_array($result2))
				{
					$elementId=$i.'elementOrdineResiduo';
					echo '<input type="hidden" id="'.$elementId.'collezione" value="'.$row2["collezione"].'" />';
					$week='Residuo';
					echo '<div id="'.$i.'elementOrdineResiduo" class="elementOrdine" draggable="true" ondragstart="drag(event)" ondragend="fixContainerStyle()" ondrop="blockDrop(event)" onclick="'. 'apriPopupDettaglioOrdine(this.id,'. htmlspecialchars(json_encode($week)) . ')" style="background:#'.$row2["colore"].'">';
					
						echo "<div class='cellaOrdineVer' title='Docnum: ".$row2['docnum']."  |  Collezione: ".$row2['collezione']."'>".$row2['docnum']."</div>";
						echo "<div class='cellaNVer' style='width:10%' title='Mq: ".number_format($row2['mq'],1)."'>".number_format($row2['mq'],1)."</div>";
						echo "<div class='cellaNVer' title='Basi portalavabo: ".$row2['basi_portalavabo']."'>".$row2['basi_portalavabo']."</div>";
						echo "<div class='cellaNVer' title='Basi accostabili: ".$row2['basi_accostabili']."'>".$row2['basi_accostabili']."</div>";
						echo "<div class='cellaNVer' title='Pensili: ".$row2['pensili']."'>".$row2['pensili']."</div>";
						echo "<div class='cellaNVer' title='Colonne: ".$row2['colonne']."'>".$row2['colonne']."</div>";
						echo "<div class='cellaNVer' title='Altro: ".$row2['Altro']."'>".$row2['Altro']."</div>";
						echo "<div class='cellaNVer' title='Totale pezzi: ".$row2['totale_pezzi']."'>".$row2['totale_pezzi']."</div>";
						echo "<div class='cellaDataConsegnaVer' title='Data consegna: ".$row2['dataConsegna']->format('d/m/Y')."'>".$row2['dataConsegna']->format('d/m/Y')."</div>";
					
					echo "</div>";
					$i++;
				}
			}
		}
	}
	function getOrdiniWeek($conn,$elem,$stazione,$stazioneVisualizzata)
	{
		$elem2=explode("_",$elem);
		$week=$elem2[0].$elem2[1];
		$query2="SELECT TOP (100) PERCENT dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne, ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, 0 AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna, dbo.colori_collezioni.colore, dbo.$stazioneVisualizzata.collezione FROM            dbo.colori_collezioni RIGHT OUTER JOIN dbo.$stazioneVisualizzata ON dbo.colori_collezioni.collezione = dbo.$stazioneVisualizzata.collezione WHERE (dbo.$stazioneVisualizzata.settimana = '$week') AND (dbo.$stazioneVisualizzata.stazione = '$stazione')  ORDER BY dbo.$stazioneVisualizzata.posizione";	
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
				$i=1000;
				while($row2=sqlsrv_fetch_array($result2))
				{
					$elementId=$i.'elementOrdine'.$week;
					echo '<input type="hidden" id="'.$elementId.'collezione" value="'.$row2["collezione"].'" />';
					echo '<div id="'.$i.'elementOrdine'.$week.'" class="elementOrdine" draggable="true" ondragstart="drag(event)" ondragend="fixContainerStyle()" onclick="'. 'apriPopupDettaglioOrdine(this.id,'. htmlspecialchars(json_encode($week)) . ')" ondragenter="dragOverElementOrdine(event,this)" style="background:#'.$row2["colore"].'">';
						
						echo "<div class='cellaOrdineVer' title='Docnum: ".$row2['docnum']."  |  Collezione: ".$row2['collezione']."'>".$row2['docnum']."</div>";
						echo "<div class='cellaNVer' style='width:10%' title='Mq: ".number_format($row2['mq'],1)."'>".number_format($row2['mq'],1)."</div>";
						echo "<div class='cellaNVer' title='Basi portalavabo: ".$row2['basi_portalavabo']."'>".$row2['basi_portalavabo']."</div>";
						echo "<div class='cellaNVer' title='Basi accostabili: ".$row2['basi_accostabili']."'>".$row2['basi_accostabili']."</div>";
						echo "<div class='cellaNVer' title='Pensili: ".$row2['pensili']."'>".$row2['pensili']."</div>";
						echo "<div class='cellaNVer' title='Colonne: ".$row2['colonne']."'>".$row2['colonne']."</div>";
						echo "<div class='cellaNVer' title='Altro: ".$row2['Altro']."'>".$row2['Altro']."</div>";
						echo "<div class='cellaNVer' title='Totale pezzi: ".$row2['totale_pezzi']."'>".$row2['totale_pezzi']."</div>";
						echo "<div class='cellaDataConsegnaVer' title='Data consegna: ".$row2['dataConsegna']->format('d/m/Y')."'>".$row2['dataConsegna']->format('d/m/Y')."</div>";
					
					echo "</div>";
					$i++;
				}
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
				return $row['min']->format('d/m/Y')." - ".$row['max']->format('d/m/Y');
			}
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