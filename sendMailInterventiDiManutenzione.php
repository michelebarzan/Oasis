<?php

    include "Session.php";
    include "connessione.php";

    $id_intervento=$_REQUEST['id_intervento'];
    $utentiInvioMail=json_decode($_REQUEST['JSONutentiInvioMail']);
    
    foreach ($utentiInvioMail as $mail)
    {
        echo shell_exec('C:\cmail\cmail.exe -host:noreply2@oasisgroup.it:Serglo1234@smtp.office365.com:587 -starttls -to:'.$mail.' -from:noreply2@oasisgroup.it "-subject:Nuovo intervento di manutenzione inserito da '.$_SESSION["Username"].'" "-body:Codice intervento: '.$id_intervento.'" 2>&1');
    }
?>