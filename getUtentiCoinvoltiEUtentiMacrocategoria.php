<?php
    include "Session.php";
    include "connessione.php";

    $id_richiesta=$_REQUEST['id_richiesta'];
    $id_macrocategoria=$_REQUEST['id_macrocategoria'];
    
    $utenti=[];

    $query2="select username,'false' AS utente_macrocategoria from utenti_incaricati_richieste,utenti where utenti_incaricati_richieste.utente=utenti.id_utente AND richiesta=$id_richiesta
            union
            select username,'true' AS utente_macrocategoria from utenti_incaricati_macrocategorie,utenti where utenti_incaricati_macrocategorie.utente=utenti.id_utente AND macrocategoria=$id_macrocategoria";
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
		{
            $utente["username"]=$row2['username'];
            $utente["utente_macrocategoria"]=$row2['utente_macrocategoria'];

			array_push($utenti,$utente);
		}
    }
    else
        die("error");

    echo json_encode($utenti);
?>