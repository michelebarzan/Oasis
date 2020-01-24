<?php

    include "Session.php";
    include "connessione.php";

    $utentiInvioMail=json_decode($_REQUEST['JSONutentiInvioMail']);
    $oggetto=$_REQUEST['oggettoMail'];

    set_time_limit(240);

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
        die("queryerror");

    $query6="SELECT * FROM richieste_e_faq WHERE id_richiesta=$id_richiesta";	
    $result6=sqlsrv_query($conn,$query6);
    if($result6==TRUE)
    {
        while($row6=sqlsrv_fetch_array($result6))
        {
            $id_richiesta=$row6["id_richiesta"];
        }
    }
    else
        die("queryerror");

    $mail_insert="";

    foreach ($utentiInvioMail as $id_utente)
    {
        $query3="SELECT ISNULL(mail,'nomail') as mail FROM utenti WHERE id_utente=$id_utente";	
        $result3=sqlsrv_query($conn,$query3);
        if($result3!==FALSE)
        {
            while($row3=sqlsrv_fetch_array($result3))
            {
                $mail=$row3["mail"];
                if($mail!="nomail")
                {
                    $mail_insert=$mail_insert.$mail.";";
                }
            }
        }
        else
        {
            die("queryerror");
        }
    }
    $mail_insert = rtrim($mail_insert, ";");
    $query5="DELETE FROM [dbo].[InvioMail]";	
    $result5=sqlsrv_query($conn,$query5);
    if($result5==TRUE)
    {
        $body="Oggetto richiesta: ".$oggetto.". Consulta la pagina http://remote.oasisgroup.it/oasis/redirect.php?page=richieste";
        $query4="INSERT INTO [dbo].[InvioMail] ([Mail1],[Subject],[Body]) VALUES ('$mail_insert','Richiesta urgente di ".$_SESSION['Username'].", codice: $id_richiesta','$body')";	
        $result4=sqlsrv_query($conn,$query4);
        if($result4==TRUE)
        {
			exec('"C:\Oasis_mail\invio.bat"');
			die("ok");
        }
        else
            die("queryerror");
    }
    else
        die("queryerror");
?>