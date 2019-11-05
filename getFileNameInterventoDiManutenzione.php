<?php

    include "Session.php";
    include "connessione.php";

    $id_intervento=$_REQUEST["id_intervento"];
    $filename="nofile";

    $query2="SELECT * FROM dbo.allegati_interventi_di_manutenzione WHERE intervento=$id_intervento";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $percorso=$row2['percorso'];
            $filename=str_replace("C:\\xampp\\htdocs\\\\OasisAllegatiInterventiDiManutenzione\\","",$percorso);
        }
    }
    echo $filename;
?>