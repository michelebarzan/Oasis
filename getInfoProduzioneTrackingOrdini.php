<?php

    include "connessione.php";

    $ordine=$_REQUEST["ordine"];

    $registrazioni_produzione=[];

    $query2="SELECT MAX(dbo.registrazioni_produzione.dataOra) AS dataOra, dbo.registrazioni_produzione.stazione, dbo.registrazioni_produzione.ordine, dbo.registrazioni_produzione.chiuso, dbo.utenti.username
            FROM dbo.registrazioni_produzione INNER JOIN
                                    dbo.utenti ON dbo.registrazioni_produzione.utente = dbo.utenti.id_utente
            GROUP BY dbo.registrazioni_produzione.stazione, dbo.registrazioni_produzione.ordine, dbo.registrazioni_produzione.chiuso, dbo.utenti.username
            HAVING (dbo.registrazioni_produzione.ordine = '$ordine')";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $riga["dataOra"]=$row2['dataOra'];
            $riga["dataOraString"]=$row2['dataOra']->format("d/m/Y H:i:s");
            $riga["stazione"]=$row2['stazione'];
            $riga["ordine"]=$row2['ordine'];
            $riga["chiuso"]=$row2['chiuso'];
            $riga["username"]=$row2['username'];

            array_push($registrazioni_produzione,$riga);
        }
        echo json_encode($registrazioni_produzione);
    }
    else
        die("error0".$query2);

?>