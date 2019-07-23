<?php

	include "Session.php";
	include "connessione.php";
	
	$query2="SELECT * FROM elencoTicket WHERE stato!='Chiuso' ORDER BY dataOraCreazione DESC";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$rows = sqlsrv_has_rows( $result2 );
		if ($rows === true)
		{
			echo "<table id='myTableElencoTicket'>";
				echo "<tr class='myTableElencoTicketRowHeader'>";
					echo "<th onclick='sortTable(0)'>Titolo<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th onclick='sortTable(1)'>Descrizione<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th onclick='sortTable(2)'>Note<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th onclick='sortTable(3)'>Creatore<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th onclick='sortTable(4)'>Data creazione<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th onclick='sortTable(5)'>Partecipanti<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th onclick='sortTable(6)' style='padding-right:0px'>Stato<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th style='padding:0px;text-align:center'></th>";
					echo "<th style='padding-left:20px;' onclick='sortTable(8)'>Note assistenza<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th></th>";
				echo "</tr>";
					while($row2=sqlsrv_fetch_array($result2))
					{
						echo "<tr class='myTableElencoTicketRowNormal'>";
							echo "<td>".$row2['titolo']."</td>";
							echo "<td style='max-width:250px;'>".$row2['descrizione']."</td>";
							echo "<td style='max-width:250px;'>".$row2['note']."</td>";
							echo "<td>".$row2['creatore']."</td>";
							echo "<td>".$row2['dataOraCreazione']->format('d/m/Y H:i:s')."</td>";
							echo "<td title='".getElencoPartecipanti($conn,$row2['id_ticket'])."'>".$row2['nPartecipanti']."</td>";
							switch ($row2['stato']) 
							{
								case "Aperto":
									$color="red";
									echo '<td style="padding-right:0px;color:'.$color.'">Aperto</td><td style="padding:0px;text-align:center"><i class="fas fa-exclamation" style=";color:'.$color.'"></i></td>';
									break;
								case "Visualizzato":
									$color="orange";
									echo '<td style="padding-right:0px;color:'.$color.'">Visualizzato</td><td style="padding:0px;text-align:center"><i class="fal fa-eye" style=";color:'.$color.'"></i></td>';
									break;
								case "Preso in carico":
									$color="#CCCC00";
									echo '<td style="padding-right:0px;color:'.$color.'">Preso in carico</td><td style="padding:0px;text-align:center"><i class="far fa-cogs" style=";color:'.$color.'"></i></td>';
									break;
							}
							echo "<td style='max-width:250px;padding-left:20px;'>".$row2['noteAssistenza']."</td>";
							if(!getPartecipante($conn,$row2['id_ticket']))
								echo "<td style='padding-right:0px;padding-top:0px;padding-bottom:0px;padding-left:20px;'><button class='btnPartecipaTicket'onclick='aggiungiPartecipante(".$row2['id_ticket'].",".htmlspecialchars(json_encode($_SESSION['Username'])).")'>Partecipa<i class='far fa-plus' style='font-size:80%;margin-left:10px'></i></button></td>";
							else
								echo "<td style='padding-right:0px;padding-top:0px;padding-bottom:0px;padding-left:20px;'>Hai partecipato il ".getPartecipante($conn,$row2['id_ticket'])."</td>";
						echo "</tr>";
					}
			echo "</table>";
		}
		else
			"Nessun ticket";
	}
	
	function getElencoPartecipanti($conn,$id_ticket)
	{
		$query2="SELECT utenti.username FROM partecipanti_ticket,utenti WHERE partecipanti_ticket.partecipante=utenti.id_utente AND ticket=$id_ticket";	
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$response="";
			while($row2=sqlsrv_fetch_array($result2))
			{
				$response.=$row2['username']."\n";
			}
			return $response;
		}
	}
	
	function getPartecipante($conn,$id_ticket)
	{
		$query2="SELECT partecipanti_ticket.dataOra FROM partecipanti_ticket,utenti WHERE partecipanti_ticket.partecipante=utenti.id_utente AND ticket=$id_ticket AND username='".$_SESSION['Username']."'";	
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows = sqlsrv_has_rows( $result2 );
			if ($rows === true)
			{
				while($row2=sqlsrv_fetch_array($result2))
				{
					return $row2['dataOra']->format('d/m/Y H:i:s');
				}
			}
			else
				return false;
		}
	}
	
?>