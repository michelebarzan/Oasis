<?php

	include "Session.php";
	include "connessione.php";
		
	$data=[];
		
	$query2="SELECT TOP(30) * FROM gantt_stato_ordini_4 ORDER BY data_creazione DESC";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		die("error");
	}
	else
	{
        $i=1;
		while($row2=sqlsrv_fetch_array($result2))
		{
            $ordine["id"]=$i;
			$ordine["text"]=$row2['docnum'];
			
            $oldDataCreazione=$row2['data_creazione'];

			$giornoCreazione=explode("/",$oldDataCreazione)[0];
			$meseCreazione=explode("/",$oldDataCreazione)[1];
			$annoCreazione=explode("/",$oldDataCreazione)[2];

			$newDataCreazione=$annoCreazione."-".$meseCreazione."-".$giornoCreazione;

			$oldDataScadenza=$row2['data_scadenza'];

			$giornoScadenza=explode("/",$oldDataScadenza)[0];
			$meseScadenza=explode("/",$oldDataScadenza)[1];
			$annoScadenza=explode("/",$oldDataScadenza)[2];

			$newDataScadenza=$annoScadenza."-".$meseScadenza."-".$giornoScadenza;
            
			$ordine["start_date"]=$newDataCreazione;
			$ordine["end_date"]=$newDataScadenza;
            //$ordine["duration"]=null;
            $ordine["parent"]=0;
            $ordine["progress"]=0;
            $ordine["open"]=true;

            array_push($data,$ordine);
            $i++;
		}
	}
	//var_dump($data);
	echo json_encode($data);
	
?>