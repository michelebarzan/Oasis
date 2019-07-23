<?php

	/*include "Session.php";
	include "connessione.php";
	
	$query2="SELECT * FROM colori_collezioni";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo "<table id='myTableColoriCollezioni'>";
			echo "<tr>";
				echo "<th>Sigla</th>";
				echo "<th>Collezione</th>";
				echo "<th>Colore</th>";
				echo "<th></th>";
				echo "<th></th>";
			echo "</tr>";
		while($row2=sqlsrv_fetch_array($result2))
		{
			echo "<tr>";
				echo "<td>".$row2['sigla']."</td>";
				echo '<td>'.$row2["collezione"].'</td>';
				echo '<td id="colonnaColore'.$row2["id_colore_collezione"].'"><input class="jscolor" value="'.$row2["colore"].'"></td>';
				echo '<td><input type="button" id="btnModificaColoriCollezioni" class="btnBlu" onclick="modificaColoriCollezioni('.$row2["id_colore_collezione"].')" value="Modifica" /></td>';
				echo '<td id="risultato'.$row2["id_colore_collezione"].'"></td>';
			echo "</tr>";
		}
		echo "</table>";
	}*/
	
?>