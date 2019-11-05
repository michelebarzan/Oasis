<?php

    include "Session.php";
    include "connessione.php";

    $titolo=str_replace("'","''",$_REQUEST['titolo']);
    $tipo=$_REQUEST['tipo'];
    $fornitore=$_REQUEST['fornitore'];
    $note=str_replace("'","''",$_REQUEST['note']);

    $query2="INSERT INTO [dbo].[interventi_di_manutenzione]
            ([titolo]
            ,[tipo]
            ,[fornitore]
            ,[note]
            ,[utente]
            ,[data])
            VALUES
            ('$titolo'
            ,'$tipo'
            ,'$fornitore'
            ,'$note'
            ,".$_SESSION['id_utente']."
            ,GETDATE())";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        $query3="SELECT MAX (id_intervento) AS id_intervento FROM interventi_di_manutenzione WHERE utente=".$_SESSION['id_utente'];	
        $result3=sqlsrv_query($conn,$query3);
        if($result3==FALSE)
        {
            die("error1\n\nQ:".$query3."\n\nE:".print_r(sqlsrv_errors(),TRUE));
        }
        else
        {
            while($row3=sqlsrv_fetch_array($result3))
            {
                echo $row3['id_intervento'];
            }
        }
    }
    else
        die("error2\n\nQ:".$query2."\n\nE:".print_r(sqlsrv_errors(),TRUE));
?>