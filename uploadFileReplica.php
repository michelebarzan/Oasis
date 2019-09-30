<?php
	
	include "Session.php";
	include "connessione.php";
    
    echo $_POST["fileNameResponse"]."|";
    
    $query2="SELECT MAX(id_risposta) AS id_risposta,richiesta FROM risposte_richieste_e_faq WHERE utente_risposta=".$_SESSION['id_utente']." GROUP BY richiesta";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==TRUE)
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $id_risposta=$row2["id_risposta"];
            $id_richiesta=$row2["richiesta"];
        }
    }
    else
        die("error3");

    $target_dir="OasisAllegatiRichieste\\";
    $target_file = $target_dir . $id_risposta . "_R" . $id_richiesta."_".basename($_FILES["file"]["name"]);
    $target_file=str_replace(" ","-",$target_file);
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    
    //define ('SITE_ROOT', realpath(dirname(__FILE__)));
    define ('SITE_ROOT', 'C:\\xampp\\htdocs\\');

    if (move_uploaded_file($_FILES["file"]["tmp_name"], SITE_ROOT.'\\'.$target_file)) 
    {
        $query3="INSERT INTO [dbo].[allegati_risposte_richieste_e_faq] ([percorso] ,[risposta]) VALUES ('".SITE_ROOT.'\\'.$target_file."',$id_risposta)";	
        $result3=sqlsrv_query($conn,$query3);
        if($result3==FALSE)
        {
            die("error2");
        }
        else
        {
            echo "ok";
        }
    } 
    else 
    {
        echo "error1";
    }

?>