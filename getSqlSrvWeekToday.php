<?php

	include "Session.php";
	include "connessione.php";
		
	$query2="SELECT { fn CONCAT(CONVERT(varchar(4),DATEPART(yy, GETDATE())), CONVERT(varchar(2), DATEPART(ww, GETDATE()))) } AS week";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		die("error");
	}
	else
	{
        while($row=sqlsrv_fetch_array($result2))
		{
            echo $row["week"];
        }
	}
	
?>