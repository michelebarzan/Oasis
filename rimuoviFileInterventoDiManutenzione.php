
<?php

    include "Session.php";
    include "connessione.php";

    $id_intervento=$_REQUEST['id_intervento'];

    $qPreferiti="DELETE FROM allegati_interventi_di_manutenzione WHERE intervento=$id_intervento";
    $rPreferiti=sqlsrv_query($conn,$qPreferiti);

?>