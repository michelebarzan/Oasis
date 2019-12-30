<?php

    include "Session.php";
    include "connessione.php";

    $data=json_decode($_REQUEST['JSONdata']);
    $utentiExtra=json_decode($_REQUEST['JSONutentiExtra']);

    $query2="INSERT INTO richieste_e_faq (";
    foreach ($data as $columnEnc)
    {
        $column=get_object_vars(json_decode($columnEnc));
        $query2.="[".$column['name']."],";
    }
    $query2.="[utente_creazione],";
    $query2.="[data_creazione],";
    $query2.="[stato]) VALUES (";

    foreach ($data as $columnEnc)
    { 
        $column=get_object_vars(json_decode($columnEnc));
        $value=$column['value'];
        $value=str_replace("'","''",$value);
        $value=str_replace("à","a",$value);
        $value=str_replace("è","e",$value);
        $value=str_replace("ì","i",$value);
        $value=str_replace("ò","o",$value);
        $value=str_replace("ù","u",$value);
        $value=str_replace("€","eur",$value);
        $query2.="'".$value."',";
    }
    $query2.=$_SESSION['id_utente'].",";
    $query2.="getdate(),";
    $query2.="'Aperta')";
    
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        foreach ($utentiExtra as $id_utente)
        {
            $query3="INSERT INTO [dbo].[utenti_incaricati_richieste] ([utente] ,[richiesta]) VALUES ($id_utente,(SELECT MAX(id_richiesta) AS id_richiesta FROM richieste_e_faq WHERE utente_creazione=".$_SESSION['id_utente']."))";	
            $result3=sqlsrv_query($conn,$query3);
            if($result3==FALSE)
            {
                die("error");
            }
        }
        echo "ok";
    }
    else
        die("error");
?>