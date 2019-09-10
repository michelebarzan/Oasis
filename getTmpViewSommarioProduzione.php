<?php
    include "connessione.php";
    include "Session.php";

    $settimana=$_REQUEST['settimana'];
    $stazione=$_REQUEST['stazione'];

    $nTentativi=10;

    for($x = 0; $x < $nTentativi; $x++)
    {
        $queryRighe="SELECT * FROM tmpViewSommarioProduzione".$x;
        $resultRighe=sqlsrv_query($conn,$queryRighe);
        if($resultRighe==FALSE)
        {
            break;
        }
    }

	$query2="CREATE VIEW tmpViewSommarioProduzione".$x." AS SELECT derivedtbl_1.docnum, CONVERT(decimal(4, 2), derivedtbl_1.mq) AS mq, derivedtbl_1.basi_portalavabo, derivedtbl_1.basi_accostabili, derivedtbl_1.pensili, derivedtbl_1.colonne, derivedtbl_1.Altro, derivedtbl_1.dataConsegna, 
            derivedtbl_1.totale_pezzi, derivedtbl_1.stazione, derivedtbl_1.settimana, derivedtbl_1.stato, dbo.collezione.collezione
            FROM (SELECT docnum, mq, basi_portalavabo, basi_accostabili, pensili, colonne, Altro, dataConsegna, totale_pezzi, stazione, settimana, stato
            FROM dbo.report_sommario_produzione_montaggio_short
            UNION ALL
            SELECT docnum, mq, basi_portalavabo, basi_accostabili, pensili, colonne, Altro, dataConsegna, totale_pezzi, stazione, settimana, stato
            FROM dbo.report_sommario_produzione_verniciatura_short
            UNION ALL
            SELECT docnum, mq, basi_portalavabo, basi_accostabili, pensili, colonne, Altro, dataConsegna, totale_pezzi, stazione, settimana, stato
            FROM dbo.report_sommario_produzione_punto_punto_short) AS derivedtbl_1 LEFT OUTER JOIN
            dbo.collezione ON derivedtbl_1.docnum = dbo.collezione.DocNum
            WHERE (derivedtbl_1.settimana = $settimana) AND (derivedtbl_1.stazione = '$stazione')";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		die("error");
	}
	else
	{
		echo "tmpViewSommarioProduzione".$x;
	}
?>