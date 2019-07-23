<?php
	include "connessione.php";

	$stazione=$_REQUEST['stazione'];
	$stazioneVisualizzata=$_REQUEST['stazioneVisualizzata'];
	$docnum=$_REQUEST['docnum'];
	
	if($stazioneVisualizzata=="Verniciatura")
	{
		$tabella="gestione_verniciatura";
	}
	if($stazioneVisualizzata=="Montaggio")
	{
		$tabella="gestione_montaggio";
	}
	if($stazioneVisualizzata=="Punto punto")
	{
		$tabella="gestione_punto_punto";
	}
	
	$week=getWeek($conn,$docnum,$tabella,$stazione);
	
	if($stazioneVisualizzata=="Montaggio")
		$query2="SELECT TOP (100) PERCENT dbo.$tabella.docnum, dbo.$tabella.stazione, ISNULL(dbo.$tabella.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$tabella.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$tabella.colonne, 0) AS colonne, ISNULL(dbo.$tabella.pensili, 0) AS pensili, ISNULL(dbo.$tabella.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$tabella.Altro, 0) AS Altro, 0 AS mq, dbo.$tabella.settimana,  dbo.$tabella.dataConsegna, dbo.colori_collezioni.colore, dbo.$tabella.collezione FROM            dbo.colori_collezioni RIGHT OUTER JOIN dbo.$tabella ON dbo.colori_collezioni.collezione = dbo.$tabella.collezione WHERE (dbo.$tabella.settimana = '$week') AND (dbo.$tabella.stazione = '$stazione') AND (dbo.$tabella.docnum = '$docnum')";	
	else
		$query2="SELECT TOP (100) PERCENT dbo.$tabella.docnum, dbo.$tabella.stazione, ISNULL(dbo.$tabella.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$tabella.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$tabella.colonne, 0) AS colonne, ISNULL(dbo.$tabella.pensili, 0) AS pensili, ISNULL(dbo.$tabella.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$tabella.Altro, 0) AS Altro, 0 AS mq, dbo.$tabella.settimana,  dbo.$tabella.dataConsegna, dbo.colori_collezioni.colore, dbo.$tabella.collezione FROM            dbo.colori_collezioni RIGHT OUTER JOIN dbo.$tabella ON dbo.colori_collezioni.collezione = dbo.$tabella.collezione WHERE (dbo.$tabella.settimana = '$week') AND (dbo.$tabella.stazione = '$stazione') AND (dbo.$tabella.docnum = '$docnum')";	
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
				echo '<div id="'.$i.'elementOrdine'.$week.'" class="elementOrdine" draggable="true" ondragstart="drag(event)" onclick="'. 'apriPopupDettaglioOrdine(' . htmlspecialchars(json_encode($elementId)) . ','. htmlspecialchars(json_encode($week)) . ')" style="background:#'.$row2["colore"].'">';
					
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

		
		
	function getWeek($conn,$docnum,$tabella,$stazione)
	{
		$query2="SELECT settimana FROM $tabella WHERE docnum='$docnum' AND stazione='$stazione'";	
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
				return $row2['settimana'];
			}
		}
	}
?>