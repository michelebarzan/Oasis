<?php

    include "Session.php";
    include "connessione.php";

    $tipologia=str_replace("'","''",$_REQUEST['tipologia']);
    $descrizione=str_replace("'","''",$_REQUEST['descrizione']);

    $query3="SELECT * FROM tipologie_interventi_di_manutenzione WHERE label='$tipologia'";	
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
            $query2="INSERT INTO [dbo].[tipologie_interventi_di_manutenzione]
            ([value]
            ,[label]
            ,[eliminata]
            ,[descrizione]
            ,[utente_creazione])
                    VALUES
                    ('$tipologia',
                    '$tipologia',
                    'false',
                    '$descrizione',
                    ".$_SESSION['id_utente'].")";
            
            $result2=sqlsrv_query($conn,$query2);
            if($result2==TRUE)
            {
                $query4="SELECT MAX(id_tipologia) AS id_tipologia FROM tipologie_interventi_di_manutenzione WHERE utente_creazione=".$_SESSION['id_utente'];	
                $result4=sqlsrv_query($conn,$query4);
                if($result4==FALSE)
                {
                    die("error3");
                }
                else
                {
                    while($row4=sqlsrv_fetch_array($result4))
			        {
                        echo $row4["id_tipologia"];
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