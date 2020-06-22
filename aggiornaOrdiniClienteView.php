<?php

    include "connessione.php";

    set_time_limit(240);

    if(isset($_REQUEST["id_utente"]))
        $id_utente=$_REQUEST["id_utente"];
    else
        $id_utente=getIdUtente($conn,'admin');

    $q="DELETE FROM report_ordini_cliente_table";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error");
        insert_log_aggiorna_report_ordini_cliente_table($conn,"error",$id_utente);
    }
    else
    {
        $query2="INSERT INTO [dbo].[report_ordini_cliente_table]
                    ([ordine_cliente]
                    ,[codice_cliente]
                    ,[nome_cliente]
                    ,[data_spedizione]
                    ,[Statistical_group_code]
                    ,[Statistical_group_name]
                    ,[linea_business]
                    ,[tipo]
                    ,[tipo_pagamento]
                    ,[fatturato_spedito]
                    ,[fatturato_da_spedire]
                    ,[note]
                    ,[ordine_fornitore]
                    ,[codice_fornitore]
                    ,[nome_fornitore]
                    ,[data_creazione_ordine]
                    ,[importo_ordine_fornitore]
                    ,[data_arrivo_merce]
                    ,[importo_totale]
                    ,[importo_incassato]
                    ,[importo_da_pagare]
                    ,[stato])
                SELECT * FROM aggiorna_report_ordini_cliente_table";
        $result2=sqlsrv_query($conn,$query2);
        if($result2==TRUE)
        {
            insert_log_aggiorna_report_ordini_cliente_table($conn,"ok",$id_utente);
        }
        else
        {
            die("error");
            insert_log_aggiorna_report_ordini_cliente_table($conn,"error",$id_utente);
        }
    }

    function getIdUtente($conn,$username) 
    {
        $q="SELECT id_utente FROM utenti WHERE username='$username'";
        $r=sqlsrv_query($conn,$q);
        if($r==FALSE)
        {
            die("error");
            insert_log_aggiorna_report_ordini_cliente_table($conn,"error",$id_utente);
        }
        else
        {
            while($row=sqlsrv_fetch_array($r))
            {
                return $row['id_utente'];
            }
        }
    }
    function insert_log_aggiorna_report_ordini_cliente_table($conn,$esito,$id_utente)
    {
        $query2="INSERT INTO [dbo].[log_aggiorna_report_ordini_cliente_table]
                            ([utente]
                            ,[dataOra]
                            ,[esito])
                 VALUES ($id_utente,GETDATE(),'$esito')";
        $result2=sqlsrv_query($conn,$query2);
        if($result2==FALSE)
            die("error");
    }

?>