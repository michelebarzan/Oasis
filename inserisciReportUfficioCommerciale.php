<?php

	include "Session.php";
	include "connessione.php";
	
	$queries=json_decode($_REQUEST['JSONqueries']);	
	$nome_salvataggio=$_REQUEST['nome_salvataggio'];
	
	$query2="DELETE FROM report_ufficio_commerciale WHERE nome_salvataggio = '$nome_salvataggio'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		die("error");
	}
	else
	{
        $row=1;
		foreach ($queries as $query)
        {
            if(sqlsrv_query($conn,$query)==FALSE)
                die("errrow|$row");
            $row++;
        }
        echo "ok";
	}
	
?>