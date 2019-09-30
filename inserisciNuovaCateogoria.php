<?php

    include "Session.php";
    include "connessione.php";

    $categoria=str_replace("'","''",$_REQUEST['categoria']);
    $descrizione=str_replace("'","''",$_REQUEST['descrizione']);

    $query3="SELECT * FROM categorie_richieste WHERE nome='$categoria'";	
    $result3=sqlsrv_query($conn,$query3);
    if($result3==FALSE)
    {
        die("error1");
    }
    else
    {
        $rows = sqlsrv_has_rows( $result3 );
        if ($rows === true)
            die("error2");
        else 
        {
            $query2="INSERT INTO [dbo].[categorie_richieste]
                    ([nome]
                    ,[descrizione]
                    ,[data_creazione]
                    ,[utente_creazione]
                    ,[eliminata])
                    VALUES
                    ('$categoria',
                    '$descrizione',
                    GETDATE(),
                    ".$_SESSION['id_utente'].",
                    'false')";
            
            $result2=sqlsrv_query($conn,$query2);
            if($result2==TRUE)
            {
                $query4="SELECT MAX(id_categoria) AS id_categoria FROM categorie_richieste WHERE utente_creazione=".$_SESSION['id_utente'];	
                $result4=sqlsrv_query($conn,$query4);
                if($result4==FALSE)
                {
                    die("error3");
                }
                else
                {
                    while($row4=sqlsrv_fetch_array($result4))
			        {
                        echo $row4["id_categoria"];
                    }
                }
            }
            else
            {
                die("error4");
            }
        }
    }
?>