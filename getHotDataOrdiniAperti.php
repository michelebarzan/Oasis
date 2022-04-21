<?php

    include "connessione.php";

    $columns=[];
    $colHeaders=[];

    $q2="SELECT COLUMN_NAME, CASE WHEN DATA_TYPE = 'varchar' THEN 'text' when DATA_TYPE = 'int' then 'numeric' when DATA_TYPE = 'float' then 'numeric'  when DATA_TYPE = 'datetime' then 'date' END AS type
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE (TABLE_NAME = N'view_ordini_aperti')";
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
            $column["type"]=$row2["type"];
            $column["readOnly"]=true;
            
            array_push($columns,$column);
        }
    }

    $data=[];

    $q3="select * from view_ordini_aperti ORDER BY dataConsegna DESC, docNum, lineNum";
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
            foreach ($columns as $column)
            {
                switch ($column["type"])
                {
                    case 'text':
                        $rowObj[$column["data"]]=utf8_encode($row3[$column["data"]]);
                    break;
                    case 'numeric':
                        $rowObj[$column["data"]]=$row3[$column["data"]];
                    break;
                    case 'date':
                        if($row3[$column["data"]] == null || $row3[$column["data"]] == "")
                            $rowObj[$column["data"]]= "";
                        else
                            $rowObj[$column["data"]]=$row3[$column["data"]] -> format("d/m/Y");
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