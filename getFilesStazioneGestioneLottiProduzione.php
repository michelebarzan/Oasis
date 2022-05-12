<?php

    $id_stazione = $_REQUEST["id_stazione"];

    $files=[];

    include "connessione.php";

    $q="SELECT * FROM oasis_produzione.dbo.stazioni AS stazioni WHERE id_stazione = $id_stazione";
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
                            $file["percorso_output_macchina"] = ["percorso_output_macchina"];
                            $file["dataCreazione"] = date ("d/m/Y", filemtime($dir."\\".$file_name));
                            $file["file_extension"] = $file_extension;
                            $file["file_name"] = str_replace(".".$file_extension,"",$file_name);
                            array_push($files,$file);
                        }
                    }

                    closedir($dh);
                }
            }
        }
    }

    echo json_encode($files);

?>