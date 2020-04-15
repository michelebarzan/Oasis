<?php

    include "Session.php";
    include "connessione.php";

    $id_salvataggio=$_REQUEST['id_salvataggio'];

    $query2="DELETE FROM [dbo].[salvataggi_filtro_report_ordini_cliente] WHERE id_salvataggio=$id_salvataggio";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        echo "ok";
    }
    else
        die("error".$query2);

?>