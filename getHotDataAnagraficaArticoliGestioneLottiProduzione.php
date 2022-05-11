<?php

    include "connessione.php";

    set_time_limit(120);

    $colHeaders=[];
    $columns=[];

    $column["data"]="id_articolo";$column["readOnly"]=true;$column["type"]="numeric";array_push($columns,$column);
    $column["data"]="codice_articolo";$column["readOnly"]=false;$column["type"]="text";array_push($columns,$column);
    $column["data"]="descrizione";$column["readOnly"]=false;$column["type"]="text";array_push($columns,$column);
    $column["data"]="eliminato";$column["readOnly"]=false;$column["type"]="checkbox";array_push($columns,$column);

    foreach ($columns as $column)
    {
        array_push($colHeaders,$column["data"]);
    }

    $data=[];

    $q="SELECT * FROM oasis_produzione.dbo.articoli AS articoli";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row=sqlsrv_fetch_array($r))
        {
            $rowObj=[];
            foreach ($columns as $column)
            {
                switch ($column["type"])
                {
                    case 'text':
                        $rowObj[$column["data"]]=utf8_encode($row[$column["data"]]);
                    break;
                    default:
                        $rowObj[$column["data"]]=$row[$column["data"]];
                    break;
                }
            }
            array_push($data,$rowObj);
        }
    }

    $arrayResponse["columns"]=$columns;
    $arrayResponse["colHeaders"]=$colHeaders;
    $arrayResponse["data"]=$data;

    echo json_encode($arrayResponse);
    
?>