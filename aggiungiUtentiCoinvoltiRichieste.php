<?php
    include "Session.php";
    include "connessione.php";

    $utenti=$_REQUEST['utenti'];
    $id_richiesta=$_REQUEST['id_richiesta'];

    $utenti_in=implode(",",$utenti);

    $utenti_aggiunti=[];

    foreach ($utenti as $id_utente)
    {
        $query2="INSERT INTO [dbo].[utenti_incaricati_richieste] ([utente],[richiesta]) VALUES ($id_utente,$id_richiesta)";
        $result2=sqlsrv_query($conn,$query2);
        if($result2==TRUE)
        {
            
        }
        else
            die("error1");
    }
    $query3="SELECT DISTINCT id_utente,username FROM utenti  WHERE id_utente IN ($utenti_in)";	
    $result3=sqlsrv_query($conn,$query3);
    if($result3==TRUE)
    {
        while($row3=sqlsrv_fetch_array($result3))
        {
            $utente["id_utente"]=$row3['id_utente'];
            $utente["username"]=$row3['username'];

            array_push($utenti_aggiunti,$utente);
        }
    }
    else
        die("error2");

    echo json_encode($utenti_aggiunti);
?>