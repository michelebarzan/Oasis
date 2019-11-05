<?php
	
	include "Session.php";
	include "connessione.php";
    
    $id_intervento=$_POST["id_intervento"];
    
    $target_dir="OasisAllegatiInterventiDiManutenzione\\";
    $target_file = $target_dir . $id_intervento."_".basename($_FILES["file"]["name"]);
    $target_file=str_replace(" ","-",$target_file);
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    
    define ('SITE_ROOT', 'C:\\xampp\\htdocs\\');

    if (move_uploaded_file($_FILES["file"]["tmp_name"], SITE_ROOT.'\\'.$target_file)) 
    {
        $query3="INSERT INTO [dbo].[allegati_interventi_di_manutenzione] ([percorso],[intervento]) VALUES ('".SITE_ROOT.'\\'.$target_file."',$id_intervento)";	
        $result3=sqlsrv_query($conn,$query3);
        if($result3==FALSE)
        {
            die("error");
        }
        else
        {
            echo "ok";
        }
    } 
    else 
    {
        echo "error";
    }

?>