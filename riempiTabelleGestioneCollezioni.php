<?php
	include "connessione.php";
	include "Session.php";

	if(set_time_limit(120))
	{
		riempiColori($conn);
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>Contattare l' amministratore";
	
	
	function riempiColori($conn)
	{
		$query="SELECT count(*)  as n FROM [Cecklist].[dbo].elenco_collezioni";
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				$n1=$row['n'];
				$query2="SELECT count(*)  as n FROM [Cecklist].[dbo].colori_collezioni";
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
						$n2=$row2['n'];
						if($n1>$n2)
						{
							$query3="SELECT collezione,sigla FROM elenco_collezioni WHERE sigla COLLATE SQL_Latin1_General_CP850_CI_AS NOT IN (SELECT sigla FROM colori_collezioni) ";
							$result3=sqlsrv_query($conn,$query3);
							if($result3==FALSE)
							{
								echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
								die(print_r(sqlsrv_errors(),TRUE));
							}
							else
							{
								while($row3=sqlsrv_fetch_array($result3))
								{
									$query4="INSERT INTO colori_collezioni (collezione,sigla) VALUES ('".$row3['collezione']."','".$row3['sigla']."')";
									$result4=sqlsrv_query($conn,$query4);
									if($result4==FALSE)
									{
										echo "<br><br>Errore esecuzione query<br>Query: ".$query4."<br>Errore: ";
										die(print_r(sqlsrv_errors(),TRUE));
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
?>