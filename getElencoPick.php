<?php
	include "session.php";
	include "connessione.php";
		
	set_time_limit(240);
	
	$stato=$_REQUEST['stato'];
	$settimana=$_REQUEST['settimana'];
	$stato_righe=$_REQUEST['stato_righe'];
	
	$docNumList = array();
	//$queryPickChiusi="SELECT * FROM statoPick WHERE $stato AND settimana LIKE '%$settimana%' ORDER BY N_Pick DESC";
	$queryPickChiusi="SELECT * FROM statoPick WHERE stato='$stato' AND stato_righe='$stato_righe' AND settimana LIKE '%$settimana%' ORDER BY N_Pick DESC";
	$resultPickChiusi=sqlsrv_query($conn,$queryPickChiusi);
	if($resultPickChiusi==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$queryPickChiusi."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($rowPickChiusi=sqlsrv_fetch_array($resultPickChiusi))
		{
			$checked=controllaChecked($conn,$rowPickChiusi['N_Pick']);
			$docNumList=getDocNumList($conn,$rowPickChiusi['N_Pick']);
			$explDocNumList=implode("|",$docNumList);
			?><b class="pickChiusi" data-toggle="tooltip" title="Dettaglio <?php echo $rowPickChiusi["N_Pick"]; ?>" onclick="apriDettaglio('<?php echo $rowPickChiusi["N_Pick"]; ?>')" ><?php echo $rowPickChiusi["N_Pick"].'</b>
			&nbsp&nbsp-&nbsp&nbsp<b style="display:inline-block;font-family:arial;font-size:100%;color:gray;font-weight:normal;">'.$rowPickChiusi["DescrPick"].'</b>';
			if($stato=='chiuso')
			{
				echo '<b style="float:right;display:block;width:5%;height:15px;overflow:hidden">';?><input type="checkbox" name="controllato" id="controllato<?php echo $rowPickChiusi["N_Pick"]; ?>" <?php echo $checked; ?> onchange="controllato('<?php echo $rowPickChiusi["N_Pick"]; ?>');verifica2('<?php echo $rowPickChiusi["N_Pick"]."','".$explDocNumList."','".count($docNumList); ?>')" ></b><br><?php
			}
			else
				echo "<br>";
			
			echo "<div id='dettaglio".$rowPickChiusi["N_Pick"]."' class='dettaglio' style='text-align:center' >";
				$i=0;
				while($i<count($docNumList))
				{
					$checkedS=controllaCheckedS($conn,$rowPickChiusi['N_Pick'],$docNumList[$i]);
					echo $docNumList[$i];
					if($stato=='chiuso')
					{
						?>&nbsp&nbsp<input type="checkbox" name="controllatoS" id="controllatoS<?php echo $rowPickChiusi["N_Pick"].$docNumList[$i]; ?>" <?php echo $checkedS; ?> onchange="controllatoS('<?php echo $rowPickChiusi["N_Pick"]; ?>','<?php echo $docNumList[$i]; ?>');verifica('<?php echo $rowPickChiusi["N_Pick"]."','".$explDocNumList."','".count($docNumList); ?>')" ><?php
					}
					echo "<br>";
					$i++;
				}
			echo "</div>";
			echo "<hr size='1' style='border-color:#80B3E6'>";
		}
	}

	
	function controllaChecked($conn,$N_Pick)
	{
		$query2="SELECT controllato FROM T_Picking_01 WHERE T_Picking_01.N_Pick=$N_Pick";
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
				if($row2['controllato']=='false')
					return "";
			}
		}
		return "checked";
	}
	function getDocNumList($conn,$N_Pick)
	{
		$docNum = array();
		$query2="SELECT DISTINCT docNum FROM T_Picking_01 WHERE T_Picking_01.N_Pick=$N_Pick";
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
				array_push($docNum,$row2['docNum']);
			}
		}
		return $docNum;
	}
	function controllaCheckedS($conn,$N_Pick,$docNum)
	{
		$query2="SELECT controllato FROM T_Picking_01 WHERE T_Picking_01.N_Pick=$N_Pick AND docNum=$docNum";
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
				if($row2['controllato']=='false')
					return "";
			}
		}
		return "checked";
	}
	function controlloPagina($conn,$username,$pagina)
	{
		$query2="SELECT accesso_pagine.accesso FROM accesso_pagine,utenti WHERE accesso_pagine.utente=utenti.id_utente AND utenti.username='$username' AND accesso_pagine.pagina='$pagina'";
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
				if($row2['accesso']=='negato')
					return FALSE;
				else
					return TRUE;
			}
			return TRUE;
		}
	}
?>