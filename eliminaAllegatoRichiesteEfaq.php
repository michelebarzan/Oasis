<?php

	include "Session.php";
	include "connessione.php";
	
	$id_allegato=$_REQUEST['id_allegato'];
    
    $query2="SELECT percorso FROM allegati_richieste WHERE id_allegato=$id_allegato";	
    $result2=sqlsrv_query($conn,$query2);
    if($result2==FALSE)
    {
        die("error");
    }
    else
    {
        while($row2=sqlsrv_fetch_array($result2))
        {
            $percorso=$row2["percorso"];
        }
        $query3="DELETE FROM allegati_richieste WHERE id_allegato=$id_allegato";	
        $result3=sqlsrv_query($conn,$query3);
        if($result3==FALSE)
        {
            die("error");
        }
        else
        {
            /*$percorso=str_replace("\\","\\\\",$percorso);
            $percorso=str_replace("\\\\\\\\","\\\\",$percorso);*/

            $percorso=str_replace("\\\\","\\",$percorso);

            $output = shell_exec('del "'.$percorso.'" 2>&1');

            echo "ok";
        }
    }
?>