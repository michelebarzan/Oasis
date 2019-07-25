<?php

	include "Session.php";
	include "connessione.php";
	
    $queries=json_decode($_REQUEST['JSONqueries']);	
	
	$query2="DELETE FROM report_ufficio_commerciale WHERE nome_salvataggio = { fn CONCAT('salvataggio_', { fn CONCAT(CONVERT(varchar(4), DATEPART(yy, GETDATE())), CONVERT(varchar(2), DATEPART(ww, GETDATE()))) }) }";	
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