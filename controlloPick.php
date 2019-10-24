<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Controlla pick";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
			<link rel="stylesheet" href="css/styleV35.css" />
			<link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text" rel="stylesheet">
			<script src="struttura.js"></script>
			<script>
				function controllato(N_Pick)
				{
					//window.alert(a);
					var controllato = document.getElementById("controllato"+N_Pick).checked ;
					
					//window.alert(N_Pick+" stato: "+controllato);
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							//location.reload();
							//document.getElementById("controllato"+N_Pick).style.backgroundColor ="green" ;
						}
					};
					xmlhttp.open("POST", "setControllato.php?N_Pick=" + N_Pick + "&controllato=" + controllato, true);
					xmlhttp.send();
					//if(controllato==false)
						//location.reload();
				}
				function apriDettaglio(N_Pick)
				{
					var stato=document.getElementById("dettaglio"+N_Pick).style.display;
					if(stato=="inline-block")
						document.getElementById("dettaglio"+N_Pick).style.display="none" ;
					else
						document.getElementById("dettaglio"+N_Pick).style.display="inline-block" ;
				}
				function setOffsetHeight()
				{
					var offsetHeight = document.getElementById('content').offsetHeight;
					document.getElementById('navBar').style.height = offsetHeight+"px";
				}
				function controllatoS(N_Pick,docNum)
				{
					//window.alert(a);
					var controllato = document.getElementById("controllatoS"+N_Pick+docNum).checked ;
					
					//window.alert(N_Pick+" stato: "+controllato);
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							//location.reload();
							//document.getElementById("res").innerHTML ="green" ;
						}
					};
					xmlhttp.open("POST", "setControllatoS.php?N_Pick=" + N_Pick + "&controllato=" + controllato + "&docNum=" + docNum, true);
					xmlhttp.send();
					//if(controllato==false)
						//location.reload();
				}
				function verifica(N_Pick,docNumList,n)
				{
					//window.alert(n);
					var res = docNumList.split("|");
					var i=0;
					
					var trovato=true;
					while(i<n)
					{
						if(document.getElementById("controllatoS"+N_Pick+res[i]).checked==false)
						{	
							//document.getElementById("controllato"+N_Pick).checked==false;
							trovato=false;
						}
						i++;
					}
					document.getElementById("controllato"+N_Pick).checked=trovato;
				}
				function verifica2(N_Pick,docNumList,n)
				{
					var res = docNumList.split("|");
					var i=0;
					
					var trovato=document.getElementById("controllato"+N_Pick).checked;
					while(i<n)
					{
						document.getElementById("controllatoS"+N_Pick+res[i]).checked=trovato;
						i++;
					}
				}
				function getElencoPick()
				{
					var stato=document.getElementById('selectStatoControlloPick').value;
					var settimana=document.getElementById('selectSettimanaControlloPick').value;
					
					document.getElementById('controllaPickContainer').innerHTML='<div class="sk-cube-grid" style="width:24px;height:24px;margin-left:514px;margin-top:200px;text-align:center;background-color: #12365A;" ><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById("controllaPickContainer").innerHTML =this.responseText ;
						}
					};
					xmlhttp.open("POST", "getElencoPick.php?stato=" + stato+"&settimana="+settimana, true);
					xmlhttp.send();
				}
			</script>
			<style>
				@import url(http://fonts.googleapis.com/css?family=Exo:100,200,400);
				@import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:700,400,300);
				
				/* width */
				::-webkit-scrollbar {
					width: 10px;
				}

				/* Track */
				::-webkit-scrollbar-track {
					background: #f1f1f1; 
				}
				 
				/* Handle */
				::-webkit-scrollbar-thumb {
					background: #888; 
				}

				/* Handle on hover */
				::-webkit-scrollbar-thumb:hover {
					background: #555; 
				}
			</style>
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
		<div id="container">
			<div id="content">
				<div id="immagineLogo" class="immagineLogo" style="margin-bottom:30px;" ></div>
					<?php
						if(controlloPagina($conn,$_SESSION['Username'],'controlloPick.php')==FALSE)
						{
							echo '<br><span style="font-family:arial;font-size:100%;color:red;font-weight:bold;">Accesso alla pagina non consentito</span>
								</div>
										</div>
										<div id="push"></div>
										<div id="footer">
											<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
										</div>
									</body>
								</html>
								';
							die();
						}
					?>
					<div class="longTitle">
						Elenco pick&nbsp
						<select id="selectStatoControlloPick" class="selectControlloPick" onchange="getElencoPick()">
							<option value="chiuso">chiusi</option>
							<option value="aperto">aperti</option>
						</select>
						&nbspsettimana&nbsp
						<select id="selectSettimanaControlloPick" class="selectControlloPick" onchange="getElencoPick()">
							<option value="%">tutte</option>
							<?php
							$query2="SELECT DISTINCT settimana FROM statoPick ORDER BY settimana DESC";
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
									echo '<option value="'.$row2["settimana"].'">'.$row2["settimana"].'</option>';
								}
							}
							?>
						</select>
					</div>
					<div id="controllaPickContainer"></div>
			</div>
		</div>
		<div id="push"></div>
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


