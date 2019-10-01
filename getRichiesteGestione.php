<?php

    include "Session.php";
    include "connessione.php";

    $macrocategoria=$_REQUEST["filtroMacrocategoria"];
    if($macrocategoria!="*")
    {
        $filtroMacrocategoria="AND id_macrocategoria = $macrocategoria";
    }
    else
        $filtroMacrocategoria="";

    $categoria=$_REQUEST["filtroCategoria"];
    if($categoria!="*")
    {
        $filtroCategoria="AND id_categoria = $categoria";
    }
    else
        $filtroCategoria="";

    $filtroStato=$_REQUEST["filtroStato"];

    $filtroStato_in=implode("','",$filtroStato);

    $richieste=[];
    $columns=[];
    $extraColumns=[];

    set_time_limit(240);

    $query1="SELECT * FROM Cecklist.INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'richieste_e_faq_view' OPTION ( QUERYTRACEON 9481 )";	
    $result1=sqlsrv_query($conn,$query1);
    if($result1==FALSE)
    {
        die("error1");
    }
    else
    {
        while($row=sqlsrv_fetch_array($result1))
        {
            array_push($columns,$row["COLUMN_NAME"]);
        }
    }

    $query3="SELECT DISTINCT [colonna] FROM [Cecklist].[dbo].[colonne_richieste_macrocategorie] OPTION ( QUERYTRACEON 9481 )";	
    $result3=sqlsrv_query($conn,$query3);
    if($result3==FALSE)
    {
        die("error2");
    }
    else
    {
        while($row3=sqlsrv_fetch_array($result3))
        {
            array_push($extraColumns,$row3["colonna"]);
        }
    }

    $extraColumnsSelect="[".implode("],[",$extraColumns)."]";

    $query2="SELECT * FROM richieste_e_faq_view WHERE utente_incaricato='".$_SESSION['Username']."' AND stato IN ('$filtroStato_in') $filtroMacrocategoria $filtroCategoria OPTION ( QUERYTRACEON 9481 )";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            foreach ($columns as $column) 
            {
                $richiesta[$column]=$row2[$column];
            }
            $query4="SELECT $extraColumnsSelect FROM richieste_e_faq WHERE id_richiesta=".$row2['id_richiesta']." OPTION ( QUERYTRACEON 9481 )";	
            $result4=sqlsrv_query($conn,$query4);
            if($result4==FALSE)
            {
                die("error3".$query4);
            }
            else
            {
                while($row4=sqlsrv_fetch_array($result4))
                {
                    foreach ($extraColumns as $extraColumn) 
                    {
                        $richiesta[$extraColumn]=$row4[$extraColumn];
                    }
                }
            }
            array_push($richieste,$richiesta);
        }
    }

    echo json_encode($richieste);

?>