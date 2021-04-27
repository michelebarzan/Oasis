<?php

    include "connessione.php";

    set_time_limit(120);

    $colHeaders=[];
    $columns=[];

    $column["data"]="ordine";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="collezione";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="data_creazione_ordine";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="data_consegna";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="nome_cliente";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="basi_portalavabo";$column["readOnly"]=true;$column["type"]="numeric";array_push($columns,$column);
    $column["data"]="basi_accostabili";$column["readOnly"]=true;$column["type"]="numeric";array_push($columns,$column);
    $column["data"]="colonne";$column["readOnly"]=true;$column["type"]="numeric";array_push($columns,$column);
    $column["data"]="pensili";$column["readOnly"]=true;$column["type"]="numeric";array_push($columns,$column);
    $column["data"]="Altro";$column["readOnly"]=true;$column["type"]="numeric";array_push($columns,$column);
    $column["data"]="totale_pezzi";$column["readOnly"]=true;$column["type"]="numeric";array_push($columns,$column);
    $column["data"]="data_apertura_foratura";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="ora_apertura_foratura";$column["readOnly"]=true;$column["type"]="time";array_push($columns,$column);
    $column["data"]="data_chiusura_foratura";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="ora_chiusura_foratura";$column["readOnly"]=true;$column["type"]="time";array_push($columns,$column);
    $column["data"]="durata_foratura";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="data_apertura_verniciatura";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="ora_apertura_verniciatura";$column["readOnly"]=true;$column["type"]="time";array_push($columns,$column);
    $column["data"]="data_chiusura_verniciatura";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="ora_chiusura_verniciatura";$column["readOnly"]=true;$column["type"]="time";array_push($columns,$column);
    $column["data"]="durata_verniciatura";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="data_apertura_montaggio";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="ora_apertura_montaggio";$column["readOnly"]=true;$column["type"]="time";array_push($columns,$column);
    $column["data"]="data_chiusura_montaggio";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="ora_chiusura_montaggio";$column["readOnly"]=true;$column["type"]="time";array_push($columns,$column);
    $column["data"]="durata_montaggio";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="data_apertura_imballaggio";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="ora_apertura_imballaggio";$column["readOnly"]=true;$column["type"]="time";array_push($columns,$column);
    $column["data"]="data_chiusura_imballaggio";$column["readOnly"]=true;$column["type"]="date";array_push($columns,$column);
    $column["data"]="ora_chiusura_imballaggio";$column["readOnly"]=true;$column["type"]="time";array_push($columns,$column);
    $column["data"]="durata_imballaggio";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="delta_foratura_verniciatura";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="delta_verniciatura_montaggio";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="delta_montaggio_imballaggio";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="delta_imballaggio_consegna";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);
    $column["data"]="delta_creazione_consegna";$column["readOnly"]=true;$column["type"]="text";array_push($columns,$column);

    foreach ($columns as $column)
    {
        array_push($colHeaders,$column["data"]);
    }

    $data=[];

    $q="SELECT view_tempi_produzione.*,view_tempi_produzione.minuti_foratura AS durata_foratura,view_tempi_produzione.minuti_verniciatura AS durata_verniciatura,view_tempi_produzione.minuti_montaggio AS durata_montaggio,view_tempi_produzione.minuti_imballaggio AS durata_imballaggio FROM view_tempi_produzione OPTION ( QUERYTRACEON 9481 )";
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
                        switch ($column["data"])
                        {
                            case "ordine":
                                $rowObj[$column["data"]]=utf8_encode($row[$column["data"]]);
                            break;
                            case "collezione":
                                $rowObj[$column["data"]]=utf8_encode($row[$column["data"]]);
                            break;
                            case "nome_cliente":
                                $rowObj[$column["data"]]=utf8_encode($row[$column["data"]]);
                            break;
                            default:
                                $rowObj[$column["data"]]=getDaysHoursMinutes($row[$column["data"]]);
                            break;
                        }
                    break;
                    case 'numeric':
                        $rowObj[$column["data"]]=$row[$column["data"]];
                    break;
                    case 'date':
                        if($row[$column["data"]]==null)
                            $rowObj[$column["data"]]=null;
                        else
                            $rowObj[$column["data"]]=$row[$column["data"]]->format("d/m/Y");
                    break;
                    case 'time':
                        if($row[$column["data"]]==null)
                            $rowObj[$column["data"]]=null;
                        else
                            $rowObj[$column["data"]]=$row[$column["data"]]->format("H:m:i");
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

    function getDaysHoursMinutes($minutes)
    {
        if($minutes==null)
            return null;
        else
        {
            if($minutes<0)
                return 0;
            else
            {
                $seconds=$minutes*60;
                $dtF = new \DateTime('@0');
                $dtT = new \DateTime("@$seconds");
                return $dtF->diff($dtT)->format('%a giorni, %h ore, %i minuti');
            }
        }
    }
?>