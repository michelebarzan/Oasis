<?php

    include "Session.php";
    include "connessione.php";

    $nome=str_replace("'","''",$_REQUEST['nome']);
    $descrizione=str_replace("'","''",$_REQUEST['descrizione']);
    if(isset($_REQUEST['filterConditionsString']))
        $filterConditionsString=str_replace("'","|",$_REQUEST['filterConditionsString']);
    else
        $filterConditionsString="";
    if(isset($_REQUEST['orderByString']))
        $orderByString=$_REQUEST['orderByString'];
    else
        $orderByString="";

    $query2="INSERT INTO [dbo].[salvataggi_filtro_report_ordini_cliente]
                ([nome]
                ,[descrizione]
                ,[filterConditions]
                ,[orderBy]
                ,[utente]
                ,[data])
            VALUES
                ('$nome'
                ,'$descrizione'
                ,'$filterConditionsString'
                ,'$orderByString'
                ,".$_SESSION['id_utente']."
                ,GETDATE())";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        echo "ok";
    }
    else
        die("error".$query2);

?>