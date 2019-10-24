<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Gestione carichi di lavoro";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="css/styleV35.css" />
		<link rel="stylesheet" href="css/styleGestioneV7.css" />
		<script src="https://printjs-4de6.kxcdn.com/print.min.js"></script>
		<script src="struttura.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
		<script src="jquery.table2excel.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="tableToExcel.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<script src="js/gestioneCarichiDiLavoro.js"></script>
		<script src="jscolor.js"></script>
		<style>
			.loader {
				display:inline-block;
				float:center;
			  border:7px solid #f3f3f3;
			  border-radius: 50%;
			  border-top: 7px solid #3498db;
			  width: 20px;
			  height: 20px;
			  -webkit-animation: spin 2s linear infinite; /* Safari */
			  animation: spin 2s linear infinite;
			}
			/*.elementOrdine * {pointer-events: none;}*/
			/* Safari */
			@-webkit-keyframes spin {
			  0% { -webkit-transform: rotate(0deg); }
			  100% { -webkit-transform: rotate(360deg); }
			}

			@keyframes spin {
			  0% { transform: rotate(0deg); }
			  100% { transform: rotate(360deg); }
			}
			/*.swal-text 
			{
				animation: fa-spin 2s infinite linear;
				color: #79A5D1;
			}
			.swal-title 
			{
				font-family:'Montserrat',sans-serif;
				font-size:14px;
			}*/
			.swal2-title
			{
				font-family:'Montserrat',sans-serif;
				font-size:18px;
			}
			.swal2-content
			{
				font-family:'Montserrat',sans-serif;
				font-size:13px;
			}
			.swal2-confirm,.swal2-cancel
			{
				font-family:'Montserrat',sans-serif;
				font-size:13px;
			}
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
	<body onload="document.getElementById('btnConfermaSettimane').disabled=false;document.getElementById('btnNonAggiornare').disabled=false;" >
		<input type="hidden" id="server_adress" value="<?php echo $_SERVER['SERVER_ADDR']; ?>" />
		<form target="_blank" id="scaricaPdfSettimanaForm" method="post" action="scaricaPdfSettimana.php" style="display:none;">
			<input type="hidden" name="scaricaPdfSettimanaFormStazione" id="scaricaPdfSettimanaFormStazione" value="" />
			<input type="hidden" name="scaricaPdfSettimanaFormSettimana" id="scaricaPdfSettimanaFormSettimana" value="" />
		</form>
		<form target="_blank" id="formStampaOrdine" method="post" action="stampaOrdine.php" style="display:none;">
			<input type="hidden" name="docnumStampa" id="docnumStampa" value="" />
			<input type="hidden" name="stazioneStampa" id="stazioneStampa" value="" />
		</form>
		<form target="_blank" id="formStampaMultiOrdine" method="post" action="stampaMultiOrdine.php" style="display:none;">
			<input type="hidden" name="settimanaStampaMulti" id="settimanaStampaMulti" value="" />
			<input type="hidden" name="stazioneStampaMulti" id="stazioneStampaMulti" value="" />
		</form>
		<form target="_blank" id="formStampaMultiOrdinePDF" method="post" action="stampaMultiOrdinePDF.php" style="display:none;">
			<input type="hidden" name="settimanaStampaMultiPDF" id="settimanaStampaMultiPDF" value="" />
			<input type="hidden" name="stazioneStampaMultiPDF" id="stazioneStampaMultiPDF" value="" />
		</form>
		<div id="containerProgressBar">
			<div id="middle">
				<div id="messaggi"></div>
				<div id="inner">
					<div id="containerRangeBar">
						<span style="display:inline-block;float:left;margin-right:20px">Importa dati da SAP</span>
						<input type="button" id="btnConfermaSettimane" class="btnBlu" value="Conferma" onclick="riempiTabelle();" disabled>
						<input type="button" id="btnNonAggiornare" value="Non aggiornare le tabelle" onclick="nonAggiornare();" disabled>
					</div>
				</div>
			</div>
		</div>
		<div id="popupCapacitaProduttiva" onclick="document.getElementById('popupCapacitaProduttiva').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmouseup="document.getElementById('popupCapacitaProduttiva').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmousedown="document.getElementById('popupCapacitaProduttiva').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	">
			<div id="popupCapacitaProduttivaheader">
				<div style="color:white;box-sizing:border-box;height:60px;padding-left:40px;padding-top:20px;width:400px;float:left;display:inline-block;font-weight:bold">Modifica capacita produttiva</div>
				<input type="button" id="btnChiudiPopupCapacitaProduttiva" onclick="chiudiPopupCapacitaProduttiva()" value="" />
			</div>
			<div id="tabellaPopupCapacitaProduttiva"></div>
			<div id="containerInputPopupCapacitaProduttiva">
				<input type="button" id="btnConfermaPopupCapacitaProduttiva" class="btnBlu" value="Conferma" onclick="confermaCapacitaProduttiva()" />
				<div id="statoCapacitaProduttiva"></div>
				<input type="button" id="btnAnnullaPopupCapacitaProduttiva" class="btnBlu" value="Annulla" onclick="chiudiPopupCapacitaProduttiva()" />
			</div>
		</div>
		<div id="popupColori" onclick="document.getElementById('popupColori').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmouseup="document.getElementById('popupColori').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmousedown="document.getElementById('popupColori').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	">
			<div id="popupColoriheader">
				<div style="color:white;box-sizing:border-box;height:60px;padding-left:40px;padding-top:20px;width:300px;float:left;display:inline-block;font-weight:bold">Associa i colori alle collezioni</div>
				<input type="button" id="btnChiudiPopupColori" onclick="chiudiPopupColori()" value="" />
			</div>
			<div id="popupColoriContainer">
			<?php
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
							echo '<td style="padding:0px;width:80px;max-width:80px;overflow:hidden;"><input class="jscolor" id="colonnaColore'.$row2["id_colore_collezione"].'" value="'.$row2["colore"].'" ></td>';
							echo '<td><input type="button" id="btnModificaColoriCollezioni" class="btnBlu" onclick="modificaColoriCollezioni('.$row2["id_colore_collezione"].')" value="Modifica" /></td>';
							echo '<td style="width:25px;" id="risultato'.$row2["id_colore_collezione"].'"></td>';
						echo "</tr>";
					}
					echo "</table>";
				}
			?>
			</div>
		</div>
		<div id="popupDettaglioOrdine" onclick="document.getElementById('popupDettaglioOrdine').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmouseup="document.getElementById('popupDettaglioOrdine').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmousedown="document.getElementById('popupDettaglioOrdine').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	">
			<div id="popupDettaglioOrdineheader">
				<div id="titoloPopupDettaglioOrdine"></div>
				<input type="button" id="btnChiudiPopupDettaglioOrdine" onclick="chiudiPopupDettaglioOrdine()" value="" />
			</div>
			<div id="popupDettaglioOrdineContainer"></div>
			<div id="popupDettaglioOrdineInput">
				<a id="btnPdfPopupDettaglioOrdine" class="btnBlu" target="_blank" >PDF ordine</a>
				<input type="button" id="btnStampaPopupDettaglioOrdine" class="btnBlu" onclick="stampaPopupDettaglio()" value="Stampa ordine" />
			</div>
		</div>
		<?php include('struttura.php'); ?>
		<script>
			document.getElementById("btnLogout").addEventListener("click", function()
			{
				endSessionGestione();					
			});
		</script>
		<div id="container">
			<div id="content">
				<!--<div id="immagineLogo" class="immagineLogo" ></div>-->
				<div id="scaricaExcelWeeksContainer" style="display:none"></div>
				<div id="intestazioneCarichiDiLavoro" style="margin-top:40px;">
					<input type="button" id="btnPuntoPunto" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();puntoPunto()" value="Gestione punto punto" />
					<input type="button" id="btnVerniciatura" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();verniciatura()" value="Gestione verniciatura" />
					<input type="button" id="btnMontaggio" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();montaggio()" value="Gestione montaggio" />
				</div>
				<div id="comandiTabelle">
					<select id="selectVER" class="btnBlu" onchange="resetStyle();verniciatura()">
						<option value="CAB_ACR">CAB_ACR</option>
						<option value="CAB_LAC">CAB_LAC</option>
					</select>
					<select id="selectMON" class="btnBlu" onchange="resetStyle();montaggio()">
						<option value="MNT_ACA">MNT_ACA</option>
						<option value="MNT_HOME">MNT_HOME</option>
						<option value="MNT_LUT">MNT_LUT</option>
						<option value="MNT_MAST">MNT_MAST</option>
					</select>
					<!--<button onclick="autoSalvaStato()">test</button>-->
					<input type="button" id="btnColori" class="btnBlu" onclick="apriPopupColori()" value="Colori collezioni" />
					<input type="button" id="btnSalvaStato" class="btnBlu" onclick="autoSalvaStato()" value="Salva stato" />
					<select id="selectWEEK" class="btnBlu" onchange="stampaSettimana(this.value)" >
						<option value="Stampa sett." >Stampa sett.</option>
						<?php
							$nSettimane=5;
							$arrayN=array();
							$time=array();
							$time2 = getWeek($conn,date('Y-m-d', time()));
							$n2 = getN($conn,$time2);
							$n1=getNAfter($conn,$n2);
							$time1=getWeekByN($conn,$n1);
							
							array_push($time,$time1);
							array_push($time,$time2);
							
							array_push($arrayN,$n1);
							array_push($arrayN,$n2);
							
							for ($x = 2; $x < $nSettimane; $x++) 
							{
								$nN=getNBefore($conn,$arrayN[$x-1]);
								array_push($arrayN,$nN);
								array_push($time,getWeekByN($conn,$nN));
							} 
							
							for ($x = 0; $x < sizeof($time); $x++) 
							{
								$t=$time[$x];
								$y = substr($t, 0, 4);
								$w = substr($t, 4, 2);
								$time[$x]=$y."_".$w;
								echo '<option value="'.$time[$x].'">'.$time[$x].'</option>';
							} 
						?>
					</select>
					<select id="selectWEEKPDF" class="btnBlu" onchange="stampaPDFSettimana(this.value)" style="display:none">
						<option value="Stampa PDF" >Stampa PDF</option>
						<?php
							$nSettimane=5;
							$arrayN=array();
							$time=array();
							$time2 = getWeek($conn,date('Y-m-d', time()));
							$n2 = getN($conn,$time2);
							$n1=getNAfter($conn,$n2);
							$time1=getWeekByN($conn,$n1);
							
							array_push($time,$time1);
							array_push($time,$time2);
							
							array_push($arrayN,$n1);
							array_push($arrayN,$n2);
							
							for ($x = 2; $x < $nSettimane; $x++) 
							{
								$nN=getNBefore($conn,$arrayN[$x-1]);
								array_push($arrayN,$nN);
								array_push($time,getWeekByN($conn,$nN));
							} 
							
							for ($x = 0; $x < sizeof($time); $x++) 
							{
								$t=$time[$x];
								$y = substr($t, 0, 4);
								$w = substr($t, 4, 2);
								$time[$x]=$y."_".$w;
								echo '<option value="'.$time[$x].'">'.$time[$x].'</option>';
							} 
						?>
					</select>
					<button id="btnExcel" class="btnBlu" onclick="scaricaExcelWeeks()" >Scarica Excel<i style="margin-left:5px" class="fas fa-file-excel"></i></button>
					<div id="containerInputCercaOrdine">
						<input type="text" list="listaOrdini" id="inputTextOrdine" class="btnBlu" placeholder="Ordine" />
						<datalist id="listaOrdini"></datalist>
						<button id="btnCercaOrdine" class="btnBlu" onclick="checkCercaOrdine(document.getElementById('inputTextOrdine').value)"><i class="far fa-search"></i></button>
					</div>
					<div id="containerOrdineFuturo"></div>
					<!--<input type="button" id="btnCapacitaProduttiva" class="btnBlu" value="Capacita prod." onclick="apriPopupCapacitaProduttiva();" />-->
				</div>
			</div>
		</div>
		<div style="position: absolute; left: 50%;top:240px;width:100%">
			<div id="containerGestioneSettimane"></div>
		</div>
		<div id="push2"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

<?php
	function getWeek($conn,$data)
	{
		$query="SELECT settimana FROM settimanaData WHERE data='$data'";
	
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				return $row['settimana'];
			}
		}
	}
	function getN($conn,$settimana)
	{
		$query="SELECT n FROM nSettimana WHERE settimana='$settimana'";
	
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				return $row['n'];
			}
		}
	}
	function getNBefore($conn,$n)
	{
		$query="SELECT MAX(n) AS n FROM nSettimana WHERE n<$n";
	
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				return $row['n'];
			}
		}
	}
	function getNAfter($conn,$n)
	{
		$query="SELECT MIN(n) AS n FROM nSettimana WHERE n>$n";
	
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				return $row['n'];
			}
		}
	}
	function getWeekByN($conn,$n)
	{
		$query="SELECT settimana FROM nSettimana WHERE n=$n";
	
		$result=sqlsrv_query($conn,$query);
		if($result==FALSE)
		{
			echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result))
			{
				return $row['settimana'];
			}
		}
	}
?>
