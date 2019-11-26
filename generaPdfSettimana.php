<?php
	
	//echo '<div id="containerCircleSpinner" style="display:table"><div id="middle"><div id="inner"><div class="spin-wrapper"><div class="spinner"></div><div class="spinnerLabel">Caricamento in corso...</div></div></div></div></div>';
	
	include "connessione.php";
	//include "Session.php";

	$week=$_REQUEST['week'];
	$stazione=$_REQUEST['stazione'];
	$stampaordine=$_REQUEST['stampaordine'];
	
	if($stazione=="CAB_LAC" || $stazione=="CAB_ACR")
		$stazioneVisualizzata="gestione_verniciatura";
	if($stazione=="PTO_PTO")
		$stazioneVisualizzata="gestione_punto_punto";
	if($stazione=="MNT_MAST" || $stazione=="MNT_ACA" || $stazione=="MNT_HOME" || $stazione=="MNT_LUT")
		$stazioneVisualizzata="gestione_montaggio";
	
	$settimanaTmp=substr($week, 0, 4)."-".substr($week, 4, 6);
	
	set_time_limit(3000);
	
	$dataInizio=getDays($conn,$week)[0];
	$dataFine=getDays($conn,$week)[1];
	
	svuotaTmp_stampa_schede_produzione($conn);
	riempiTmp_stampa_schede_produzione($conn,$stazione,$settimanaTmp,$week,$dataInizio,$dataFine,$stazioneVisualizzata,$stampaordine);
	
	exec( '"C:\Program Files (x86)\Microsoft Office\root\Office16\MSACCESS.EXE" "C:\\xampp\\htdocs\\oasis\\files\\stampe_settimane\\Stampa_schede.accdb"');
	
	$res = shell_exec("if exist C:\\xampp\\htdocs\\oasis\\files\\stampe_settimane\\".$stazione."_".$settimanaTmp.".pdf echo generato1 2>&1");
	
	$res2 = shell_exec("if not exist C:\\xampp\\htdocs\\oasis\\files\\stampe_settimane\\".$stazione."_".$settimanaTmp.".pdf echo generato0 2>&1");
	
	echo $res;
	echo $res2;
	
	/*$file="C:\\xampp\\htdocs\\oasis\\files\\stampe_settimane\\".$stazione."_".$settimanaTmp.".pdf";
	
	if (file_exists($file)) 
	{
		echo "ok1";
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename="'.basename($file).'"');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($file));
		readfile($file);
		//Cancello file pdf
		exec('del "C:\\xampp\\htdocs\\oasis\\files\\stampe_settimane\\'.$stazione.'_'.$settimanaTmp.'.pdf"');
		exit;
	}
	else
		echo "filenotfound";*/
	

	
	function svuotaTmp_stampa_schede_produzione($conn)
	{
		$query="DELETE tmp_stampa_schede_produzione FROM tmp_stampa_schede_produzione";
	
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "error";
		}
	}
	function riempiTmp_stampa_schede_produzione($conn,$stazione,$settimanaTmp,$week,$dataInizio,$dataFine,$stazioneVisualizzata,$stampaordine)
	{
		$query="INSERT INTO [dbo].[tmp_stampa_schede_produzione]
		   ([stazione]
		   ,[docnum]
		   ,[settimana]
		   ,[dataInizio]
		   ,[dataFine]
		   ,[stampaordine]) 
		   SELECT '$stazione'
		   ,$stazioneVisualizzata.docnum
		   ,'$settimanaTmp'
		   ,'$dataInizio'
		   ,'$dataFine'
		   ,'$stampaordine' FROM $stazioneVisualizzata WHERE settimana='$week' AND stazione='$stazione'";
	
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
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
				return [$row['min']->format('d/m/Y'),$row['max']->format('d/m/Y')];
			}
		}
	}
?>
