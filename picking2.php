<?php
include "Session.php";
?>
<html>
	<head>
		<title>Picking</title>
			<link rel="stylesheet" href="css/stylePicking.css" />
			<script type="text/javascript">
				 function FocusOnInput()
				 {
					 document.getElementById("codice1").focus();
				 }
				 function cambiaSfondo(docLineNum)
				 {
					 setTimeout(function()
					 { 
						/*try
						{
							document.getElementById(docLineNum).focus();
						}
						catch(err)
						{
							window.alert(err);
						}*/
						var all = document.getElementsByClassName(docLineNum);
						/*for (var i = 0; i < all.length; i++) 
						{*/
							all[0].style.color = '#39D700';
							//all[0].style.fontSize = '110%';
						/*}*/
					 }, 500);
				 }
				 function colora(color)
				 {
					 document.getElementById("container").style.backgroundColor = color;
				 }
				 function nuovaListaDiCarico(N_Pick)
				 {
					/*var txt = prompt("Stai cambiando lista di carico");
					if (txt == "Annulla") 
					{
						document.getElementById("outputDiv").innerHTML = '<form method="POST" action="picking2.php" name="cambia">';
						document.getElementById("outputDiv").innerHTML = '<input type="hidden" value=N_Pick name="codice1"></form>';
						document.cambia.submit();
					}*/
				 }
				 function invia()
				 {
					 document.bancaleF.submit();
				 }
				 function seleziona(value)
				 {
					 document.getElementById("codice1").value=value;
					 document.getElementById("codice1").focus();
					 document.formCodice1.submit();
					// window.alert(value);
				 }
				function cancella(str) 
				{
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							//window.alert(this.responseText);
							document.getElementById("codice1").value = this.responseText;
							location.reload();
						}
					};
					xmlhttp.open("POST", "cancellaRigaPicking.php?id_picking=" + str, true);
					xmlhttp.send();
				}
				function process(e) 
				{
					var valore;
					var code = (e.keyCode ? e.keyCode : e.which);
					if (code == 13) 
					{
						valore=document.getElementById("codice1").value;
						//window.alert(valore);
						if(valore>10000000 && valore<99999999 && !isNaN(valore))
						{
							var bancale = prompt("Spara un bancale o creane uno nuovo");
							var xmlhttp = new XMLHttpRequest();
							xmlhttp.onreadystatechange = function() 
							{
								if (this.readyState == 4 && this.status == 200) 
								{
									/*setTimeout(function()
									{ 
										document.formCodice1.submit();
									}, 500);*/
								}
							};
							xmlhttp.open("POST", "setTmpBancale.php?bancale=" + bancale, true);
							xmlhttp.send();
						}
					}
				}
				function cambiaBancale(id_picking)
				{
					var id_bancale;
					id_bancale=document.getElementById("cambiaBancale"+id_picking).value;
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							if(this.responseText=="Errore")
								document.getElementById("cambiaBancaleTD"+id_picking).innerHTML = "<b style='color:red'>   Errore</b>";
						}
					};
					xmlhttp.open("POST", "cambiaBancale.php?id_bancale=" + id_bancale + "&id_picking=" + id_picking, true);
					xmlhttp.send();
				}
			</script>
			<style>
				@import "compass/css3";
				.flash 
				{
					font-size:200%;
					font-family:arial;
					animation-name: flash;
					animation-duration: 0.6s;
					animation-timing-function: linear;
					animation-iteration-count: infinite;
					animation-direction: alternate;
					animation-play-state: running;
				}
				@keyframes flash 
				{
					from {color:red;}
					to {color: black;}
				}
			 </style>
	</head>
	<body onload="FocusOnInput()">
		<div id="container">
			<div id="header">
				<div id="user">
				<?php
					include "connessione.php";
					$N_Pick=NULL;
					$docLineNum=NULL;
					$bancale=NULL;
					
					echo $_SESSION['Username'];
					
					$codice=$_POST['codice1'];
				?>
				</div>
				<div id="stampaEtichetteBancali" class="stampaEtichetteBancali">
					<?php
					echo "<form name='stampaEBancaleF' id='stampaEBancaleF' method='POST' action='stampaBancale.php' >";
						echo "<select name='nuovoBancale' id='stampaEBancaleS' onchange='document.stampaEBancaleF.submit()' >";
						echo "<option value='' disabled selected>Stampa etichetta bancale</option>";
						if($codice>9 && $codice<9999 && is_numeric($codice))
						{
							$querystampaEBancale="SELECT nome FROM bancali WHERE bancali.n_Pick = ".$codice;
						}
						else
						{
							$querystampaEBancale="SELECT nome FROM bancali WHERE bancali.n_Pick = ".$_SESSION['N_Pick'];
						}
						$resultstampaEBancale=sqlsrv_query($conn,$querystampaEBancale);
						if($resultstampaEBancale==FALSE)
						{
							echo "<br><br>Errore esecuzione query<br>Query: ".$querystampaEBancale."<br>Errore: ";
							die(print_r(sqlsrv_errors(),TRUE));
						}
						else
						{
							while($rowstampaEBancale=sqlsrv_fetch_array($resultstampaEBancale))
							{
								echo "<option value='".$rowstampaEBancale['nome']."'>".$rowstampaEBancale['nome']."</option>";
							}
						}
						echo "</select>";
					echo "</form>";
					?>
				</div>
				<div id="logout" class="logout">
					<!--<form method="POST" action="logout.php">
						<input type="submit" value="logout">
					</form>-->
				</div>
			</div>
			<div id="content">
				<div id="riga1">
					<div id="codice" class="codice">
						<form action="picking2.php" method="POST" name="formCodice1" id="formCodice1">
							<input type="text" id="codice1" name="codice1" placeholder="Spara un codice" onkeypress="process(event, this);" required/>
							
							<select name='codice1' id='Scodice1' onchange='document.formCodice1.submit()' >
								<?php
								if($codice>9 && $codice<9999 && is_numeric($codice))
								{
									echo "<option value='' disabled selected>Bancale</option>";
									echo "<option value='NUOVOBANCALE' >NUOVOBANCALE</option>";
									$query="SELECT nome FROM bancali WHERE bancali.n_Pick = ".$codice;
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
											echo "<option value='".$row['nome']."'>".$row['nome']."</option>";
										}
									}
								}
								else
								{
									echo "<option value='' disabled selected>Bancale</option>";
									echo "<option value='NUOVOBANCALE' >NUOVOBANCALE</option>";
									$query="SELECT nome FROM bancali WHERE bancali.n_Pick = ".$_SESSION['N_Pick'];
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
											echo "<option value='".$row['nome']."'>".$row['nome']."</option>";
										}
									}
								}
								?>
							</select>
						</form>
						<!--<div id="popup" class="popup">Hai cambiato lista di carico</div>-->
					</div>
					<div id="immagine">
					</div>
				</div>
				
				<!--<input type="button" onclick="prova()">-->
				<div id="tabella" class="tabella">
				<?php
					//calcolaNBancali($conn);
					switch ($codice) 
					{
						case $codice>9 && $codice<9999 && is_numeric($codice): 
							/*if(isset($_SESSION['N_Pick']) && $_SESSION['N_Pick']!=$codice)
							{
								$_SESSION['N_Pick']=$codice;
								annulla($conn);
							}*/
							$N_Pick=$codice; 
							inserisciN_Pick($conn,$N_Pick);
							//INSERISCI NELLA TABELLA
							$_SESSION['N_Pick']=$N_Pick;
							$qDatiIntestazione="SELECT descrPick FROM T_Picking_01 WHERE n_Pick=$N_Pick";
							$descrPick=NULL;
							$rDatiIntestazione=sqlsrv_query($conn,$qDatiIntestazione);
							if($rDatiIntestazione==FALSE)
							{
								echo "<br><br>Errore esecuzione query<br>Query: ".$qDatiIntestazione."<br>Errore: ";
								die(print_r(sqlsrv_errors(),TRUE));
							}
							else
							{
								while($rowDatiIntestazione=sqlsrv_fetch_array($rDatiIntestazione))
								{
									$descrPick=$rowDatiIntestazione['descrPick'];
									$_SESSION['descrPick']=$descrPick;
								}
							}
							echo "<br>";
							echo "<div style='font-family:arial;font-size:120%;color:#66B2FF;font-weight:bold;'>
									<span style='color:gray;'>N_Pick:&nbsp</span>$N_Pick&nbsp&nbsp
									<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspDestinatario:&nbsp</span>$descrPick&nbsp&nbsp
									<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspNumero pallet:&nbsp</span>".calcolaNBancali($conn)."";
							echo "</div>";
							echo "<br>";
							
							creaEriempiTabella($conn,$N_Pick);
							break;
						//-----------------------------------------------------------------------------------------------------------------------------
						case "ANNULLA": 
							if(isset($_SESSION['N_Pick']))
							{
								annulla($conn);
							}
							else
								echo "<script>window.location = 'picking.php' </script>";
							break;
						//-----------------------------------------------------------------------------------------------------------------------------------------------
						case $codice>99999999 && is_numeric($codice):
							if(isset($_SESSION['N_Pick']))
							{
								$docLineNum=$codice;
								$N_Pick=$_SESSION['N_Pick'];
								$descrPick=$_SESSION['descrPick'];
								if(controllaCollo($N_Pick,$docLineNum,$conn)==FALSE)
								{
									echo "<br><b id='flash' class='flash'>Il codice collo $docLineNum potrebbe non essere presente nell'elenco, gia inserito in un bancale o essere gia' stato sparato</b><br>";
									echo '<script>colora("red")</script>';
									annulla($conn);
								}
								else
								{
									echo "<br>";
									echo "<div style='font-family:arial;font-size:120%;color:#66B2FF;font-weight:bold;'>
											<span style='color:gray;'>N_Pick:&nbsp</span>$N_Pick&nbsp&nbsp
											<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspDestinatario:&nbsp</span>$descrPick&nbsp&nbsp
											<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspNumero pallet:&nbsp</span>".calcolaNBancali($conn)."";
									echo "</div>";
									echo "<br>";
									echo "<div style='font-family:arial;font-size:120%;color:red;font-weight:bold;'>";
									if(countArrayColliSparati($conn,$N_Pick)>1)
										echo '<script>colora("#F9EF62")</script>';
									echo "<span style='color:gray;'>Codice collo:&nbsp</span>".arrayColliSparati($conn,$N_Pick)."";
									echo "</div>";
									echo "<br>";
									
									creaEriempiTabella($conn,$N_Pick);
								}
							}
							else
								echo "<script>window.location = 'picking.php' </script>";
							break;
						//-----------------------------------------------------------------------------------------------------------------------------------------------
						case $codice=="NUOVOBANCALE"://stampa etichetta nuova "BANCALEN_PICK/ultimoNBancale+1"
							if(isset($_SESSION['N_Pick']))
							{
								$N_Pick=$_SESSION['N_Pick'];
								$descrPick=$_SESSION['descrPick'];
								//CREO NUOVO BANCALE
								$bancaleCreato=nuovoBancale($N_Pick,$conn);
								//$_SESSION['nBancali']++;
								//echo "Bancale&nbsp".$bancaleCreato."&nbspcreato<br>";
								//STAMPO
								$_SESSION['NuovoBancale']=$bancaleCreato;
								if(stampa($conn)!=TRUE)
								{
									echo "<b id='flash' class='flash'>Errore in stampa</b>";
									echo '<script>colora("red")</script>';
								}
							}
							else
								echo "<script>window.location = 'picking.php' </script>";
							break;
						//-----------------------------------------------------------------------------------------------------------------------------------------------
						case $codice=="CHIUDI"://chiude la pag e passa alla pagina di verifica
							if(isset($_SESSION['N_Pick']))
							{
								$N_Pick=$_SESSION['N_Pick'];
								if(nAperti($conn,$N_Pick)>0)
								{
									echo "<br><br><b id='flash' class='flash'>Alcuni colli non sono stati assegnati ad un bancale. Vuoi proseguire comunque e chiudere quelli assegnati? (Si/No)</b>";
									echo '<script>colora("#F9EF62")</script>';
								}
								else
									echo "<script>window.location = 'calcolaPesoLordo.php' </script>";
							}
							else
								echo "<script>window.location = 'picking.php' </script>";
							break;
						//-----------------------------------------------------------------------------------------------------------------------------------------------
						case $codice=="SI":
						if(isset($_SESSION['N_Pick']))
						{
							$N_Pick=$_SESSION['N_Pick'];
							$qChiudi="UPDATE T_Picking_01 SET chiuso='V',dataChiusura='".date('m/d/Y h:i:s', time())."' WHERE n_Pick=$N_Pick AND NOT(bancale IS NULL) AND NOT(gruppo IS NULL)";
							$rChiudi=sqlsrv_query($conn,$qChiudi);
							if($rChiudi==FALSE)
							{
								echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$qChiudi."<br>Errore: ";
								die(print_r(sqlsrv_errors(),TRUE));
							}
							else
								echo "<script>window.location = 'calcolaPesoLordo.php' </script>";
						}
						else
							echo "<script>window.location = 'picking.php' </script>";
						break;
						//-----------------------------------------------------------------------------------------------------------------------------------------------
						case $codice=="NO":
						if(isset($_SESSION['N_Pick']))
						{
							annulla($conn);
						}
						else
							echo "<script>window.location = 'picking.php' </script>";
						break;
						//-----------------------------------------------------------------------------------------------------------------------------------------------
						case substr($codice, 0, 7)=="BANCALE" || substr($codice, 0, 7)=="SCATOLA" || substr($codice, 0, 5)=="CASSA":
							//echo "caso bancale";
							if(isset($_SESSION['N_Pick']))
							{
								$N_Pick=$_SESSION['N_Pick'];
								$descrPick=$_SESSION['descrPick'];
								if(arrayColliSparati($conn,$N_Pick)!=NULL)
								{	
									$bancale=$codice;
									$_SESSION['bancale']=$bancale;
									$N_Pick=$_SESSION['N_Pick'];
									$descrPick=$_SESSION['descrPick'];
									echo "<br>";
									echo "<div style='font-family:arial;font-size:120%;color:#66B2FF;font-weight:bold;'>
											<span style='color:gray;'>N_Pick:&nbsp</span>$N_Pick&nbsp&nbsp
											<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspDestinatario:&nbsp</span>$descrPick&nbsp&nbsp";
									echo "<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspNumero pallet:&nbsp</span>".calcolaNBancali($conn)."";
									echo "</div>";
									echo "<br>";
									echo "<div style='font-family:arial;font-size:120%;color:red;font-weight:bold;'>
											<span style='color:gray;'>Codice collo:&nbsp</span>".arrayColliSparati($conn,$N_Pick)."&nbsp&nbsp
											<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspCodice bancale:&nbsp</span>$bancale";
									echo "</div>";
									echo "<br>";
									
									if(controllaBancale($N_Pick,$bancale,$conn)==TRUE)
									{
										//Riempi colonna bancale
										assegnaBancale($conn,$N_Pick,$bancale);
										//Riempi colonna gruppo
										assegnaGruppo($conn,$N_Pick);
										annullaSparato($conn);
										ColliDisponibili($conn,$N_Pick);
										creaEriempiTabella($conn,$N_Pick);
									}
									else
									{
										echo "<br><br><b id='flash' class='flash'>Codice bancale non riconosciuto<br><br>Suggerimento: crea una nuova etichetta bancale</b>";
										echo '<script>colora("red")</script>';
										annullaSparato($conn);
										ColliDisponibili($conn,$N_Pick);
									}
								}
								else
								{
									echo "<br><br><b id='flash' class='flash'>Devi prima sparare un collo</b>";
									echo '<script>colora("red")</script>';
								}
							}
							else
								echo "<script>window.location = 'picking.php' </script>";
							break;
						//-----------------------------------------------------------------------------------------------------------------------------------------------
						case $codice>10000000 && $codice<99999999 && is_numeric($codice):
							if(isset($_SESSION['N_Pick']))
							{
								$docNum=$codice;
								$N_Pick=$_SESSION['N_Pick'];
								$descrPick=$_SESSION['descrPick'];
								if(controllaDocNum($N_Pick,$docNum,$conn)==FALSE)
								{
									echo "<br><b id='flash' class='flash'>Il codice collo $docNum potrebbe non essere presente nell'elenco, gia inserito in un bancale o essere gia' stato sparatoPROVA</b><br>";
									echo '<script>colora("red")</script>';
									annulla($conn);
								}
								else
								{
									$bancaleCreato=getTmpBancale($N_Pick,$conn);
									if($bancaleCreato=="NUOVOBANCALE")
									{
										$bancaleCreato=nuovoBancale($N_Pick,$conn);
										$_SESSION['NuovoBancale']=$bancaleCreato;
									}
									
									setBancaleGruppoDocNum($conn,$N_Pick,$docNum,$bancaleCreato);
									
									echo "<br>";
									echo "<div style='font-family:arial;font-size:120%;color:#66B2FF;font-weight:bold;'>
											<span style='color:gray;'>N_Pick:&nbsp</span>$N_Pick&nbsp&nbsp
											<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspDestinatario:&nbsp</span>$descrPick&nbsp&nbsp
											<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspNumero pallet:&nbsp</span>".calcolaNBancali($conn)."";
									echo "</div>";
									echo "<br>";
									annullaSparato($conn);
									ColliDisponibili($conn,$N_Pick);
									creaEriempiTabella($conn,$N_Pick);
								}
							
							}
							else
								echo "<script>window.location = 'picking.php' </script>";
							break;
						//-----------------------------------------------------------------------------------------------------------------------------------------------
						default: 
							echo "<br><br><b id='flash' class='flash'>Codice ''$codice'' non riconosciuto</b>";
							echo '<script>colora("red")</script>';
							break;
					}
				?>
				</div>
				
				</div>
			</div>
		</div>
		<div id="footer">
			Oasis Group  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->

<?php

function controllaDocNum($N_Pick,$docNum,$conn)
{
	$q="SELECT * FROM colliDisponibili WHERE docNum = ".$docNum;
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$rows = sqlsrv_has_rows( $r );
		if ($rows === true)
		{
			//cancella da colliDisponibili
			/*$q2="DELETE colliDisponibili FROM colliDisponibili WHERE docNum = ".$docNum;
			$r2=sqlsrv_query($conn,$q2);
			if($r2==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$q2."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
			else
			{*/
				//Nuovo bancale
				//WPdate set bacnnael = nuovobancale where docnum=
				//Update set gruppo
				return TRUE;
				/*$q3="UPDATE TOP (1) T_Picking_01 SET sparato='V' WHERE N_Pick=$N_Pick AND docNum = ".$output[0]." AND lineNum = ".$output[1]." AND sparato IS NULL";
				$r3=sqlsrv_query($conn,$q3);
				if($r3==FALSE)
				{
					echo "<br><br>Errore esecuzione query<br>Query: ".$q3."<br>Errore: ";
					die(print_r(sqlsrv_errors(),TRUE));
				}
				
				$colora=array();
				$colora=vArrayColliSparati($conn,$N_Pick);
				$lenght=count($colora);
				$j=0;
				while($j<$lenght)
				{
					echo "<script>cambiaSfondo('".$colora[$j]."');</script>";
					$j++;
				}*/
			//}
		}
		else 
			return FALSE;
	}
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------->
function arrayColliSparati($conn,$N_Pick)
{
	$colliSparati=array();
	$qColliSparati="SELECT docNum,lineNum FROM T_Picking_01 WHERE n_Pick=$N_Pick AND sparato='V'";
	$rColliSparati=sqlsrv_query($conn,$qColliSparati);
	if($rColliSparati==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$qColliSparati."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$i=0;
		while($rowColliSparati=sqlsrv_fetch_array($rColliSparati))
		{
			$colliSparati[$i]=$rowColliSparati['docNum']."00".$rowColliSparati['lineNum'];
			$i++;
		}
	}
	return implode(", ",$colliSparati);
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function vArrayColliSparati($conn,$N_Pick)
{
	$colliSparati=array();
	$qColliSparati="SELECT docNum,lineNum FROM T_Picking_01 WHERE n_Pick=$N_Pick AND sparato='V'";
	$rColliSparati=sqlsrv_query($conn,$qColliSparati);
	if($rColliSparati==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$qColliSparati."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$i=0;
		while($rowColliSparati=sqlsrv_fetch_array($rColliSparati))
		{
			$colliSparati[$i]=$rowColliSparati['docNum']."00".$rowColliSparati['lineNum'];
			$i++;
		}
	}
	return $colliSparati;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function countArrayColliSparati($conn,$N_Pick)
{
	$colliSparati=array();
	$qColliSparati="SELECT docNum,lineNum FROM T_Picking_01 WHERE n_Pick=$N_Pick AND sparato='V'";
	$rColliSparati=sqlsrv_query($conn,$qColliSparati);
	if($rColliSparati==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$qColliSparati."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$i=0;
		while($rowColliSparati=sqlsrv_fetch_array($rColliSparati))
		{
			$colliSparati[$i]=$rowColliSparati['docNum']."00".$rowColliSparati['lineNum'];
			$i++;
		}
	}
	return count($colliSparati);
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function iniziaSessione($conn)
{
	$UsernamePC = gethostbyaddr($_SERVER['REMOTE_ADDR']);
	//CANCELLA TUTTO CIO CHE CE DOPO IL PUNTO
	if (strpos($UsernamePC, '.') != false)
		$UsernamePC = substr($UsernamePC, 0, strpos($UsernamePC, "."));
	
	if($conn)
	{
		$queryPW="SELECT password, username FROM utenti WHERE usernamePC='$UsernamePC' ";
		$resultPW=sqlsrv_query($conn,$queryPW);
						
		if($resultPW==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$queryPW."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($rowPW=sqlsrv_fetch_array($resultPW))
			{
				$password=$rowPW['password'];
				$Username=$rowPW['username'];
			}
		}
	}
	else
	{
		echo "Connessione fallita";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	//echo getenv("USERNAME");
	if($Username!="" || $Username!=NULL)
		echo $Username;
	else
	{
		echo "<b style='color:red'>Utente non registrato</b>";
		
		echo '</div>
				<div id="logout" class="logout" style="margin-top:1%";>
					<form method="POST" action="logout.php">
						<input type="submit" value="logout">
					</form>
				</div>';
		die();
	}
	$_SESSION['Username']=$Username;
	$_SESSION['Password']=$password;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function creaEriempiTabella($conn,$N_Pick)
{
	echo '<table id="myTable">';
	echo '<tr class="header">';
		creaHeader($conn);
	echo '</tr>';
		riempiTabella($conn,$N_Pick);
	echo '</table>';
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function creaHeader($conn)
{
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Azione</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Chiuso</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Bancale</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Gruppo</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">DescrPick</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">N_Pick</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">DocNum</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">NRiga</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">ItemCode</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Dscription</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">QPick</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">QMag</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Acq/Prod</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Volume</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">PNetto</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">PLordo</th>';
	//echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Bancale</th>';
	//echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Chiuso</th>';
	/*$queryNomeCampi="SELECT * T_Picking_01";
	$resultNomeCampi=sqlsrv_query($conn,$queryNomeCampi);
	if($resultNomeCampi==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$queryNomeCampi."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($rowNomeCampi=sqlsrv_fetch_array($resultNomeCampi))
		{
			$nomeColonna = ucfirst($rowNomeCampi['COLUMN_NAME']);
			if($nomeColonna=="Chiuso" || $nomeColonna=="Bancale" || $nomeColonna=="N_Pick" || $nomeColonna=="DocNum" || $nomeColonna=="LineNum" || $nomeColonna=="ItemCode" || $nomeColonna=="Dscription" || $nomeColonna=="Quantity" || $nomeColonna=="OnHand" || $nomeColonna=="PrcrmntMtd" || $nomeColonna=="DescrPick" )
				echo '<th style="color:#666f77;font-family:arial;font-size:90%;font-weight:bold;">'.$nomeColonna. '</th>';
		}
	}*/
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function riempiTabella($conn,$N_Pick)
{
	$queryRighe="SELECT T_Picking_01.*,bancali.nome AS Nbancale FROM T_Picking_01,bancali WHERE T_Picking_01.bancale=bancali.id_bancale AND T_Picking_01.N_Pick=$N_Pick
				 UNION
				 SELECT T_Picking_01.*,'' AS Nbancale FROM T_Picking_01 WHERE T_Picking_01.N_Pick=$N_Pick AND T_Picking_01.bancale IS NULL ORDER BY chiuso,gruppo ";
	$resultRighe=sqlsrv_query($conn,$queryRighe);
	if($resultRighe==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$queryRighe."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($rowRighe=sqlsrv_fetch_array($resultRighe))
		{
			if($rowRighe['chiuso']==NULL)
			{
				if($rowRighe['gruppo']==NULL || $rowRighe['Nbancale']==NULL)
					echo '<tr style="font-weight:bold;font-size: 90%;" class="'.$rowRighe['docNum']."00".$rowRighe['lineNum'].'" id="'.$rowRighe['docNum']."00".$rowRighe['lineNum'].'">';
				else
					echo '<tr style="font-size: 80%;" class="'.$rowRighe['docNum']."00".$rowRighe['lineNum'].'" id="'.$rowRighe['docNum']."00".$rowRighe['lineNum'].'">';
			}
			else
			{
				echo '<tr style="color:gray;font-size: 70%;" class="'.$rowRighe['docNum']."00".$rowRighe['lineNum'].'" id="'.$rowRighe['docNum']."00".$rowRighe['lineNum'].'">';
			}
			?>
			<td><input type="button" id="btnSeleziona" class="btnSeleziona" value="  " onclick="seleziona('<?php echo $rowRighe['docNum']."00".$rowRighe['lineNum']; ?>')" />&nbsp<input type="button" id="btnCancella" class="btnCancella" value="  " onclick="cancella('<?php echo $rowRighe['id_picking']; ?>')" /></td>
			<?php
			echo '<td>'.$rowRighe['chiuso'].'</td>';
			echo '<td id="cambiaBancaleTD'.$rowRighe['id_picking'].'">';
			//echo $rowRighe['Nbancale'];
			if($rowRighe['Nbancale']!="")
			{
				echo "<select class='cambiaBancale' id='cambiaBancale".$rowRighe['id_picking']."' onchange='cambiaBancale(".$rowRighe['id_picking'].")' >";
				echo "<option value='".$rowRighe['bancale']."' >".$rowRighe['Nbancale']."</option>";
				$query="SELECT * FROM bancali WHERE bancali.n_Pick = ".$rowRighe['n_Pick']." AND bancali.nome<>'".$rowRighe['Nbancale']."'";
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
						echo "<option value='".$row['id_bancale']."'>".$row['nome']."</option>";
					}
				}
				echo "</select>";
			}
			echo '</td>';
			echo '<td>'.$rowRighe['gruppo'].'</td>';
			echo '<td>'.$rowRighe['descrPick'].'</td>';
			echo '<td>'.$rowRighe['n_Pick'].'</td>';
			echo '<td>'.$rowRighe['docNum'].'</td>';
			echo '<td>'.$rowRighe['lineNum'].'</td>';
			echo '<td>'.$rowRighe['itemCode'].'</td>';
			echo '<td>'.$rowRighe['dscription'].'</td>';
			echo '<td>'.$rowRighe['quantity'].'</td>';
			echo '<td>'.$rowRighe['onHand'].'</td>';
			echo '<td>'.$rowRighe['prcrmntMtd'].'</td>';
			echo '<td>'.$rowRighe['volume'].'</td>';
			echo '<td>'.$rowRighe['pesoNetto'].'</td>';
			echo '<td>'.$rowRighe['pesoLordo'].'</td>';
			echo '</tr>';
			//echo '<td>'.$rowRighe['U_RelQty'].'</td>';
			//echo '<td></td>';
			//echo '<td></td>';
			//echo '<td>'.$rowRighe['DocEntryORDR'].'</td>';
			//echo '<td>'.$rowRighe['DocEntry'].'</td>';
			/*if($rowRighe['DataPick']!=NULL)
				echo '<td>'.$rowRighe['DataPick']->format('d/m/Y').'</td>';
			else
				echo '<td>'.$rowRighe['DataPick'].'</td>';
			if($rowRighe['DataConsegna']!=NULL)
				echo '<td>'.$rowRighe['DataConsegna']->format('d/m/Y').'</td>';
			else
				echo '<td>'.$rowRighe['DataConsegna'].'</td>';*/
			//echo '<td>'.$rowRighe['U_PickQty'].'</td>';
			//echo '<td>'.$rowRighe['OpenQty'].'</td>';
			/*if($rowRighe['DocDueDate']!=NULL)
				echo '<td>'.$rowRighe['DocDueDate']->format('d/m/Y').'</td>';
			else
				echo '<td>'.$rowRighe['DocDueDate'].'</td>';
			if($rowRighe['ShipDate']!=NULL)
				echo '<td>'.$rowRighe['ShipDate']->format('d/m/Y').'</td>';
			else
				echo '<td>'.$rowRighe['ShipDate'].'</td>';*/
			//echo '<td>'.$rowRighe['GestArticolo'].'</td>';
			//echo '<td>'.$rowRighe['Status'].'</td>';
			//echo '<td>'.$rowRighe['StatoOrdine'].'</td>';
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function controllaCollo($N_Pick,$docLineNum,$conn)
{
	$output[0] = substr($docLineNum, 0, 8);
	$output[1] = substr($docLineNum, 8);
	$q="SELECT * FROM colliDisponibili WHERE docNum = ".$output[0]." AND lineNum = ".$output[1];
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$rows = sqlsrv_has_rows( $r );
		if ($rows === true)
		{
			//cancella da colliDisponibili
			$q2="DELETE  colliDisponibili FROM colliDisponibili WHERE docNum = ".$output[0]." AND lineNum = ".$output[1];
			$r2=sqlsrv_query($conn,$q2);
			if($r2==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$q2."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
			else
			{
				$q3="UPDATE  T_Picking_01 SET sparato='V' WHERE N_Pick=$N_Pick AND docNum = ".$output[0]." AND lineNum = ".$output[1]." AND sparato IS NULL";
				$r3=sqlsrv_query($conn,$q3);
				if($r3==FALSE)
				{
					echo "<br><br>Errore esecuzione query<br>Query: ".$q3."<br>Errore: ";
					die(print_r(sqlsrv_errors(),TRUE));
				}
				
				$colora=array();
				$colora=vArrayColliSparati($conn,$N_Pick);
				$lenght=count($colora);
				$j=0;
				while($j<$lenght)
				{
					//echo "j: $j"." c: ".$colora[$j];
					echo "<script>cambiaSfondo('".$colora[$j]."');</script>";
					$j++;
				}
				return TRUE;
			}
		}
		else 
			return FALSE;
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function controllaBancale($N_Pick,$bancale,$conn)
{
	/*$nome = substr($bancale, 0, 7);
	if($nome=="BANCALE")
		$tipo="BANCALE";
	else
	{
		if($nome=="SCATOLA")
			$tipo="SCATOLA";
		else
			$tipo="CASSA";
	}
	$numero=substr($bancale, -1);
		
	$bancale=$tipo.$N_Pick.".".$numero;*/
	
	$q="SELECT * FROM bancali WHERE nome='$bancale' AND n_Pick=$N_Pick";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$rows = sqlsrv_has_rows( $r );
		if ($rows === true)
			return TRUE;
		else 
			return FALSE;
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function nuovoBancale($N_Pick,$conn)
{
	$q="SELECT bancali.* FROM bancali WHERE n_Pick=$N_Pick";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$rows = sqlsrv_has_rows( $r );
		if ($rows === true)
		{
			//echo "Ci sono gia  bancali per $N_Pick<br>";
			$qMax="SELECT MAX(numero) AS max FROM bancali WHERE n_Pick=$N_Pick";
			$rMax=sqlsrv_query($conn,$qMax);
			if($rMax==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$qMax."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
			else
			{
				while($rowMax=sqlsrv_fetch_array($rMax))
				{
					$numero=$rowMax['max']+1;
					$bancale='BANCALE'.$N_Pick.'.'.$numero;
					$qInsert="INSERT INTO bancali (nome,n_Pick,numero) VALUES ('$bancale',$N_Pick,$numero)";
				}
			}
		}
		else 
		{
			//echo "NON ci sono gia  bancali per $N_Pick<br>";
			$numero=0;
			$bancale='BANCALE'.$N_Pick.'.'.$numero;
			$qInsert="INSERT INTO bancali (nome,n_Pick,numero) VALUES ('$bancale',$N_Pick,$numero)";
		}
	}
	$rInsert=sqlsrv_query($conn,$qInsert);
	if($rInsert==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$qInsert."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
		return $bancale;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function stampa($conn)
{
	echo "<form name='bancaleF' method='POST' action='stampaBancale.php'>";
	echo "<input type='hidden' name='nuovoBancale' value='".$_SESSION['NuovoBancale']."'>";
	echo "</form>";
	annulla($conn);
	?>
	<script>invia();</script>
	<?php
	//echo "<script>window.open('stampaBancale.php', '_blank');</script>";
	
	return TRUE;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function inserisciN_Pick($conn,$N_Pick)
{
	$q="SELECT * FROM T_Picking_01 WHERE n_Pick=$N_Pick";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$rows = sqlsrv_has_rows( $r );
		if ($rows === FALSE)
		{
			$qInsert="INSERT INTO T_Picking_01 (descrPick,n_Pick,docNum,lineNum,itemCode,dscription,quantity,onHand,prcrmntMtd,volume,pesoLordo,pesoNetto,descriptionLang,codiceDoganale,DocEntry,DataConsegna,DataPick,Misure,descrizione_codice_doganale,cliente,controllato,barcode,k1Parcel,k1ParcelProgr,stampato,dataImportazionePick,[PicklistNum],[PicklistLine],[OrderEntry],[K1OrderType],[OrderNum],[U_SIGEA_K1BaseLine]) SELECT DescrPick,N_Pick,DocNum,N_Riga,ItemCode,Dscription,'1',ISNULL (QtaMagazzino,0),ISNULL ([Acq/Prod],' '),ISNULL (Volume,0),ISNULL([PESO-LORDO],0),ISNULL([PESO-NETTO],0),ISNULL(U_SIGEA_CustLangDesc,Dscription),codiceDoganale,DocEntry,DataConsegna,DataPick,Misure,descrizione_codice_doganale,CardName,'false',barcode,k1Parcel,k1ParcelProgr,'false','".date('m/d/Y h:i:s', time())."',[PicklistNum],[PicklistLine],[OrderEntry],[K1OrderType],[OrderNum],[U_SIGEA_K1BaseLine] FROM Q_Picking_04 WHERE N_Pick=$N_Pick";
			$rInsert=sqlsrv_query($conn,$qInsert);
			if($rInsert==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$qInsert."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
		}
		else
		{
			$qRigheT="SELECT COUNT (*) AS righeT FROM T_Picking_01 WHERE N_Pick=$N_Pick";
			$rRigheT=sqlsrv_query($conn,$qRigheT);
			if($rRigheT==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$qRigheT."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
			else
			{
				while($rowRigheT=sqlsrv_fetch_array($rRigheT))
				{
					$righeT=$rowRigheT['righeT'];
				}
			}
			$qRigheQ="SELECT COUNT (*) AS righeQ FROM Q_Picking_04 WHERE N_Pick=$N_Pick";
			$rRigheQ=sqlsrv_query($conn,$qRigheQ);
			if($rRigheQ==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$qRigheQ."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
			else
			{
				while($rowRigheQ=sqlsrv_fetch_array($rRigheQ))
				{
					$righeQ=$rowRigheQ['righeQ'];
				}
			}
			if($righeQ!=$righeT)
			{
				$qInsert2="INSERT INTO T_Picking_01 (descrPick,n_Pick,docNum,lineNum,itemCode,dscription,quantity,onHand,prcrmntMtd,volume,pesoLordo,pesoNetto,descriptionLang,codiceDoganale,DocEntry,DataConsegna,DataPick,Misure,descrizione_codice_doganale,cliente,controllato,barcode,k1Parcel,k1ParcelProgr,stampato) SELECT        dbo.Q_Picking_04.DescrPick, dbo.Q_Picking_04.N_Pick, dbo.Q_Picking_04.DocNum, dbo.Q_Picking_04.N_Riga, dbo.Q_Picking_04.ItemCode, 
                         dbo.Q_Picking_04.Dscription, '1' AS Expr1, ISNULL(dbo.Q_Picking_04.QtaMagazzino, 0) AS Expr2, ISNULL(dbo.Q_Picking_04.[Acq/Prod], ' ') AS Expr3, 
                         ISNULL(dbo.Q_Picking_04.VOLUME, 0) AS Expr4, ISNULL(dbo.Q_Picking_04.[PESO-LORDO], 0) AS Expr5, ISNULL(dbo.Q_Picking_04.[PESO-NETTO], 0) 
                         AS Expr6, ISNULL(dbo.Q_Picking_04.U_SIGEA_CustLangDesc, dbo.Q_Picking_04.Dscription) AS Expr7, dbo.Q_Picking_04.codiceDoganale, 
                         dbo.Q_Picking_04.DocEntry, dbo.Q_Picking_04.DataConsegna, dbo.Q_Picking_04.DataPick, dbo.Q_Picking_04.Misure, 
                         dbo.Q_Picking_04.descrizione_codice_doganale, dbo.Q_Picking_04.CardName, 'false' AS Expr8 ,dbo.Q_Picking_04.barcode,dbo.Q_Picking_04.k1Parcel,dbo.Q_Picking_04.k1ParcelProgr,'false' AS stampato
							FROM            dbo.Q_Picking_04 LEFT OUTER JOIN
													 dbo.colli_eliminati ON dbo.Q_Picking_04.DocNum = dbo.colli_eliminati.docNum AND dbo.Q_Picking_04.N_Riga = dbo.colli_eliminati.lineNum AND 
													 dbo.Q_Picking_04.N_Pick = dbo.colli_eliminati.n_Pick LEFT OUTER JOIN
													 dbo.T_Picking_01 ON dbo.Q_Picking_04.N_Pick = dbo.T_Picking_01.n_Pick AND dbo.Q_Picking_04.DocNum = dbo.T_Picking_01.docNum AND 
													 dbo.Q_Picking_04.N_Riga = dbo.T_Picking_01.lineNum
							WHERE        (dbo.Q_Picking_04.N_Pick = $N_Pick) AND (dbo.T_Picking_01.id_picking IS NULL) AND (dbo.colli_eliminati.id_colli_eliminati IS NULL)";
				$rInsert2=sqlsrv_query($conn,$qInsert2);
				if($rInsert2==FALSE)
				{
					echo "<br><br>Errore esecuzione query<br>Query: ".$qInsert2."<br>Errore: ";
					die(print_r(sqlsrv_errors(),TRUE));
				}
			}
		}
		ColliDisponibili($conn,$N_Pick);
	}	
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function ColliDisponibili($conn,$N_Pick)
{
$qSvuotaColliDisponibili="DELETE colliDisponibili FROM colliDisponibili";
$rSvuotaColliDisponibili=sqlsrv_query($conn,$qSvuotaColliDisponibili);
if($rSvuotaColliDisponibili==FALSE)
{
	echo "<br><br>Errore esecuzione query<br>Query: ".$qSvuotaColliDisponibili."<br>Errore: ";
	die(print_r(sqlsrv_errors(),TRUE));
}
else
{
	$qColliDisponibili="INSERT INTO colliDisponibili (docNum,lineNum) SELECT docNum,lineNum FROM T_Picking_01 WHERE n_Pick=$N_Pick AND chiuso IS NULL AND bancale IS NULL AND gruppo IS NULL";
	$rColliDisponibili=sqlsrv_query($conn,$qColliDisponibili);
	if($rColliDisponibili==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$qColliDisponibili."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function assegnaBancale($conn,$N_Pick,$bancale)
{
	$qId_bancale="SELECT id_bancale FROM bancali WHERE nome='$bancale'";
	$rId_bancale=sqlsrv_query($conn,$qId_bancale);
	if($rId_bancale==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$qId_bancale."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($rowId_bancale=sqlsrv_fetch_array($rId_bancale))
		{
			$id_bancale=$rowId_bancale['id_bancale'];
		}
	}
	$q="UPDATE T_Picking_01 SET bancale=".$id_bancale." WHERE sparato='V'";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function assegnaGruppo($conn,$N_Pick)
{
	$gruppo=0;
	$qGruppo="SELECT MAX(gruppo) AS gruppo FROM T_Picking_01 WHERE n_Pick=$N_Pick";
	$rGruppo=sqlsrv_query($conn,$qGruppo);
	if($rGruppo==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$qGruppo."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($rowGruppo=sqlsrv_fetch_array($rGruppo))
		{
			$gruppo=$rowGruppo['gruppo'];
		}
	}
	//echo "<br>G: $gruppo<br>";
	$gruppo++;
	
	//echo "<br>G: $gruppo<br>";
	$q="UPDATE T_Picking_01 SET gruppo=".$gruppo." WHERE sparato='V'";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function assegnaGruppoSingolo($conn,$N_Pick,$docNum,$i)
{
	$gruppo=0;
	$qGruppo="SELECT MAX(gruppo) AS gruppo FROM T_Picking_01 WHERE n_Pick=$N_Pick";
	$rGruppo=sqlsrv_query($conn,$qGruppo);
	if($rGruppo==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$qGruppo."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($rowGruppo=sqlsrv_fetch_array($rGruppo))
		{
			$gruppo=$rowGruppo['gruppo'];
		}
	}
	//echo "<br>G: $gruppo<br>";
	$gruppo++;
	
	//echo "<br>G: $gruppo<br>";
	$q="UPDATE TOP (1) T_Picking_01 SET gruppo=".$gruppo." WHERE sparato='V' AND docNum=$docNum AND lineNum=$i AND gruppo IS NULL";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function annullaSparato($conn)
{
	$q2="UPDATE T_Picking_01 SET sparato=NULL WHERE id_picking IS NOT NULL";
	$r2=sqlsrv_query($conn,$q2);
	if($r2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function calcolaNBancali($conn)
{
	if(isset($_SESSION['N_Pick']))
	{
		$qNBancali="SELECT COUNT(*) AS nBancali FROM bancali WHERE n_Pick=".$_SESSION['N_Pick'];
		$rNBancali=sqlsrv_query($conn,$qNBancali);
		if($rNBancali==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$qNBancali."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($rowNBancali=sqlsrv_fetch_array($rNBancali))
			{
				$nBancali=$rowNBancali['nBancali'];
			}
		}
		return $nBancali;
	}
	else
		return 0;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function annulla($conn)
{
	$N_Pick=$_SESSION['N_Pick'];
	$descrPick=$_SESSION['descrPick'];
	$_SESSION['NuovoBancale']=$_SESSION['bancale']=NULL;
	annullaSparato($conn);
	ColliDisponibili($conn,$N_Pick);
	echo "<br>";
	echo "<div style='font-family:arial;font-size:120%;color:#66B2FF;font-weight:bold;'>
			<span style='color:gray;'>N_Pick:&nbsp</span>$N_Pick&nbsp&nbsp
			<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspDestinatario:&nbsp</span>$descrPick&nbsp&nbsp
			<span style='color:gray;'><b style='color:black; font-size:170%'>|</b>&nbsp&nbspNumero pallet:&nbsp</span>".calcolaNBancali($conn)."";
	echo "</div>";
	echo "<br>";
	
	creaEriempiTabella($conn,$N_Pick);
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function nAperti($conn,$N_Pick)
{
	$q="SELECT COUNT(*) AS nAperti FROM T_Picking_01 WHERE n_Pick=$N_Pick AND gruppo IS NULL AND bancale IS NULL";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row=sqlsrv_fetch_array($r))
		{
			$nAperti=$row['nAperti'];
		}
	}
	if($nAperti==0)
	{
		$q2="UPDATE T_Picking_01 SET chiuso='V',dataChiusura='".date('m/d/Y h:i:s', time())."' WHERE n_Pick=$N_Pick";
		$r2=sqlsrv_query($conn,$q2);
		if($r2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
	}
	return $nAperti;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function contaRighe($conn,$N_Pick)
{
	$q="SELECT COUNT(*) AS qnt FROM T_Picking_01 WHERE n_Pick=$N_Pick AND gruppo = 9999";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row=sqlsrv_fetch_array($r))
		{
			RETURN $row['qnt'];
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function getTmpBancale($N_Pick,$conn)
{
	$bancale="";
	$q="SELECT bancale FROM tmpBancali";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row=sqlsrv_fetch_array($r))
		{
			$bancale= $row['bancale'];
		}
		$q2="DELETE tmpBancali FROM tmpBancali";
		$r2=sqlsrv_query($conn,$q2);
		if($r2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		return $bancale;
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function setBancaleGruppoDocNum($conn,$N_Pick,$docNum,$bancale)
{
	$q2="SELECT id_bancale FROM bancali WHERE nome = '$bancale'";
	$r2=sqlsrv_query($conn,$q2);
	if($r2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row2=sqlsrv_fetch_array($r2))
		{
			$id_bancale= $row2['id_bancale'];
		}
	
		$q="UPDATE T_Picking_01 SET bancale=$id_bancale , gruppo=9999 WHERE n_Pick=$N_Pick AND gruppo IS NULL AND bancale IS NULL AND docNum='$docNum'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$gruppoMax=getGruppoMax($conn,$N_Pick);
			$gruppo=$gruppoMax+1;
			$qnt=contaRighe($conn,$N_Pick);
			$i=0;
			while($i<$qnt)
			{
				$q3="UPDATE TOP(1) T_Picking_01 SET gruppo=$gruppo WHERE n_Pick=$N_Pick AND gruppo=9999";
				$r3=sqlsrv_query($conn,$q3);
				if($r3==FALSE)
				{
					echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q3."<br>Errore: ";
					die(print_r(sqlsrv_errors(),TRUE));
				}
				$gruppo++;
				$i++;
			}
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function getGruppoMax($conn,$N_Pick)
{
	$q2="SELECT ISNULL(MAX(gruppo),0) AS gruppoMax FROM T_Picking_01 WHERE N_Pick=$N_Pick AND gruppo<>9999";
	$r2=sqlsrv_query($conn,$q2);
	if($r2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br style='color:red'>Query: ".$q2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($row2=sqlsrv_fetch_array($r2))
		{
			return $row2['gruppoMax'];
		}
	}
}

?>




























