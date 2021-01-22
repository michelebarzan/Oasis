<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Controlla pick";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<script src="struttura.js"></script>
		<script src="js/controlloPick.js"></script>
		<link rel="stylesheet" href="css/controlloPick.css" />
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	</head>
	<body onload="getElencoPick()">
		<button onclick="topFunction()" id="btnGoTop" title="Go to top"></button>
		<script>
		// When the user scrolls down 20px from the top of the document, show the button
			window.onscroll = function() {scrollFunction()};

			function scrollFunction() 
			{
				if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) 
				{
					document.getElementById("btnGoTop").style.width = "48px";
					document.getElementById("btnGoTop").style.height = "48px";
					document.getElementById("btnGoTop").style.opacity = "1";
				} 
				else 
				{
					document.getElementById("btnGoTop").style.width = "0px";
					document.getElementById("btnGoTop").style.height = "0px";
					document.getElementById("btnGoTop").style.opacity = "0";
				}
			}

			// When the user clicks on the button, scroll to the top of the document
			function topFunction() 
			{
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			}
		</script>
		<?php include('struttura.php'); ?>
		<div class="reusable-control-bar" id="actionBarControlloPick">
            <!--<div class="rcb-select-container" style="display:flex;flex-direction:row;align-items:center">
                <span>Stato:</span>
                <select id="selectStatoControlloPick" onchange="getElencoPick()" style="text-decoration:none">
					<option value="chiuso">chiusi dal magazziniere</option>
					<option value="aperto">aperti</option>
				</select>
				<select id="selectOperatoreControlloPick" onchange="getElencoPick()" style="text-decoration:none">
					<option value="AND">e</option>
					<option value="OR">o</option>
				</select>
				<select id="selectStatoRigheControlloPick" onchange="getElencoPick()" style="text-decoration:none">
					<option value="chiuso">solo gli ordini in un bancale</option>
					<option value="aperto">tutti gli ordini</option>
                </select>
			</div>-->
			<div class="rcb-select-container" style="display:flex;flex-direction:row;align-items:center">
                <span>Stato:</span>
                <select id="selectStatoControlloPick" onchange="getElencoPick()" style="text-decoration:none">
					<option value="chiuso">chiusi dal magazziniere</option>
					<option value="aperto">aperti</option>
				</select>
			</div>
			<div class="rcb-select-container" style="display:flex;flex-direction:row;align-items:center">
                <span>Ordini:</span>
                <select id="selectStatoRigheControlloPick" onchange="getElencoPick()" style="text-decoration:none">
					<option value="chiuse">solo gli ordini in un bancale</option>
					<option value="aperte">tutti gli ordini</option>
                </select>
			</div>
			<div class="rcb-select-container" style="display:flex;flex-direction:row;align-items:center">
                <span>Settimana:</span>
                <select id="selectSettimanaControlloPick" onchange="getElencoPick()" style="text-decoration:none">
					<option value="%">tutte</option>
					<?php
					$query2="SELECT DISTINCT settimana FROM statoPick ORDER BY settimana DESC";
					$result2=sqlsrv_query($conn,$query2);
					if($result2==FALSE)
					{
						die();
					}
					else
					{
						while($row2=sqlsrv_fetch_array($result2))
						{
							echo '<option value="'.$row2["settimana"].'">'.$row2["settimana"].'</option>';
						}
					}
					?>
                </select>
            </div>
		</div>
		<div id="controllaPickContainer"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>



<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->

<?php
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


