<?php
	//include "Session.php";
	include "connessione.php";
	
	$settimana=$_REQUEST['week'];
	$stazione=$_REQUEST['stazione'];
	
	$week=str_replace("_","",$settimana);
	
	if($stazione=="PTO_PTO")
	{
		$stazioneVisualizzata="gestione_punto_punto";
	}
	if($stazione=="CAB_LAC" || $stazione=="CAB_ACR")
	{
		$stazioneVisualizzata="gestione_verniciatura";
	}
	if($stazione=="MNT_MAST" || $stazione=="MNT_HOME" || $stazione=="MNT_LUT" || $stazione=="MNT_ACA")
	{
		$stazioneVisualizzata="gestione_montaggio";
	}

	
	if(set_time_limit(120))
	{
		$query="SELECT DISTINCT docnum FROM $stazioneVisualizzata WHERE settimana='$week' AND stazione='$stazione'";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$i=0;
			while($row=sqlsrv_fetch_array($result))
			{
				//printjs
				//$path='oasis/pdf_ordini/H'.$row["docnum"].'.pdf';
				//echo $path."|";
				//echo $row["docnum"]."|";
				
				$output3 = shell_exec('"C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe" /p /h C:\\xampp\\htdocs\\Oasis\\pdf_ordini\\H'.$row["docnum"].'.pdf');
		
				//echo $output3;
				echo "ok";
				//echo '"C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe" /p /h C:\\xampp\\htdocs\\Oasis\\pdf_ordini\\H'.$row["docnum"].'.pdf';
				
				$i++;
			}
		}
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	function getODP($conn,$docnum)
	{
		$query2="SELECT BELNR_ID,KNDNAME FROM stampa_ordini WHERE AUFTRAGINT=$docnum";	
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
				return $row2['BELNR_ID']." | ".$row2['KNDNAME'];
			}
		}
	}
	function getBarcode($conn,$docnum)
	{
		$query2="SELECT barrcode FROM stampa_ordini WHERE AUFTRAGINT=$docnum";	
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
				return $row2['barrcode'];
			}
		}
	}
	function getDataConsegna($conn,$docnum)
	{
		$query2="SELECT LFGDAT FROM stampa_ordini WHERE AUFTRAGINT=$docnum";	
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
				return $row2['LFGDAT']->format('d/m/Y');
			}
		}
	}
	function getTO($conn,$docnum)
	{
		$query2="SELECT TipoOperazione FROM stampa_ordini WHERE AUFTRAGINT=$docnum";	
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
				return $row2['TipoOperazione'];
			}
		}
	}
	function getFase($conn,$docnum,$RESOURCETYPE,$AG_ID,$Codice_0)
	{
		$query2="SELECT Fase FROM stampa_ordini WHERE AUFTRAGINT=$docnum AND RESOURCETYPE='$RESOURCETYPE' AND  AG_ID='$AG_ID' AND Codice_0='$Codice_0'";	//echo $query2;
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
				return $row2['Fase'];
			}
		}
	}
?>