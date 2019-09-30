<?php

    include "Session.php";
    include "connessione.php";

    $macrocategorie=[];

    $query2="SELECT id_macrocategoria, nome, descrizione FROM dbo.macrocategorie_richieste";	
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

    echo json_encode($macrocategorie);

?>