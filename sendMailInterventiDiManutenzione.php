<?php

    include "Session.php";
    include "connessione.php";

    $id_intervento=$_REQUEST['id_intervento'];
    $utentiInvioMail=json_decode($_REQUEST['JSONutentiInvioMail']);

    $mail_insert="";
    
    foreach ($utentiInvioMail as $mail)
    {
        $mail_insert=$mail_insert.$mail.";";
        //echo shell_exec('C:\cmail\cmail.exe -host:noreply2@oasisgroup.it:Serglo1234@smtp.office365.com:587 -starttls -to:'.$mail.' -from:noreply2@oasisgroup.it "-subject:Nuovo intervento di manutenzione inserito da '.$_SESSION["Username"].'" "-body:Codice intervento: '.$id_intervento.'" 2>&1');
    }
    $mail_insert = rtrim($mail_insert, ";");
    $query5="DELETE FROM [dbo].[InvioMail]";	
    $result5=sqlsrv_query($conn,$query5);
    if($result5==TRUE)
    {
        $query4="INSERT INTO [dbo].[InvioMail] ([Mail1],[Subject],[Body]) VALUES ('$mail_insert','Nuovo intervento di manutenzione inserito da ".$_SESSION["Username"]."','Codice intervento: ".$id_intervento."')";	
        $result4=sqlsrv_query($conn,$query4);
        if($result4==TRUE)
        {
            exec('"C:\Oasis_mail\invio.bat"');
			die("ok");
        }
        else
            die("error4");
    }
    else
        die("error5");
?>