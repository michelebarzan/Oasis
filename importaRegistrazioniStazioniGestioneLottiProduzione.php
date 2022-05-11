
<?php

    /*$path = "C:\\Users\\joshu\\Desktop\\output_macchine_oasis\\SCM_OlimpicK560\\Report\\test.csv";
    // $path = "C:\\Users\\joshu\\Desktop\\output_macchine_oasis\\SCM_M200\\Report\\2022\\20220330(PRO).csv";
    // $path = "C:\\Users\\joshu\\Desktop\\output_macchine_oasis\\SCM_CX220\\Report\\2022\\20220328(PRO).csv";
    // $path = "C:\\Users\\joshu\\Desktop\\output_macchine_oasis\\SCM_GabbianiS\\Report\\export29_03_22.csv";

    //array di oggetti che conterrà tutte le righe del csv
    $return_array = [];
    //array di intestazioni di colonna
    $headers = [];
    //apro e leggo file
    $content = fopen($path, "r");
    //popolo le intestazioni di colonna che (si spera) saranno sempre la prima riga del file
    $data = fgetcsv($content,";");
    //separo le intestazioni usando il ";" e le inserisco nell'array di ritorno
    $headers = explode(";",$data[0]);
    //prendo i valori e li inserisco in un array temporaneo
    $tmp_array = [];

    for ($i=0; $i < count($headers); $i++) { 
        if(empty($headers[$i]))
            unset($headers[$i]);
    }
    while (($data = fgetcsv($content, 1000, ";")) !== FALSE) {
        // print_r($data);
        $num = count($data);
        if($num == count($headers) -1 || $num == count($headers))
        {
            for ($c=0; $c < $num ; $c++) {
                
                    if(!empty($data[$c]))
                    {
                        $tmp_array[$headers[$c]] = $data[$c];
                    }
                    else
                    {
                        $tmp_array[$headers[$c]] = "";
                    }
            }
            array_push($return_array, $tmp_array); 
            $tmp_array = [];
        }

    }

    // print_r($return_array);
    echo json_encode($return_array);*/
    
?>