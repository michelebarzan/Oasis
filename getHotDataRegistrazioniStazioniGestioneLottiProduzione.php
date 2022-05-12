<?php

    include "connessione.php";

    set_time_limit(120);

    $uri = str_replace("||","\\",$_REQUEST["uri"]);
    $col_separator = $_REQUEST["col_separator"];

    $colHeaders=[];
    $columns=[];

    $data=[];

    $file = fopen($uri, "r") or die("error");

    $col_n = 0;
    while(!feof($file))
    {
        $rowString = fgets($file);
        $rowString = str_replace("\r\n",'', $rowString);
        $rowString = str_replace("\r",'', $rowString);
        $rowString = str_replace("\n",'', $rowString);
        $rowString = str_replace("'", "", $rowString);
        $rowString = utf8_encode($rowString);

        $row = [];

        $row = explode($col_separator,$rowString);

        if(count($row) > $col_n)
            $col_n = count($row);

        array_push($data,$row);
    }
    fclose($file);

    for ($i=0; $i < $col_n; $i++)
    { 
        if(isset($data[0][$i]))
            array_push($colHeaders,$data[0][$i]);
        else
            array_push($colHeaders,"campo_".$i);
    }

    foreach ($colHeaders as $colHeader)
    {
        $column["data"]=$colHeader;
        $column["readOnly"]=true;
        $column["type"]="text";
        array_push($columns,$column);
    }

    $data_new=[];

    $j=0;
    foreach ($data as $row_lcl)
    {
        if($j>0)
        {
            for ($i=0; $i < $col_n; $i++)
            {
                if(isset($row_lcl[$i]))
                    $row_new[$colHeaders[$i]] = $row_lcl[$i];
                else
                    $row_new[$colHeaders[$i]] = "";
            }
            array_push($data_new,$row_new);
        }

        $j++;
    }

    $arrayResponse["columns"]=$columns;
    $arrayResponse["colHeaders"]=$colHeaders;
    $arrayResponse["data"]=$data_new;

    echo json_encode($arrayResponse);
    
?>