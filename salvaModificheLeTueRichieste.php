<?php
    include "Session.php";
    include "connessione.php";

    $id_richiesta=$_REQUEST['id_richiesta'];
    $oggetto=str_replace("'","''",$_REQUEST['oggetto']);
    $descrizione=str_replace("'","''",$_REQUEST['descrizione']);
    $macrocategoria=$_REQUEST['macrocategoria'];
    $categoria=$_REQUEST['categoria'];
    $note=str_replace("'","''",$_REQUEST['note']);
    $valoriColonneMacrocategoria=json_decode($_REQUEST['JSONvaloriColonneMacrocategoria']);

    $query2="UPDATE richieste_e_faq SET oggetto='$oggetto',descrizione='$descrizione',macrocategoria='$macrocategoria',categoria='$categoria',note='$note'";
    
    foreach ($valoriColonneMacrocategoria as $colonna)
    {
        $query2.=",".$colonna;
    } 
    $query2.=" WHERE id_richiesta=$id_richiesta";

    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        echo "ok";
    }
    else
        die("error");
?>