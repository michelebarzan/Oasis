<?php

    include "connessione.php";

    $id_lotto=$_REQUEST["id_lotto"];

    $articoliLotto=[];
    $articoli=[];

    $q="SELECT TOP (100) PERCENT articoli.id_articolo, articoli.codice_articolo, articoli.descrizione, articoli_lotti.lotto, articoli_lotti.articolo, COUNT(articoli_lotti.id_articolo_lotto) AS qnt, MAX(articoli_lotti.id_articolo_lotto) AS id_articolo_lotto
        FROM oasis_produzione.dbo.articoli AS articoli INNER JOIN oasis_produzione.dbo.articoli_lotti AS articoli_lotti ON articoli.id_articolo = articoli_lotti.articolo
        WHERE articoli.eliminato = 'false'
        GROUP BY articoli.id_articolo, articoli.codice_articolo, articoli.descrizione, articoli_lotti.lotto, articoli_lotti.articolo
        HAVING (articoli_lotti.lotto = $id_lotto)
        ORDER BY id_articolo_lotto";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            $articolo["id_lotto"]=$row["lotto"];
            $articolo["id_articolo"]=$row["id_articolo"];
            $articolo["codice_articolo"]=utf8_encode($row["codice_articolo"]);
            $articolo["descrizione"]=utf8_encode($row["descrizione"]);
            $articolo["qnt"]=$row["qnt"];

            array_push($articoliLotto,$articolo);
        }
    }
    $q2="SELECT *
        FROM oasis_produzione.dbo.articoli articoli_2
        WHERE articoli_2.id_articolo NOT IN (SELECT id_articolo FROM oasis_produzione.dbo.articoli articoli INNER JOIN oasis_produzione.dbo.articoli_lotti articoli_lotti ON articoli.id_articolo = articoli_lotti.articolo WHERE (articoli_lotti.lotto = $id_lotto)) AND articoli_2.eliminato = 'false'
        ORDER BY articoli_2.codice_articolo";
    $r2=sqlsrv_query($conn,$q2);
    if($r2==FALSE)
    {
        die("error".$q2);
    }
    else
    {
        while($row2=sqlsrv_fetch_array($r2))
        {
            $articolo["id_articolo"]=$row2["id_articolo"];
            $articolo["codice_articolo"]=utf8_encode($row2["codice_articolo"]);
            $articolo["descrizione"]=utf8_encode($row2["descrizione"]);

            array_push($articoli,$articolo);
        }
    }

    $articoliLottoResponse["articoliLotto"]=$articoliLotto;
    $articoliLottoResponse["articoli"]=$articoli;

    echo json_encode($articoliLottoResponse);

?>