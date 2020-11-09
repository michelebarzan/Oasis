<?php

    include "connessione.php";

    $ordine=$_REQUEST["ordine"];

    $ordini_fornitori=[];

    $query2="SELECT dbo.report_ordini_clienti_view.ordine_cliente, dbo.report_ordini_clienti_view.ordine_fornitore, dbo.report_ordini_clienti_view.nome_fornitore, dbo.report_ordini_clienti_view.data_creazione_ordine, 
                ISNULL(dbo.report_ordini_clienti_view.importo_ordine_fornitore,0) AS importo_ordine_fornitore, dbo.report_ordini_clienti_view.data_arrivo_merce, dbo.registrazioni_ricevimento_merci.chiuso, dbo.registrazioni_ricevimento_merci.ricevuto, 
                dbo.registrazioni_ricevimento_merci.dataOra, dbo.utenti.username
            FROM dbo.utenti INNER JOIN
                dbo.registrazioni_ricevimento_merci ON dbo.utenti.id_utente = dbo.registrazioni_ricevimento_merci.utente RIGHT OUTER JOIN
                dbo.report_ordini_clienti_view ON dbo.registrazioni_ricevimento_merci.ordine_acquisto = dbo.report_ordini_clienti_view.ordine_fornitore
            WHERE (dbo.report_ordini_clienti_view.ordine_cliente = N'$ordine') AND (dbo.report_ordini_clienti_view.ordine_fornitore IS NOT NULL)";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $ordine_fornitore["ordine"]=$row2['ordine_cliente'];
            $ordine_fornitore["ordine_fornitore"]=$row2['ordine_fornitore'];
            $ordine_fornitore["nome_fornitore"]=utf8_encode($row2['nome_fornitore']);
            $ordine_fornitore["data_creazione_ordine"]=$row2['data_creazione_ordine'];
            if($row2['data_creazione_ordine']==null)
                $ordine_fornitore['data_creazione_ordineString']=null;
            else
                $ordine_fornitore["data_creazione_ordineString"]=$row2['data_creazione_ordine']->format("d/m/Y H:i:s");
            $ordine_fornitore["importo_ordine_fornitore"]=$row2['importo_ordine_fornitore'];
            $ordine_fornitore["data_arrivo_merce_prevista"]=$row2['data_arrivo_merce'];
            if($row2['data_arrivo_merce']==null)
                $ordine_fornitore['data_arrivo_merce_previstaString']=null;
            else
                $ordine_fornitore["data_arrivo_merce_previstaString"]=$row2['data_arrivo_merce']->format("d/m/Y H:i:s");
            $ordine_fornitore["ricevuto"]=$row2['ricevuto'];
            $ordine_fornitore["chiuso"]=$row2['chiuso'];
            $ordine_fornitore["data_arrivo_merce"]=$row2['dataOra'];
            if($row2['dataOra']==null)
                $ordine_fornitore['data_arrivo_merceString']=null;
            else
                $ordine_fornitore["data_arrivo_merceString"]=$row2['dataOra']->format("d/m/Y H:i:s");
            $ordine_fornitore["utente_ricevimento_merci"]=$row2['username'];

            array_push($ordini_fornitori,$ordine_fornitore);
        }
        echo json_encode($ordini_fornitori);
    }
    else
        die("error0".$query2);

?>