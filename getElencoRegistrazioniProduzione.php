<?php

	include "Session.php";
	include "connessione.php";
	
	$query2="SELECT * FROM registrazioni_produzione_view ORDER BY dataOra desc";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo '<input type="search" id="searchInputRegistrazioniProduzione" class="searchInputRegistrazioniProduzione" placeholder="Cerca nella tabella..." onkeyup="seacrhTable()" />';
		echo "<table id='myTableElencoRegistrazioni'>";
			echo "<tr class='myTableElencoRegistrazioniRowHeader'>";
				echo "<th onclick='sortTable(0)'>Id<i class='fas fa-sort' style='margin-left:5px'></i></th>";
				echo "<th onclick='sortTable(1)'>Ordine<i class='fas fa-sort' style='margin-left:5px'></i></th>";
				echo "<th onclick='sortTable(2)'>Stazione<i class='fas fa-sort' style='margin-left:5px'></i></th>";
				echo "<th onclick='sortTable(3)'>Data<i class='fas fa-sort' style='margin-left:5px'></i></th>";
				echo "<th onclick='sortTable(4)'>Utente<i class='fas fa-sort' style='margin-left:5px'></i></th>";
				echo "<th onclick='sortTable(5)'>Stato<i class='fas fa-sort' style='margin-left:5px'></i></th>";
				echo "<th onclick='sortTable(6)'>Codice non previsto<i class='fas fa-sort' style='margin-left:5px'></i></th>";
				echo "<th onclick='sortTable(7)'>N. allegati<i class='fas fa-sort' style='margin-left:5px'></i></th>";
			echo "</tr>";
			while($row2=sqlsrv_fetch_array($result2))
			{
				echo "<tr class='myTableElencoRegistrazioniRowNormal'>";
					echo "<td>".$row2['id_registrazione']."</td>";
					echo "<td>".$row2['ordine']."</td>";
					echo "<td>".$row2['stazione']."</td>";
					echo "<td>".$row2['dataOra']->format('d/m/Y - H:i:s')."</td>";
					echo "<td>".$row2['username']."</td>";
					echo "<td>".$row2['stato']."</td>";
					if($row2['codiceNonPresente']=='true')
						echo '<td><i class="fas fa-exclamation"></i></td>';
					else
						echo "<td></td>";
					echo "<td>".$row2['nAllegati']."</td>";
				echo "</tr>";
			}
		echo "</table>";
	}
	
?>