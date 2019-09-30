<?php
    include "Session.php";
    include "connessione.php";

    $id_richiesta=$_REQUEST['id_richiesta'];
    $username=$_REQUEST['username'];

    $query3="DELETE FROM [utenti_incaricati_richieste] WHERE richiesta = $id_richiesta AND utente=(SELECT id_utente FROM utenti WHERE username='$username')";	
    $result3=sqlsrv_query($conn,$query3);
    if($result3==TRUE)
    {
        echo "ok";
    }
    else
        die("error");
?>