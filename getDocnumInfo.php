<?php

	include "connessione.php";

	$docnum=$_REQUEST['docnum'];
	
	$query2="SELECT TOP(1) T_Picking_01.* FROM T_Picking_01 WHERE docNum='$docnum'";	
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
				$N_Pick=$row2['n_Pick'];
				if($row2['dataImportazionePick']==null || $row2['dataImportazionePick']=='')
					$dataImportazionePick="non ancora importato";
				else
					$dataImportazionePick=$row2['dataImportazionePick']->format('d/m/Y H:i:s');
				if($row2['dataChiusura']==null || $row2['dataChiusura']=='')
					$dataChiusura="ancora non chiuso";
				else
					$dataChiusura=$row2['dataChiusura']->format('d/m/Y H:i:s');
				echo "<div style='font-family:arial;font-size:120%;color:#66B2FF;font-weight:bold;margin-top:50px;'>
						<span style='color:gray;'>N_Pick:&nbsp</span>$N_Pick&nbsp&nbsp
						<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspData importazione:&nbsp</span>$dataImportazionePick&nbsp&nbsp
						<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspData chiusura:&nbsp</span>$dataChiusura";
				echo "</div>";
			}
		}
	}
	
	$query="SELECT * FROM Q_Picking_04 WHERE docNum='$docnum'";
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
			echo '<table id="myTable" style="font-family:sans-serif;margin-top:50px;">';
				echo '<tr>';
					echo '<th style="background:#E6E6E6;color:gray">N_Pick</th>';
					echo '<th style="background:#E6E6E6;color:gray">DescrPick</th>';
					echo '<th style="background:#E6E6E6;color:gray">DocNum</th>';
					echo '<th style="background:#E6E6E6;color:gray">NRiga</th>';
					echo '<th style="background:#E6E6E6;color:gray">ItemCode</th>';
					echo '<th style="background:#E6E6E6;color:gray">Descrizione</th>';
					echo '<th style="background:#E6E6E6;color:gray">DataPick</th>';
					echo '<th style="background:#E6E6E6;color:gray">Cliente</th>';
				echo '</tr>';
				while($row=sqlsrv_fetch_array($result))
				{
					echo '<tr>';
						echo '<td>'.$row['N_Pick'].'</td>';
						echo '<td>'.$row['DescrPick'].'</td>';
						echo '<td>'.$row['DocNum'].'</td>';
						echo '<td>'.$row['N_Riga'].'</td>';
						echo '<td>'.$row['ItemCode'].'</td>';
						echo '<td>'.$row['Dscription'].'</td>';
						echo '<td>'.$row['DataPick']->format('d/m/Y').'</td>';
						echo '<td>'.$row['CardName'].'</td>';
					echo '</tr>';
				}
			echo "</table>";
		}
	}
?>