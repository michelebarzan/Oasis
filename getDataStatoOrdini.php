<?php

	include "Session.php";
	include "connessione.php";
		
	$data=[];
	$links=[];
	
	set_time_limit(240);

	$query2="SELECT TOP (100) PERCENT dbo.gantt_stato_ordini_no_ricevimento_merci_3.id, 
			CASE WHEN dbo.gantt_stato_ordini_no_ricevimento_merci_3.stazione = '' THEN dbo.gantt_stato_ordini_no_ricevimento_merci_3.docnum ELSE dbo.gantt_stato_ordini_no_ricevimento_merci_3.stazione END AS text, 
			dbo.gantt_stato_ordini_no_ricevimento_merci_3.data_creazione AS start_date, dbo.gantt_stato_ordini_no_ricevimento_merci_3.data_scadenza AS end_date, CONVERT(varchar(10), 
			dbo.gantt_stato_ordini_no_ricevimento_merci_3.lunedi, 103) AS start_date_stazione, CONVERT(varchar(10), dbo.gantt_stato_ordini_no_ricevimento_merci_3.lunedi + 4, 103) AS end_date_stazione, 
			CASE WHEN stazione = '' THEN NULL ELSE deriv.parent END AS parent, dbo.gantt_stato_ordini_no_ricevimento_merci_3.docnum, dbo.gantt_stato_ordini_no_ricevimento_merci_3.stazione, 
			dbo.gantt_stato_ordini_no_ricevimento_merci_3.settimana, dbo.gantt_stato_ordini_no_ricevimento_merci_3.ordinamento
			FROM dbo.gantt_stato_ordini_no_ricevimento_merci_3 INNER JOIN
			(SELECT MIN(id) AS parent, docnum
			FROM dbo.gantt_stato_ordini_no_ricevimento_merci_3 AS gantt_stato_ordini_no_ricevimento_merci_3_1
			GROUP BY docnum) AS deriv ON dbo.gantt_stato_ordini_no_ricevimento_merci_3.docnum = deriv.docnum
			WHERE (left(dbo.gantt_stato_ordini_no_ricevimento_merci_3.docnum,2) ='19')
			ORDER BY dbo.gantt_stato_ordini_no_ricevimento_merci_3.docnum DESC, start_date DESC, dbo.gantt_stato_ordini_no_ricevimento_merci_3.ordinamento
			OPTION ( QUERYTRACEON 9481 )";
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
			$ordine["id"]=$row2['id'];
			$ordine["text"]=$row2['text'];
			if($row2['parent']==null || $row2['parent']=="null" || $row2['parent']=="")
			{
				$oldDataCreazione=$row2['start_date'];

				$giornoCreazione=explode("/",$oldDataCreazione)[0];
				$meseCreazione=explode("/",$oldDataCreazione)[1];
				$annoCreazione=explode("/",$oldDataCreazione)[2];

				$newDataCreazione=$annoCreazione."-".$meseCreazione."-".$giornoCreazione;

				$oldDataScadenza=$row2['end_date'];

				$giornoScadenza=explode("/",$oldDataScadenza)[0];
				$meseScadenza=explode("/",$oldDataScadenza)[1];
				$annoScadenza=explode("/",$oldDataScadenza)[2];

				$newDataScadenza=$annoScadenza."-".$meseScadenza."-".$giornoScadenza;
				
				$ordine["start_date"]=$newDataCreazione;
				$ordine["end_date"]=$newDataScadenza;

				$ordine["parent"]=0;
			}
			else
			{
				$oldDataCreazione=$row2['start_date_stazione'];

				$giornoCreazione=explode("/",$oldDataCreazione)[0];
				$meseCreazione=explode("/",$oldDataCreazione)[1];
				$annoCreazione=explode("/",$oldDataCreazione)[2];

				$newDataCreazione=$annoCreazione."-".$meseCreazione."-".$giornoCreazione;

				$oldDataScadenza=$row2['end_date_stazione'];

				$giornoScadenza=explode("/",$oldDataScadenza)[0];
				$meseScadenza=explode("/",$oldDataScadenza)[1];
				$annoScadenza=explode("/",$oldDataScadenza)[2];

				$newDataScadenza=$annoScadenza."-".$meseScadenza."-".$giornoScadenza;
				
				$ordine["start_date"]=$newDataCreazione;
				$ordine["end_date"]=$newDataScadenza;

				$ordine["parent"]=$row2['parent'];

				//LINKS
				$link["id"]=$i;
				$link["source"]=$row2['parent'];
				$link["target"]=$row2['id'];
				$link["type"]=1;

				array_push($links,$link);

				$i++;
			}
            $ordine["progress"]=0;
			$ordine["open"]=true;
			
			array_push($data,$ordine);
			
		}
	}

	$response=[];
	array_push($response,json_encode($data));
	array_push($response,json_encode($links));
	
	echo json_encode($response);
	
?>