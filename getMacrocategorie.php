
<?php

    include "Session.php";
    include "connessione.php";

    $macrocategorie=[];
    $macrocategoriaPredefinita=null;

    $query2="SELECT id_macrocategoria, nome, descrizione
    FROM dbo.macrocategorie_richieste
    WHERE (id_macrocategoria NOT IN
                            (SELECT macrocategoria
                            FROM dbo.macrocategorie_utenti
                            WHERE (utente = ".$_SESSION['id_utente'].")))";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $macrocategoria["id_macrocategoria"]=$row2['id_macrocategoria'];
            $macrocategoria["nome"]=$row2['nome'];
            $macrocategoria["descrizione"]=$row2['descrizione'];

            array_push($macrocategorie,$macrocategoria);
        }
    }

    $query3="SELECT dbo.macrocategorie_richieste.id_macrocategoria, dbo.macrocategorie_richieste.nome, dbo.macrocategorie_richieste.descrizione
            FROM dbo.macrocategorie_richieste INNER JOIN
            dbo.macrocategorie_utenti ON dbo.macrocategorie_richieste.id_macrocategoria = dbo.macrocategorie_utenti.macrocategoria
            WHERE (dbo.macrocategorie_richieste.eliminata = 'false') AND (dbo.macrocategorie_utenti.utente=".$_SESSION['id_utente'].")";	
    $result3=sqlsrv_query($conn,$query3);
    if($result3==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result3))
        {
            $macrocategoriaPredefinita["id_macrocategoria"]=$row2['id_macrocategoria'];
            $macrocategoriaPredefinita["nome"]=$row2['nome'];
            $macrocategoriaPredefinita["descrizione"]=$row2['descrizione'];
        }
    }

    $response["macrocategoriaPredefinita"]=$macrocategoriaPredefinita;
    $response["macrocategorie"]=$macrocategorie;

    echo json_encode($response);

?>