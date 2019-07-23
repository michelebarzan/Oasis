<?php
	include "connessione.php";

	$query2="SELECT  [APLATZ_ID] as stazione FROM [Cecklist].[dbo].[Stazioni]";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row2=sqlsrv_fetch_array($result2))
		{
			echo $row2['stazione']."|";
		}
	}
?>