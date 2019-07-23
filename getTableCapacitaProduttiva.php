<?php

	include "Session.php";
	include "connessione.php";
	
	$query2="SELECT * FROM capacita_produttiva";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		echo "<table id='myTableCapacitaProduttiva'>";
			echo "<tr>";
				echo "<th>Settimana</th>";
				echo "<th>Capacita</th>";
				echo "<th>Unita di midura</th>";
				echo "<th>Stazione</th>";
			echo "</tr>";
		while($row2=sqlsrv_fetch_array($result2))
		{
			echo "<tr>";
				echo '<td onfocusout="'. 'modificaSettimana(this.innerHTML,' . htmlspecialchars(json_encode($row2['Tipo_mont'])) . ','. htmlspecialchars(json_encode("Punto-Punto")) . ')" contenteditable>'.$row2["Punto-Punto"].'</td>';
				echo '<td onfocusout="'. 'modificaSettimana(this.innerHTML,' . htmlspecialchars(json_encode($row2['Tipo_mont'])) . ','. htmlspecialchars(json_encode("Verniciatura")) . ')" contenteditable>'.$row2["Verniciatura"].'</td>';
				echo '<td onfocusout="'. 'modificaSettimana(this.innerHTML,' . htmlspecialchars(json_encode($row2['Tipo_mont'])) . ','. htmlspecialchars(json_encode("Montaggio")) . ')" contenteditable>'.$row2["Montaggio"].'</td>';
				echo '<td onfocusout="'. 'modificaSettimana(this.innerHTML,' . htmlspecialchars(json_encode($row2['Tipo_mont'])) . ','. htmlspecialchars(json_encode("Imbalaggio")) . ')" contenteditable>'.$row2["Imbalaggio"].'</td>';//loris dimentica le doppie
			echo "</tr>";
		}
		echo "</table>";
	}
	
?>