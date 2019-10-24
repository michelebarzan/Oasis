<?php

    include "Session.php";
    include "connessione.php";

    $query1="SELECT dbo.sincronizzazione_foto_ordini.data, dbo.utenti.username
            FROM dbo.sincronizzazione_foto_ordini INNER JOIN dbo.utenti ON dbo.sincronizzazione_foto_ordini.utente = dbo.utenti.id_utente
            WHERE (dbo.sincronizzazione_foto_ordini.data =(SELECT MAX(data) AS Expr1 FROM dbo.sincronizzazione_foto_ordini AS sincronizzazione_foto_ordini_1))";	
    $result1=sqlsrv_query($conn,$query1);
    if($result1==FALSE)
    {
        die("error");
    }
    else
    {
        while($row=sqlsrv_fetch_array($result1))
        {
            echo "Sincronizzate da ".$row["username"]." il ".$row["data"]->format('d/m/Y H:i:s');
        }
    }
?>