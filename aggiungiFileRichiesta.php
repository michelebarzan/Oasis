<?php
	
	include "Session.php";
	include "connessione.php";
    
    $id_richiesta=$_POST["id_richiesta"];

    $target_dir="OasisAllegatiRichieste\\";
    $target_file = $target_dir . $id_richiesta."_".basename($_FILES["file"]["name"]);
    $target_file=str_replace(" ","-",$target_file);
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    
    //define ('SITE_ROOT', realpath(dirname(__FILE__)));
    define ('SITE_ROOT', 'C:\\xampp\\htdocs\\');

    if (move_uploaded_file($_FILES["file"]["tmp_name"], SITE_ROOT.'\\'.$target_file)) 
    {
        $query3="INSERT INTO [dbo].[allegati_richieste] ([percorso],[richiesta]) VALUES ('".SITE_ROOT.'\\'.$target_file."',$id_richiesta)";	
        $result3=sqlsrv_query($conn,$query3);
        if($result3==FALSE)
        {
            die("error");
        }
        else
        {
            $query2="SELECT id_allegato FROM dbo.allegati_richieste WHERE richiesta=$id_richiesta AND percorso='".SITE_ROOT.'\\'.$target_file."'";	
            $result2=sqlsrv_query($conn,$query2);
            if($result2==TRUE)
            {
                while($row2=sqlsrv_fetch_array($result2))
                {
                    echo $target_file;
                    echo "|";
                    echo $row2['id_allegato'];
                }
            }
            else
                die("error");
        }
    } 
    else 
    {
        echo "error";
    }

?>