<?php
	
	include "Session.php";
	include "connessione.php";
    
    echo $_POST["fileNameResponse"]."|";
    
    $query2="SELECT MAX(id_richiesta) AS id_richiesta FROM richieste_e_faq WHERE utente_creazione=".$_SESSION['id_utente'];	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $id_richiesta=$row2["id_richiesta"];
        }
    }
    else
        die("error");

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
            echo "ok";
        }
    } 
    else 
    {
        echo "error";
    }

?>