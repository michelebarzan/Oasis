<?php

	include "Session.php";
	include "connessione.php";
	
	$query2="SELECT elencoTicket.* FROM elencoTicket WHERE creatore='".$_SESSION['Username']."' ORDER BY dataOraCreazione DESC";	
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
					echo "<th onclick='sortTable(8)' style='padding-left:20px;'>Note assistenza<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th onclick='sortTable(9)'>Descrizione chiusura<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th onclick='sortTable(10)'>Data ora chiusura<i class='fas fa-sort' style='margin-left:5px'></i></th>";
					echo "<th></th>";
					echo "<th></th>";
				echo "</tr>";
					while($row2=sqlsrv_fetch_array($result2))
					{
						echo "<tr class='myTableElencoTicketRowNormal'>";
							echo "<td style='padding:0px;'><input type='text' maxlength='50' class='myTableElencoTicketInput' onfocusout='updateTicket(".htmlspecialchars(json_encode('titolo')).",this.value,".$row2['id_ticket'].")' value='".$row2['titolo']."'></td>";
							echo "<td style='padding:0px;'><textarea style='resize:vertical' maxlength='200' class='myTableElencoTicketInput' onfocusout='updateTicket(".htmlspecialchars(json_encode('descrizione')).",this.value,".$row2['id_ticket'].")'>".$row2['descrizione']."</textarea></td>";
							echo "<td style='padding:0px;'><textarea style='resize:vertical' maxlength='200' class='myTableElencoTicketInput' onfocusout='updateTicket(".htmlspecialchars(json_encode('note')).",this.value,".$row2['id_ticket'].")'>".$row2['note']."</textarea></td>";
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
								case "Chiuso":
									$color="green";
									echo '<td style="padding-right:0px;color:'.$color.'">Chiuso</td><td style="padding:0px;text-align:center"><i class="far fa-check" style=";color:'.$color.'"></i></td>';
									break;
							}
							echo "<td style='padding-left:20px;max-width:250px;'>".$row2['noteAssistenza']."</td>";
							echo "<td style='max-width:250px;'>".$row2['descrizioneChiusura']."</td>";
							if($row2['dataOraChiusura']=='')
								echo "<td></td>";
							else
								echo "<td>".$row2['dataOraChiusura']->format('d/m/Y H:i:s')."</td>";
							echo "<td style='padding-right:0px;padding-top:0px;padding-bottom:0px;padding-left:20px;'><button class='btnEliminaTicket' onclick='eliminaTicket(".$row2['id_ticket'].")'>Elimina<i class='far fa-minus' style='font-size:80%;margin-left:10px'></i></button></td>";
							echo "<td style='width:30px' id='risultato".$row2['id_ticket']."'></td>";
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
?>