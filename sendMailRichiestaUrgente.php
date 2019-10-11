<?php

    include "Session.php";
    include "connessione.php";

    $utentiExtra=json_decode($_REQUEST['JSONutentiExtra']);
    $oggetto=$_REQUEST['oggettoMail'];

    $query2="SELECT MAX(id_richiesta) AS id_richiesta FROM richieste_e_faq WHERE utente_creazione=".$_SESSION['id_utente'];	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $id_richiesta=$row2["id_richiesta"];
        }
    }
    else
        die("error1");

    foreach ($utentiExtra as $id_utente)
    {
        $query3="SELECT ISNULL(mail,'nomail') as mail FROM utenti WHERE id_utente=$id_utente";	
        $result3=sqlsrv_query($conn,$query3);
        if($result3!==FALSE)
        {
            while($row3=sqlsrv_fetch_array($result3))
            {
                $mail=$row3["mail"];
                if($mail!="nomail")
                    echo shell_exec('C:\cmail\cmail.exe -host:noreply@oasisgroup.it:Serglo123@smtp.office365.com -to:'.$mail.' -from:noreply@oasisgroup.it "-subject:Richiesta urgente di '.$_SESSION["Username"].', codice: '.$id_richiesta.'" "-body:Oggetto richiesta: '.$oggetto.'" 2>&1');
            }
        }
        else
        {
            echo "error";
        }
    }
?>