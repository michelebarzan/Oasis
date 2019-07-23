<?php

	include "Session.php";
	include "connessione.php";

	//$nSettimane=11;
	$nSettimane=5;
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

		echo "<table id='excelExportTable' >";
		echo "<tr>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>Residuo</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".$time[0]."</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".$time[1]."</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".$time[2]."</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".$time[3]."</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".$time[4]."</td>";
		echo "</tr>";
		echo "<tr>";
			echo "<td style='border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'></td>";
			echo "<td style='border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".getDays($conn,explode("_",$time[0])[0].explode("_",$time[0])[1])."</td>";
			echo "<td style='border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".getDays($conn,explode("_",$time[1])[0].explode("_",$time[1])[1])."</td>";
			echo "<td style='border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".getDays($conn,explode("_",$time[2])[0].explode("_",$time[2])[1])."</td>";
			echo "<td style='border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".getDays($conn,explode("_",$time[3])[0].explode("_",$time[3])[1])."</td>";
			echo "<td style='border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#ddd;color:gray;font-weight:bold;text-align:center' colspan='10'>".getDays($conn,explode("_",$time[4])[0].explode("_",$time[4])[1])."</td>";
		echo "</tr>";
		echo "<tr>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#FF9999;color:white;text-align:center' colspan='10'>Totali</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#FF9999;color:white;text-align:center' colspan='10'>Totali</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#FF9999;color:white;text-align:center' colspan='10'>Totali</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#FF9999;color:white;text-align:center' colspan='10'>Totali</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;background-color:#FF9999;color:white;text-align:center' colspan='10'>Totali</td>";
			echo "<td style='border-top:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;background-color:#FF9999;color:white;text-align:center' colspan='10'>Totali</td>";
		echo "</tr>";
		echo "<tr>";
			echo "<td style='border-left:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,'residuo',$time,'docnum',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,'residuo',$time,'mq',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,'residuo',$time,'basi_portalavabo',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,'residuo',$time,'basi_accostabili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,'residuo',$time,'pensili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,'residuo',$time,'colonne',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,'residuo',$time,'Altro',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' >".getTotale($conn,'residuo',$time,'totale_pezzi',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			echo "<td style='border-right:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			
			echo "<td style='border-left:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[0],$time,'docnum',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[0],$time,'mq',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[0],$time,'basi_portalavabo',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[0],$time,'basi_accostabili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[0],$time,'pensili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[0],$time,'colonne',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[0],$time,'Altro',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' >".getTotale($conn,$time[0],$time,'totale_pezzi',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			echo "<td style='border-right:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			
			echo "<td style='border-left:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[1],$time,'docnum',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[1],$time,'mq',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[1],$time,'basi_portalavabo',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[1],$time,'basi_accostabili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[1],$time,'pensili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[1],$time,'colonne',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[1],$time,'Altro',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' >".getTotale($conn,$time[1],$time,'totale_pezzi',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			echo "<td style='border-right:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			
			echo "<td style='border-left:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[2],$time,'docnum',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[2],$time,'mq',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[2],$time,'basi_portalavabo',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[2],$time,'basi_accostabili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[2],$time,'pensili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[2],$time,'colonne',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[2],$time,'Altro',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' >".getTotale($conn,$time[2],$time,'totale_pezzi',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			echo "<td style='border-right:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			
			echo "<td style='border-left:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[3],$time,'docnum',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[3],$time,'mq',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[3],$time,'basi_portalavabo',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[3],$time,'basi_accostabili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[3],$time,'pensili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[3],$time,'colonne',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[3],$time,'Altro',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' >".getTotale($conn,$time[3],$time,'totale_pezzi',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			echo "<td style='border-right:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			
			echo "<td style='border-left:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[4],$time,'docnum',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[4],$time,'mq',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[4],$time,'basi_portalavabo',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[4],$time,'basi_accostabili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[4],$time,'pensili',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[4],$time,'colonne',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center'>".getTotale($conn,$time[4],$time,'Altro',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' >".getTotale($conn,$time[4],$time,'totale_pezzi',$stazione,$stazioneVisualizzata)."</td>";
			echo "<td style='color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
			echo "<td style='border-right:1px solid gray;color:white;background-color:#ff9999;border-bottom:1px solid gray;text-align:center' ></td>";
		echo "</tr>";
		echo "<tr>";
			echo "<td style='background:#ddd;border:1px solid gray'>Ordine</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Mq</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi portalavabo</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi accostabili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Pensili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Colonne</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Altro</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Totale</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Data consegna</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Collezione</td>";
			
			echo "<td style='background:#ddd;border:1px solid gray'>Ordine</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Mq</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi portalavabo</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi accostabili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Pensili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Colonne</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Altro</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Totale</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Data consegna</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Collezione</td>";
			
			echo "<td style='background:#ddd;border:1px solid gray'>Ordine</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Mq</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi portalavabo</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi accostabili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Pensili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Colonne</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Altro</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Totale</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Data consegna</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Collezione</td>";
			
			echo "<td style='background:#ddd;border:1px solid gray'>Ordine</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Mq</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi portalavabo</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi accostabili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Pensili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Colonne</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Altro</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Totale</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Data consegna</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Collezione</td>";
			
			echo "<td style='background:#ddd;border:1px solid gray'>Ordine</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Mq</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi portalavabo</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi accostabili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Pensili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Colonne</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Altro</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Totale</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Data consegna</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Collezione</td>";
			
			echo "<td style='background:#ddd;border:1px solid gray'>Ordine</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Mq</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi portalavabo</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Basi accostabili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Pensili</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Colonne</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Altro</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Totale</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Data consegna</td>";
			echo "<td style='background:#ddd;border:1px solid gray'>Collezione</td>";
		echo "</tr>";
		
		$ordiniResiduo=array();
		$ordiniWeek0=array();
		$ordiniWeek1=array();
		$ordiniWeek2=array();
		$ordiniWeek3=array();
		$ordiniWeek4=array();
		
		if($stazioneVisualizzata=='gestione_montaggio')
			$query2="SELECT dbo.$stazioneVisualizzata.collezione,dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, 0 AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana<'".explode("_",$time[0])[0].explode("_",$time[0])[1]."'";
		else
			$query2="SELECT dbo.$stazioneVisualizzata.collezione,dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, CONVERT(INT,ISNULL(dbo.$stazioneVisualizzata.mq, 0)) AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana<'".explode("_",$time[0])[0].explode("_",$time[0])[1]."'";
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
				array_push($ordiniResiduo,$row2['docnum']."|".$row2['mq']."|".$row2['basi_portalavabo']."|".$row2['basi_accostabili']."|".$row2['pensili']."|".$row2['colonne']."|".$row2['Altro']."|".$row2['totale_pezzi']."|".$row2['dataConsegna']->format('d/m/Y')."|".$row2['collezione']);
			}
		}
		//--------
		if($stazioneVisualizzata=='gestione_montaggio')
			$query3="SELECT dbo.$stazioneVisualizzata.collezione,dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, 0 AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[0])[0].explode("_",$time[0])[1]."'";
		else
			$query3="SELECT dbo.$stazioneVisualizzata.collezione,dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, CONVERT(INT,ISNULL(dbo.$stazioneVisualizzata.mq, 0)) AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[0])[0].explode("_",$time[0])[1]."'";
		$result3=sqlsrv_query($conn,$query3);
		if($result3==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row3=sqlsrv_fetch_array($result3))
			{
				array_push($ordiniWeek0,$row3['docnum']."|".$row3['mq']."|".$row3['basi_portalavabo']."|".$row3['basi_accostabili']."|".$row3['pensili']."|".$row3['colonne']."|".$row3['Altro']."|".$row3['totale_pezzi']."|".$row3['dataConsegna']->format('d/m/Y')."|".$row3['collezione']);
			}
		}
		//--------
		if($stazioneVisualizzata=='gestione_montaggio')
			$query4="SELECT dbo.$stazioneVisualizzata.collezione,dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, 0 AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[1])[0].explode("_",$time[1])[1]."'";
		else
			$query4="SELECT dbo.$stazioneVisualizzata.collezione,dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, CONVERT(INT,ISNULL(dbo.$stazioneVisualizzata.mq, 0)) AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[1])[0].explode("_",$time[1])[1]."'";
		$result4=sqlsrv_query($conn,$query4);
		if($result4==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query4."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row4=sqlsrv_fetch_array($result4))
			{
				array_push($ordiniWeek1,$row4['docnum']."|".$row4['mq']."|".$row4['basi_portalavabo']."|".$row4['basi_accostabili']."|".$row4['pensili']."|".$row4['colonne']."|".$row4['Altro']."|".$row4['totale_pezzi']."|".$row4['dataConsegna']->format('d/m/Y')."|".$row4['collezione']);
			}
		}
		//--------
		if($stazioneVisualizzata=='gestione_montaggio')
			$query5="SELECT dbo.$stazioneVisualizzata.collezione,dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, 0 AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[2])[0].explode("_",$time[2])[1]."'";
		else
			$query5="SELECT dbo.$stazioneVisualizzata.collezione,dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, CONVERT(INT,ISNULL(dbo.$stazioneVisualizzata.mq, 0)) AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[2])[0].explode("_",$time[2])[1]."'";
		$result5=sqlsrv_query($conn,$query5);
		if($result5==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query5."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row5=sqlsrv_fetch_array($result5))
			{
				array_push($ordiniWeek2,$row5['docnum']."|".$row5['mq']."|".$row5['basi_portalavabo']."|".$row5['basi_accostabili']."|".$row5['pensili']."|".$row5['colonne']."|".$row5['Altro']."|".$row5['totale_pezzi']."|".$row5['dataConsegna']->format('d/m/Y')."|".$row5['collezione']);
			}
		}
		//--------
		if($stazioneVisualizzata=='gestione_montaggio')
			$query6="SELECT dbo.$stazioneVisualizzata.collezione, dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, 0 AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[3])[0].explode("_",$time[3])[1]."'";
		else
			$query6="SELECT dbo.$stazioneVisualizzata.collezione, dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, CONVERT(INT,ISNULL(dbo.$stazioneVisualizzata.mq, 0)) AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[3])[0].explode("_",$time[3])[1]."'";
		$result6=sqlsrv_query($conn,$query6);
		if($result6==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query6."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row6=sqlsrv_fetch_array($result6))
			{
				array_push($ordiniWeek3,$row6['docnum']."|".$row6['mq']."|".$row6['basi_portalavabo']."|".$row6['basi_accostabili']."|".$row6['pensili']."|".$row6['colonne']."|".$row6['Altro']."|".$row6['totale_pezzi']."|".$row6['dataConsegna']->format('d/m/Y')."|".$row6['collezione']);
			}
		}
		//--------
		if($stazioneVisualizzata=='gestione_montaggio')
			$query7="SELECT dbo.$stazioneVisualizzata.collezione, dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, 0 AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[4])[0].explode("_",$time[4])[1]."'";
		else
			$query7="SELECT dbo.$stazioneVisualizzata.collezione, dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, CONVERT(INT,ISNULL(dbo.$stazioneVisualizzata.mq, 0)) AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna FROM $stazioneVisualizzata WHERE stazione='$stazione' AND settimana='".explode("_",$time[4])[0].explode("_",$time[4])[1]."'";
		$result7=sqlsrv_query($conn,$query7);
		if($result7==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query7."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row7=sqlsrv_fetch_array($result7))
			{
				array_push($ordiniWeek4,$row7['docnum']."|".$row7['mq']."|".$row7['basi_portalavabo']."|".$row7['basi_accostabili']."|".$row7['pensili']."|".$row7['colonne']."|".$row7['Altro']."|".$row7['totale_pezzi']."|".$row7['dataConsegna']->format('d/m/Y')."|".$row7['collezione']);
			}
		}
		
		for ($x = 0; $x < getMaxNOrdini($conn,$stazione,$stazioneVisualizzata,$time); $x++) 
		{
			if($x==(getMaxNOrdini($conn,$stazione,$stazioneVisualizzata,$time)-1))
				echo "<tr  style='border-bottom:1px solid gray'>";
			else
				echo "<tr>";
				if(!array_key_exists($x,$ordiniResiduo))
				{
					echo "<td style='border-left:1px solid gray'></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td style='border-right:1px solid gray'></td>";
				}
				else
				{
					$datiOrdine=explode("|",$ordiniResiduo[$x]);
					echo "<td style='border-left:1px solid gray'>".$datiOrdine[0]."</td>";
					echo "<td>".$datiOrdine[1]."</td>";
					echo "<td>".$datiOrdine[2]."</td>";
					echo "<td>".$datiOrdine[3]."</td>";
					echo "<td>".$datiOrdine[4]."</td>";
					echo "<td>".$datiOrdine[5]."</td>";
					echo "<td>".$datiOrdine[6]."</td>";
					echo "<td>".$datiOrdine[7]."</td>";
					echo "<td>".$datiOrdine[8]."</td>";
					echo "<td style='border-right:1px solid gray'>".$datiOrdine[9]."</td>";
				}
				
				if(!array_key_exists($x,$ordiniWeek0))
				{
					echo "<td style='border-left:1px solid gray'></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td style='border-right:1px solid gray'></td>";
				}
				else
				{
					$datiOrdine=explode("|",$ordiniWeek0[$x]);
					echo "<td style='border-left:1px solid gray'>".$datiOrdine[0]."</td>";
					echo "<td>".$datiOrdine[1]."</td>";
					echo "<td>".$datiOrdine[2]."</td>";
					echo "<td>".$datiOrdine[3]."</td>";
					echo "<td>".$datiOrdine[4]."</td>";
					echo "<td>".$datiOrdine[5]."</td>";
					echo "<td>".$datiOrdine[6]."</td>";
					echo "<td>".$datiOrdine[7]."</td>";
					echo "<td>".$datiOrdine[8]."</td>";
					echo "<td style='border-right:1px solid gray'>".$datiOrdine[9]."</td>";
				}
				
				if(!array_key_exists($x,$ordiniWeek1))
				{
					echo "<td style='border-left:1px solid gray'></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td style='border-right:1px solid gray'></td>";
				}
				else
				{
					$datiOrdine=explode("|",$ordiniWeek1[$x]);
					echo "<td style='border-left:1px solid gray'>".$datiOrdine[0]."</td>";
					echo "<td>".$datiOrdine[1]."</td>";
					echo "<td>".$datiOrdine[2]."</td>";
					echo "<td>".$datiOrdine[3]."</td>";
					echo "<td>".$datiOrdine[4]."</td>";
					echo "<td>".$datiOrdine[5]."</td>";
					echo "<td>".$datiOrdine[6]."</td>";
					echo "<td>".$datiOrdine[7]."</td>";
					echo "<td>".$datiOrdine[8]."</td>";
					echo "<td style='border-right:1px solid gray'>".$datiOrdine[9]."</td>";
				}
				
				if(!array_key_exists($x,$ordiniWeek2))
				{
					echo "<td style='border-left:1px solid gray'></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td style='border-right:1px solid gray'></td>";
				}
				else
				{
					$datiOrdine=explode("|",$ordiniWeek2[$x]);
					echo "<td style='border-left:1px solid gray'>".$datiOrdine[0]."</td>";
					echo "<td>".$datiOrdine[1]."</td>";
					echo "<td>".$datiOrdine[2]."</td>";
					echo "<td>".$datiOrdine[3]."</td>";
					echo "<td>".$datiOrdine[4]."</td>";
					echo "<td>".$datiOrdine[5]."</td>";
					echo "<td>".$datiOrdine[6]."</td>";
					echo "<td>".$datiOrdine[7]."</td>";
					echo "<td>".$datiOrdine[8]."</td>";
					echo "<td style='border-right:1px solid gray'>".$datiOrdine[9]."</td>";
				}
				
				if(!array_key_exists($x,$ordiniWeek3))
				{
					echo "<td style='border-left:1px solid gray'></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td style='border-right:1px solid gray'></td>";
				}
				else
				{
					$datiOrdine=explode("|",$ordiniWeek3[$x]);
					echo "<td style='border-left:1px solid gray'>".$datiOrdine[0]."</td>";
					echo "<td>".$datiOrdine[1]."</td>";
					echo "<td>".$datiOrdine[2]."</td>";
					echo "<td>".$datiOrdine[3]."</td>";
					echo "<td>".$datiOrdine[4]."</td>";
					echo "<td>".$datiOrdine[5]."</td>";
					echo "<td>".$datiOrdine[6]."</td>";
					echo "<td>".$datiOrdine[7]."</td>";
					echo "<td>".$datiOrdine[8]."</td>";
					echo "<td style='border-right:1px solid gray'>".$datiOrdine[9]."</td>";
				}
				
				if(!array_key_exists($x,$ordiniWeek4))
				{
					echo "<td style='border-left:1px solid gray'></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td></td>";
					echo "<td style='border-right:1px solid gray'></td>";
				}
				else
				{
					$datiOrdine=explode("|",$ordiniWeek4[$x]);
					echo "<td style='border-left:1px solid gray'>".$datiOrdine[0]."</td>";
					echo "<td>".$datiOrdine[1]."</td>";
					echo "<td>".$datiOrdine[2]."</td>";
					echo "<td>".$datiOrdine[3]."</td>";
					echo "<td>".$datiOrdine[4]."</td>";
					echo "<td>".$datiOrdine[5]."</td>";
					echo "<td>".$datiOrdine[6]."</td>";
					echo "<td>".$datiOrdine[7]."</td>";
					echo "<td>".$datiOrdine[8]."</td>";
					echo "<td style='border-right:1px solid gray'>".$datiOrdine[9]."</td>";
				}
			echo "</tr>";
		}		
		
		echo "</table>";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";

	
	function getMaxNOrdini($conn,$stazione,$stazioneVisualizzata,$time)
	{
		$query2="SELECT MAX(t.nOrdini) AS nOrdini FROM (SELECT COUNT(*) AS nOrdini, settimana
				FROM $stazioneVisualizzata
				WHERE stazione='$stazione' AND settimana>'".explode("_",$time[0])[0].explode("_",$time[0])[1]."'
				GROUP BY settimana) t";
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
				return $row2['nOrdini'];
			}
		}
	}
	function getTotale($conn,$settimana,$time,$valore,$stazione,$stazioneVisualizzata)
	{
		if($valore=="docnum")
			$operatore="COUNT";
		else
			$operatore="SUM";
		if($settimana=='residuo')
		{
			$minWeek=explode("_",$time[0]);
			$week=$minWeek[0].$minWeek[1];
			if($stazioneVisualizzata=="gestione_montaggio" && $valore=="mq")
				$query2="SELECT 0 AS $valore FROM $stazioneVisualizzata WHERE settimana<'".$week."' AND stazione='$stazione'";	
			else
				$query2="SELECT CONVERT(INT,ISNULL($operatore($valore),0)) AS $valore FROM $stazioneVisualizzata WHERE settimana<'".$week."' AND stazione='$stazione'";	
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
						return $row2[$valore];
					}
				}
				else
					return 0;
			}
		}
		else
		{
			$element=explode("_",$settimana);
			$week=$element[0].$element[1];
			if($stazioneVisualizzata=="gestione_montaggio" && $valore=="mq")
				$query2="SELECT 0 AS $valore FROM $stazioneVisualizzata WHERE settimana='".$week."' AND stazione='$stazione'";	
			else
				$query2="SELECT CONVERT(INT,ISNULL($operatore($valore),0)) AS $valore FROM $stazioneVisualizzata WHERE settimana='".$week."' AND stazione='$stazione'";	
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
						return $row2[$valore];
					}
				}
				else
					return 0;
			}
		}
	}
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
		$query2="SELECT TOP (100) PERCENT dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne,  ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, CONVERT(INT,ISNULL(dbo.$stazioneVisualizzata.mq, 0)) AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna, dbo.colori_collezioni.colore, dbo.$stazioneVisualizzata.collezione FROM            dbo.colori_collezioni RIGHT OUTER JOIN dbo.$stazioneVisualizzata ON dbo.colori_collezioni.collezione = dbo.$stazioneVisualizzata.collezione WHERE        (dbo.$stazioneVisualizzata.settimana < '$week') AND (dbo.$stazioneVisualizzata.stazione = '$stazione') ORDER BY dbo.$stazioneVisualizzata.docnum";	
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
					echo '<div id="'.$i.'elementOrdineResiduo" class="elementOrdine" draggable="true" ondragstart="drag(event)" ondrop="blockDrop(event)" onclick="'. 'apriPopupDettaglioOrdine(' . htmlspecialchars(json_encode($elementId)) . ','. htmlspecialchars(json_encode($week)) . ')" style="color:#'.$row2["colore"].'">';
					
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
		$query2="SELECT TOP (100) PERCENT dbo.$stazioneVisualizzata.docnum, dbo.$stazioneVisualizzata.stazione, ISNULL(dbo.$stazioneVisualizzata.totale_pezzi, 0)  AS totale_pezzi, ISNULL(dbo.$stazioneVisualizzata.basi_portalavabo, 0) AS basi_portalavabo, ISNULL(dbo.$stazioneVisualizzata.colonne, 0) AS colonne, ISNULL(dbo.$stazioneVisualizzata.pensili, 0) AS pensili, ISNULL(dbo.$stazioneVisualizzata.basi_accostabili, 0) AS basi_accostabili,  ISNULL(dbo.$stazioneVisualizzata.Altro, 0) AS Altro, CONVERT(INT,ISNULL(dbo.$stazioneVisualizzata.mq, 0)) AS mq, dbo.$stazioneVisualizzata.settimana,  dbo.$stazioneVisualizzata.dataConsegna, dbo.colori_collezioni.colore, dbo.$stazioneVisualizzata.collezione FROM            dbo.colori_collezioni RIGHT OUTER JOIN dbo.$stazioneVisualizzata ON dbo.colori_collezioni.collezione = dbo.$stazioneVisualizzata.collezione WHERE (dbo.$stazioneVisualizzata.settimana = '$week') AND (dbo.$stazioneVisualizzata.stazione = '$stazione')  ORDER BY dbo.$stazioneVisualizzata.docnum";	
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
					echo '<div id="'.$i.'elementOrdine'.$week.'" class="elementOrdine" draggable="true" ondragstart="drag(event)" onclick="'. 'apriPopupDettaglioOrdine(' . htmlspecialchars(json_encode($elementId)) . ','. htmlspecialchars(json_encode($week)) . ')" style="color:#'.$row2["colore"].'">';
						
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