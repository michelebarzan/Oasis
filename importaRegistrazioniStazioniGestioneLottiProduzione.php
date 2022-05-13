
<?php

    $datas=[];

    include "connessione.php";

    $q="SELECT * FROM oasis_produzione.dbo.stazioni AS stazioni ORDER BY posizione";
    $r=sqlsrv_query($conn,$q);
    if($r==FALSE)
    {
        die("error".$q);
    }
    else
    {
        while($row_lcl=sqlsrv_fetch_array($r))
        {
            $dir = $row_lcl["percorso_output_macchina"];
            $extension = $row_lcl["formato_output_macchina"];
            $col_separator = $row_lcl["separatore_colonne_output_macchina"];

            $dataObj["colonna_articolo_output_macchina"] = $row_lcl["colonna_articolo_output_macchina"];
            $dataObj["colonna_data_output_macchina"] = $row_lcl["colonna_data_output_macchina"];
            $dataObj["colonna_ora_output_macchina"] = $row_lcl["colonna_ora_output_macchina"];
            $dataObj["id_stazione"] = $row_lcl["id_stazione"];

            $data = [];

            if (is_dir($dir))
            {
                if ($dh = opendir($dir))
                {
                    while (($file_name = readdir($dh)) !== false)
                    {
                        $file_array = explode('.', $file_name);
                        $file_extension = end($file_array);

                        if($file_extension == $extension)
                        {
                            $file = fopen($dir."\\".$file_name, "r") or die("Unable to open file!");

                            $dataObj["dataCreazione"] = date ("Y-m-d", filemtime($dir."\\".$file_name));

                            while(!feof($file))
                            {
                                $rowString = fgets($file);
                                $rowString = str_replace("\r\n",'', $rowString);
                                $rowString = str_replace("\r",'', $rowString);
                                $rowString = str_replace("\n",'', $rowString);
                                $rowString = str_replace("'", "", $rowString);

                                $row = [];

                                $row = explode($col_separator,$rowString);

                                array_push($data,$row);
                            }
                            fclose($file);
                        }
                    }

                    closedir($dh);
                }
            }

            $dataObj["data"] = $data;

            array_push($datas,$dataObj);
        }
    }

    //echo json_encode($datas);//delete
    
?>