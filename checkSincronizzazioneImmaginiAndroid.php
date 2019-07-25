<?php
	include "session.php";
	include "connessione.php";
				
	if(set_time_limit(60))
	{
		$foldersOrdini=[];
		$foldersOrdiniStazioni=[];
		$foldersOrdiniStazioniImmagini=[];
		$percorsoSql=[];
		
		$shellOutput = scandir("c:/xampp/htdocs/OasisFotoProduzione/fotoproduzioneandroid");
		
		foreach ($shellOutput as $value) 
		{
			if(is_numeric($value) && strlen($value)==8)
				array_push($foldersOrdini,$value);
		}
		foreach ($foldersOrdini as $value) 
		{
			$shellOutput = scandir("c:/xampp/htdocs/OasisFotoProduzione/fotoproduzioneandroid/".$value);
			foreach ($shellOutput as $value2) 
			{
				if($value2!="." && $value2!="..")
					array_push($foldersOrdiniStazioni,$value."/".$value2);
			}
		}
		foreach ($foldersOrdiniStazioni as $value) 
		{
			$shellOutput = scandir("c:/xampp/htdocs/OasisFotoProduzione/fotoproduzioneandroid/".$value);
			foreach ($shellOutput as $value2) 
			{
				if($value2!="." && $value2!=".." && $value2!="Thumbs.db")
					array_push($foldersOrdiniStazioniImmagini,$value."/".$value2);
			}
		}
		
		$query2="select percorso from allegati_registrazioni_produzione_view";	
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
					array_push($percorsoSql,$row2['percorso']);
				}
		}
		if(count($percorsoSql)==count($foldersOrdiniStazioniImmagini))
			echo "ok";
		else
			echo "ko";
		/*
		sort($percorsoSql);
		sort($foldersOrdiniStazioniImmagini);
		
		if(count($percorsoSql)>count($foldersOrdiniStazioniImmagini))
		{
			for($i=0;$i<count($percorsoSql);$i++) 
			{
				echo $percorsoSql[$i]."-".$foldersOrdiniStazioniImmagini[$i];
			}
		}
		else
		{
			for($i=0;$i<count($foldersOrdiniStazioniImmagini);$i++) 
			{
				echo $percorsoSql[$i]."-".$foldersOrdiniStazioniImmagini[$i];
			}
		}*/
		//echo implode(" | ",$foldersOrdiniStazioniImmagini);
	}
	else
		echo 'ERRORE';
	
?>