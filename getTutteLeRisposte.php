<?php

    include "Session.php";
    include "connessione.php";

    set_time_limit(240);

    $risposte=[];
    $columns=[];

    $query1="SELECT * FROM Cecklist.INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'risposte_richieste_e_faq_view' OPTION ( QUERYTRACEON 9481 )";	
    $result1=sqlsrv_query($conn,$query1);
    if($result1==FALSE)
    {
        die("error1");
    }
    else
    {
        while($row=sqlsrv_fetch_array($result1))
        {
            $column["COLUMN_NAME"]=$row["COLUMN_NAME"];
            $column["DATA_TYPE"]=$row["DATA_TYPE"];
            array_push($columns,$column);
        }
    }

    $query2="SELECT * FROM risposte_richieste_e_faq_view OPTION ( QUERYTRACEON 9481 )";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==FALSE)
    {
        die("error");
    }
    else
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            foreach ($columns as $column) 
            {
                if($column["DATA_TYPE"]=="date" || $column["DATA_TYPE"]=="datetime")
                    $risposta[$column["COLUMN_NAME"]]=$row2[$column["COLUMN_NAME"]];
                else
                    $risposta[$column["COLUMN_NAME"]]=utf8_encode($row2[$column["COLUMN_NAME"]]);
            }
            array_push($risposte,$risposta);
        }
    }

    echo json_encode($risposte);

?>