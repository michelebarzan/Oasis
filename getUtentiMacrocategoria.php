<?php

    include "Session.php";
    include "connessione.php";

    $id_macrocategoria=$_REQUEST['id_macrocategoria'];

    $utenti=[];

    $query2="SELECT dbo.utenti.id_utente,dbo.utenti.username
            FROM dbo.utenti_incaricati_macrocategorie INNER JOIN
            dbo.utenti ON dbo.utenti_incaricati_macrocategorie.utente = dbo.utenti.id_utente
            WHERE (dbo.utenti_incaricati_macrocategorie.macrocategoria = $id_macrocategoria)";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $utente["id_utente"]=$row2['id_utente'];
            $utente["username"]=$row2['username'];
            array_push($utenti,$utente);
        }
    }
    else
        die("error");

    echo json_encode($utenti);
?>