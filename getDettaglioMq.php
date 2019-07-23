<?php
	include "connessione.php";
	include "Session.php";
	
	$docnum=$_REQUEST['docnum'];
	$stazione=$_REQUEST['stazione'];
	
	$q="SELECT ordine, stazione, quantita, mq, ItemCode, ItemName FROM dbo.dettaglio_mq WHERE (stazione = N'$stazione') AND (ordine = N'$docnum')";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		die("error");
	}
	else
	{
		echo "<table id='myTableColoriCollezioni'>";
			echo "<tr>";
				echo "<th>Ordine</th>";
				echo "<th>Stazione</th>";
				echo "<th>Qnt</th>";
				echo "<th>Mq</th>";
				echo "<th style='min-width:25px;max-width:25px;'></th>";
				echo "<th>ItemCode</th>";
				echo "<th>ItemName</th>";
			echo "</tr>";
		while($row=sqlsrv_fetch_array($r))
		{
			echo "<tr>";
				echo "<td>".$row['ordine']."</td>";
				echo "<td>".$row['stazione']."</td>";
				echo "<td>".number_format($row['quantita'],0)."</td>";
				echo "<td><input type='number' class='inputCorreggiMq' step='0.1' onfocusout='setCorrezioneMq(".htmlspecialchars(json_encode($row['ItemCode'])).",".htmlspecialchars(json_encode(number_format($row['mq'],1))).",this.value)' value='".number_format($row['mq'],1)."'></td>";
				echo "<td style='min-width:25px;max-width:25px;' id='resultCorreggiMq".$row['ItemCode']."'></td>";
				echo "<td>".$row['ItemCode']."</td>";
				echo "<td>".$row['ItemName']."</td>";
			echo "</tr>";
		}
		echo "</table>";
	}
?>