<?php
	include "session.php";
	include "connessione.php";
		
	if(set_time_limit(240))
	{

		$shellOutput = shell_exec("robocopy \\\\192.168.69.15\\produzione\\fotoProduzioneAndroid C:\\xampp\\htdocs\\OasisFotoProduzione\\fotoProduzioneAndroid /S /Z 2>&1");
		
		//echo $shellOutput;
		
		if (strpos($shellOutput, 'ERRORE') !== false) 
		{
			echo 'ERRORE';
			die();
		}
		else
		{
			$query2="INSERT INTO sincronizzazione_foto_ordini (utente,[data]) VALUES (".$_SESSION['id_utente'].",GETDATE())";	
			$result2=sqlsrv_query($conn,$query2);
			if($result2==FALSE)
			{
				echo 'ERRORE';
				die();
			}
			else
			{
				echo '<i class="fal fa-check" style="font-size:140%;margin-right:20px;"></i>Allegati sincronizzati';
				die();
			}
		}
		
		echo 'ERRORE';
	}
	else
		echo 'ERRORE';
	
?>