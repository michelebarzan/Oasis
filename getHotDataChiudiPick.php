<?php

    include "Session.php";
    include "connessione.php";

    $n_pick=$_REQUEST["n_pick"];

    $columns=[];
    $colHeaders=[];

    $tipologie=[];
    array_push($tipologie,"BANCALE");
    array_push($tipologie,"CASSA");
    array_push($tipologie,"SCATOLA");

    $q2="SELECT COLUMN_NAME, CASE WHEN DATA_TYPE = 'varchar' THEN 'text' ELSE 'numeric' END AS type
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE (TABLE_NAME = N'view_chiudi_pick') AND COLUMN_NAME<>'n_Pick'";
    $r2=sqlsrv_query($conn,$q2);
    if($r2==FALSE)
    {
        die("error".$q2);
    }
    else
    {
        while($row2=sqlsrv_fetch_array($r2))
        {
            array_push($colHeaders,$row2["COLUMN_NAME"]);

            $column["data"]=$row2["COLUMN_NAME"];
            switch ($row2["COLUMN_NAME"])
            {
                case 'id_bancale':
                    $column["readOnly"]=true;
                    $column["type"]=$row2["type"];
                break;
                case 'bancale':
                    $column["readOnly"]=true;
                    $column["type"]=$row2["type"];
                break;
                case "tipo":
                    $column["type"]="dropdown";
                    $column["source"]=$tipologie;
                    $column["readOnly"]=false;
                break;
                default:
                    $column["readOnly"]=false;
                    $column["type"]=$row2["type"];
                break;
            }
            array_push($columns,$column);
        }
    }

    $data=[];

    $q3="SELECT * FROM [view_chiudi_pick] WHERE n_Pick='$n_pick' ORDER BY bancale";
    $r3=sqlsrv_query($conn,$q3);
    if($r3==FALSE)
    {
        die("error".$q3);
    }
    else
    {
        while($row3=sqlsrv_fetch_array($r3))
        {
            $rowObj=[];
            foreach ($colHeaders as $column)
            {
                $rowObj[$column]=$row3[$column];
            }
            array_push($data,$rowObj);
        }
    }

    $arrayResponse["q3"]=$q3;
    $arrayResponse["columns"]=$columns;
    $arrayResponse["colHeaders"]=$colHeaders;
    $arrayResponse["data"]=$data;
    $arrayResponse["primaryKey"]="id_bancale";

    echo json_encode($arrayResponse);

?>