<?php
    include "Session.php";
    include "connessione.php";

    $colonneDaNonSvuotare=json_decode($_REQUEST['JSONcolonneDaNonSvuotare']);
    $id_richiesta=$_REQUEST['id_richiesta'];

    $colonneDaNonSvuotare_in=implode("','",$colonneDaNonSvuotare);

    $query3="SELECT colonna FROM colonne_richieste_macrocategorie WHERE colonna NOT IN ('$colonneDaNonSvuotare_in')";	
    $result3=sqlsrv_query($conn,$query3);
    if($result3==TRUE)
    {
        while($row3=sqlsrv_fetch_array($result3))
        {
            $colonna=$row3["colonna"];
            $query2="UPDATE richieste_e_faq SET [$colonna] = NULL WHERE id_richiesta=$id_richiesta";
            $result2=sqlsrv_query($conn,$query2);
            if($result2==TRUE)
            {
                
            }
            else
                die("error1");
        }
    }
    else
        die("error2");

    echo "ok";
?>