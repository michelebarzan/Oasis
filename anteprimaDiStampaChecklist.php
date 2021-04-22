<?php
	include "Session.php";
	include "connessione.php";
	
	set_time_limit(3000);
	
	$pageName="Anteprima stampa checklist";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
			<link rel="stylesheet" href="css/styleV35.css" />
			<script src="struttura.js"></script>
			<script>
				function stampa(divName) 
				{
					var printContents = document.getElementById(divName).innerHTML;
					var originalContents = document.body.innerHTML;

					document.body.innerHTML = printContents;

					window.print();

					document.body.innerHTML = originalContents;
				}
				function stampa() 
				{
					var stampato = true ;
					var N_Pick=document.getElementById("hiddenn_Pick").value;
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							window.location = 'impaginaStampaChecklist.php';
						}
					};
					xmlhttp.open("POST", "setStampato.php?N_Pick=" + N_Pick + "&stampato=" + stampato, true);
					xmlhttp.send();
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
				function seleziona(N_Pick)
				{
					document.getElementById('selectN_Pick').value=N_Pick;
					document.stampaPallet.submit();
				}
				
				function stampato(N_Pick)
				{
					var stampato = document.getElementById("stampato"+N_Pick).checked ;
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							console.log(this.responseText);
							//location.reload();
							//document.getElementById("controllato"+N_Pick).style.backgroundColor ="green" ;
						}
					};
					xmlhttp.open("POST", "setStampato.php?N_Pick=" + N_Pick + "&stampato=" + stampato, true);
					xmlhttp.send();
					//if(controllato==false)
						//location.reload();
				}
				
				(function() 
				{
					var beforePrint = function() {
						//window.alert('Functionality to run before printing.');
						stampa() ;
					};
					var afterPrint = function() {
						/*window.alert('Functionality to run after printing');
						document.getElementById("stampaPalletB").style.display="block";*/
					};

					if (window.matchMedia) {
						var mediaQueryList = window.matchMedia('print');
						mediaQueryList.addListener(function(mql) {
							if (mql.matches) {
								beforePrint();
							} else {
								afterPrint();
							}
						});
					}

					window.onbeforeprint = beforePrint;
					window.onafterprint = afterPrint;
                }());
                function checkStampaImmediata()
                {
                    console.log(document.getElementById("hiddenInputStampa"));
                    if(document.getElementById("hiddenInputStampa")!=null)
                        document.getElementById("btnImpaginaStampa").click();
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
	<body onload="checkStampaImmediata()">
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
		<div id="container">
            <?php
            if(isset($_GET['stampaImmediata']))
                echo "<input type='hidden' value='stampa' id='hiddenInputStampa'>";
			if(isset($_GET['N_Pick']))
			{
				$N_Pick=$_GET['N_Pick'];
				echo "<input type='hidden' value='$N_Pick' id='hiddenn_Pick'>";
			}
			else
				$N_Pick=NULL;
			svuotaStampaPalletTemp($conn);
			?>
			<div id="content" style="margin-top:0px">
				<div id="immagineLogo" class="immagineLogo" style="margin-bottom:30px;margin-top:30px" ></div>
				<span id="stampaPalletB" class="stampaPalletB" ><input type="submit" onClick="window.close()" value="Chiudi"><input type="submit" onClick="stampa()" id="btnImpaginaStampa" value="Impagina stampa"></span>
				<br><br>
				<div id="tabella" class="tabella" style="overflow-x:auto">
					<?php
					if($N_Pick!=NULL)
					{
						$q3=" SELECT * FROM T_Picking_01 WHERE n_Pick=$N_Pick AND chiuso='V'";
						$r3=sqlsrv_query($conn,$q3);
						if($r3==FALSE)
						{
							echo "<br><br>Errore esecuzione query<br>Query: ".$q3."<br>Errore: ";
							die(print_r(sqlsrv_errors(),TRUE));
						}
						else
						{
							$rows = sqlsrv_has_rows( $r3 );
							if ($rows === TRUE)
							{
								//echo '<div id="immagineStampa"></div>';
								creaEriempiTabella($conn,$N_Pick);
							}
							else
								echo "<span style='font-family:arial;font-size:100%;color:gray;font-weight:bold;'>Il magazziniere non ha ancora chiuso il picking numero $N_Pick</span>";
						}
					}
					else
					{
						echo "<br><span style='font-family:arial;font-size:100%;color:gray;font-weight:bold;'>Elenco pick chiusi</span><br><br>";
						echo "<div style='width:60%;text-align:left;margin-left:20%;overflow:hidden'>";
							$queryPickChiusi="SELECT DISTINCT top(500) T_Picking_01.N_Pick,T_Picking_01.DescrPick FROM T_Picking_01,N_PickChiusi WHERE T_Picking_01.N_Pick=N_PickChiusi.N_Pick ORDER BY T_Picking_01.N_Pick DESC";
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
									//$nBancali=getNBancali($conn,$rowPickChiusi['N_Pick']);
									$checked=controllaChecked($conn,$rowPickChiusi['N_Pick']);
									$checkedStampato=controllaCheckedStampato($conn,$rowPickChiusi['N_Pick']);
									?><input type="button" data-toggle="tooltip" title="Seleziona pick <?php echo $rowPickChiusi["N_Pick"]; ?>" id="btnSeleziona" class="btnSeleziona" value=" " onclick="seleziona('<?php echo $rowPickChiusi['N_Pick']; ?>')" />&nbsp&nbsp<?php
									?><b class="pickChiusi" data-toggle="tooltip" title="Dettaglio <?php echo $rowPickChiusi["N_Pick"]; ?>" onclick="apriDettaglio('<?php echo $rowPickChiusi["N_Pick"]; ?>')" ><?php echo $rowPickChiusi["N_Pick"].'</b>&nbsp&nbsp-&nbsp&nbsp<b style="display:inline-block;font-family:arial;font-size:100%;color:gray;font-weight:normal;">'.$rowPickChiusi["DescrPick"].'</b><div style="width:22%;height:15px;display:inline-block;float:right;" ><b style="float:left;display:block;height:15px;overflow:hidden">'.$checked.'</b>';?><b style="display:inline-block;float:right"><input type="button" class="stampato" value=" " /><input type="checkbox" name="stampato" id="stampato<?php echo $rowPickChiusi["N_Pick"]; ?>" <?php echo $checkedStampato; ?> onchange="stampato('<?php echo $rowPickChiusi["N_Pick"]; ?>');" ></b></div><br><?php
									echo "<div id='dettaglio".$rowPickChiusi["N_Pick"]."' class='dettaglio' >".getDocNumList($conn,$rowPickChiusi['N_Pick'])."</div>";
									echo "<hr size='1' style='border-color:#80B3E6'>";
								}
							}
						echo "</div>";
					}
					?>
					<div id="res"></div>
				</div>
			</div>
		</div>
	</body>
</html>

<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->

<?php
function creaEriempiTabella($conn,$N_Pick)
{
	echo '<table id="myTable" style="border:2px solid #C6C6C6">';
	echo '<tr class="header" style="border-bottom:2px solid #C6C6C6">';
		creaHeader($conn);
	echo '</tr>';
		riempiTabella($conn,$N_Pick);
	echo '</table>';
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function creaHeader($conn)
{
	echo '<th style="color:#666f77;font-family:arial;font-size:90%;font-weight:bold;">Order</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:90%;font-weight:bold;">ItemCode</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:90%;font-weight:bold;">Description</th>';
	echo "<th style='color:#666f77;font-family:arial;font-size:90%;font-weight:bold;'>Quantity</th>";
	echo "<th style='color:#666f77;font-family:arial;font-size:90%;font-weight:bold;'>Net weight</th>";
	echo "<th style='color:#666f77;font-family:arial;font-size:90%;font-weight:bold;'>Gross weight</th>";
	echo "<th style='color:#666f77;font-family:arial;font-size:90%;font-weight:bold;'>Cod. Dog.</th>";
	echo "<th style='color:#666f77;font-family:arial;font-size:90%;font-weight:bold;'>Measures</th>";
	echo "<th style='color:#666f77;font-family:arial;font-size:90%;font-weight:bold;'>Group</th>";
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function riempiTabella($conn,$N_Pick)
{
	//riempiStampaPalletTemp($conn,$N_Pick,$Descr2,'X','X','X','X','X','X');
	//$queryRighe="SELECT T_Picking_01.*, bancali.* FROM T_Picking_01,bancali WHERE T_Picking_01.bancale=bancali.id_bancale AND T_Picking_01.N_Pick=$N_Pick AND T_Picking_01.Chiuso='V' ORDER BY T_Picking_01.bancale";
	/*$queryRighe="SELECT TOP (100) PERCENT dbo.T_Picking_01.id_picking, dbo.T_Picking_01.descrPick, dbo.T_Picking_01.n_Pick, dbo.T_Picking_01.docNum, dbo.T_Picking_01.lineNum, dbo.T_Picking_01.itemCode, dbo.T_Picking_01.dscription, 
				dbo.T_Picking_01.quantity, dbo.T_Picking_01.onHand, dbo.T_Picking_01.prcrmntMtd, dbo.T_Picking_01.bancale, dbo.T_Picking_01.chiuso, dbo.T_Picking_01.gruppo, dbo.T_Picking_01.sparato, dbo.T_Picking_01.volume, 
				dbo.T_Picking_01.pesoNetto, dbo.T_Picking_01.pesoLordo, dbo.T_Picking_01.codiceDoganale, dbo.T_Picking_01.descriptionLang, dbo.T_Picking_01.DocEntry, dbo.T_Picking_01.DataConsegna, dbo.T_Picking_01.DataPick, 
				dbo.T_Picking_01.Misure, dbo.T_Picking_01.descrizione_codice_doganale, dbo.T_Picking_01.controllato, dbo.T_Picking_01.cliente, dbo.T_Picking_01.barcode, dbo.T_Picking_01.k1ParcelProgr, dbo.T_Picking_01.k1Parcel, 
				dbo.T_Picking_01.stampato, dbo.T_Picking_01.dataImportazionePick, dbo.T_Picking_01.dataChiusura, dbo.T_Picking_01.PicklistNum, dbo.T_Picking_01.PicklistLine, dbo.T_Picking_01.OrderEntry, 
				dbo.T_Picking_01.K1OrderType, dbo.T_Picking_01.OrderNum, dbo.T_Picking_01.U_SIGEA_K1BaseLine, dbo.bancali.id_bancale, dbo.bancali.nome, dbo.bancali.n_Pick AS Expr1, dbo.bancali.numero, dbo.bancali.peso, 
				dbo.bancali.lunghezza, dbo.bancali.larghezza, dbo.bancali.altezza, dbo.bancali.note, dbo.elenco_colli_dati_padre.[Cod. articolo in riga ordine] AS itemCodePadre, 
				dbo.elenco_colli_dati_padre.[Desc. articolo in riga ordine] AS descrizionePadre
				FROM dbo.T_Picking_01 INNER JOIN
				dbo.bancali ON dbo.T_Picking_01.bancale = dbo.bancali.id_bancale INNER JOIN
				dbo.elenco_colli_dati_padre ON dbo.T_Picking_01.docNum = dbo.elenco_colli_dati_padre.ORDINE AND dbo.T_Picking_01.lineNum = dbo.elenco_colli_dati_padre.NUM AND 
				dbo.T_Picking_01.itemCode = dbo.elenco_colli_dati_padre.CODE
				WHERE (dbo.T_Picking_01.n_Pick = $N_Pick) AND (dbo.T_Picking_01.chiuso = 'V')
				ORDER BY dbo.T_Picking_01.bancale";*/
				$queryRighe="SELECT DISTINCT 
				TOP (100) PERCENT dbo.T_Picking_01.id_picking, dbo.T_Picking_01.descrPick, dbo.T_Picking_01.n_Pick, dbo.T_Picking_01.docNum, 
				dbo.T_Picking_01.lineNum, dbo.T_Picking_01.itemCode, dbo.T_Picking_01.dscription, dbo.T_Picking_01.quantity, dbo.T_Picking_01.onHand, 
				dbo.T_Picking_01.prcrmntMtd, dbo.T_Picking_01.bancale, dbo.T_Picking_01.chiuso, dbo.T_Picking_01.gruppo, dbo.T_Picking_01.sparato, 
				dbo.T_Picking_01.volume, dbo.T_Picking_01.pesoNetto, dbo.T_Picking_01.pesoLordo, dbo.T_Picking_01.codiceDoganale, dbo.T_Picking_01.descriptionLang,
				dbo.T_Picking_01.DocEntry, dbo.T_Picking_01.DataConsegna, dbo.T_Picking_01.DataPick, dbo.T_Picking_01.Misure, 
				dbo.T_Picking_01.descrizione_codice_doganale, dbo.T_Picking_01.controllato, dbo.T_Picking_01.cliente, dbo.T_Picking_01.barcode, 
				dbo.T_Picking_01.k1Parcel, dbo.T_Picking_01.stampato, dbo.T_Picking_01.dataImportazionePick, dbo.T_Picking_01.dataChiusura, 
				dbo.T_Picking_01.PicklistNum, dbo.T_Picking_01.PicklistLine, dbo.T_Picking_01.OrderEntry, dbo.T_Picking_01.K1OrderType, dbo.T_Picking_01.OrderNum, 
				dbo.T_Picking_01.U_SIGEA_K1BaseLine, dbo.bancali.id_bancale, dbo.bancali.nome, dbo.bancali.n_Pick AS Expr1, dbo.bancali.numero, dbo.bancali.peso, 
				dbo.bancali.lunghezza, dbo.bancali.larghezza, dbo.bancali.altezza, dbo.bancali.note, 
				dbo.elenco_colli_dati_padre.[Cod. articolo in riga ordine] AS itemCodePadre, dbo.elenco_colli_dati_padre.[Desc. articolo in riga ordine] AS descrizionePadre, 
				0 AS k1ParcelProgr
				FROM dbo.T_Picking_01 INNER JOIN
				dbo.bancali ON dbo.T_Picking_01.bancale = dbo.bancali.id_bancale INNER JOIN
				dbo.elenco_colli_dati_padre ON dbo.T_Picking_01.docNum = dbo.elenco_colli_dati_padre.ORDINE AND 
				dbo.T_Picking_01.lineNum = dbo.elenco_colli_dati_padre.NUM AND dbo.T_Picking_01.itemCode = dbo.elenco_colli_dati_padre.CODE
				WHERE (dbo.T_Picking_01.n_Pick = $N_Pick) AND (dbo.T_Picking_01.chiuso = 'V')
				ORDER BY dbo.T_Picking_01.bancale";
	$resultRighe=sqlsrv_query($conn,$queryRighe);
	if($resultRighe==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$queryRighe."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$q="SELECT TOP (1) T_Picking_01.bancale, bancali.nome,bancali.peso,bancali.lunghezza,bancali.larghezza,bancali.altezza FROM T_Picking_01,bancali WHERE bancali.id_bancale=T_Picking_01.bancale AND T_Picking_01.N_Pick=$N_Pick AND T_Picking_01.Chiuso='V' ORDER BY T_Picking_01.bancale";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($r))
			{
				$bancaleOld=$row['bancale'];
				$nomeOld=$row['nome'];
				$pesoOld=$row['peso'];
				$larghezzaOld=$row['larghezza'];
				$lunghezzaOld=$row['lunghezza'];
				$altezzaOld=$row['altezza'];
			}
		}
		$i=0;
		while($rowRighe=sqlsrv_fetch_array($resultRighe))
		{
			if($bancaleOld!=$rowRighe['bancale'])
			{
				echo '<tr style="border:2px solid gray">';
					echo '<td></td>';	
					echo '<td style="background-color:#CFD1DC;font-weight:bold;font-family:arial">'.$nomeOld.'</td>';
					echo '<td style="background-color:#F9EF62;font-weight:bold;font-family:arial">1&nbsp'.getTipo($nomeOld).':&nbspL.'.$lunghezzaOld.'&nbspX&nbsp'.$larghezzaOld.'&nbspX&nbspH.'.$altezzaOld.'&nbsp|&nbspGROSS&nbspWEIGHT:&nbsp'.$pesoOld.'&nbsp|&nbspNET&nbspWEIGHT:&nbsp'.sommaPesoNetto($conn,$bancaleOld).'</td>';
					echo '<td style="font-weight:bold;font-family:arial">TOTALE:</td>';
					echo '<td style="font-weight:bold;color:red;font-family:arial">'.sommaPesoNetto($conn,$bancaleOld).'</td>';
					echo '<td style="font-weight:bold;color:red;font-family:arial">'.sommaPesoLordo($conn,$bancaleOld).'</td>';
					echo '<td></td>';
					echo '<td></td>';
					echo '<td></td>';
				echo '</tr>';
				$descPallet='1 '.getTipo($nomeOld).': L.'.$lunghezzaOld.' X '.$larghezzaOld.' X H.'.$altezzaOld.' | GROSS WEIGHT: '.$pesoOld.' | NET WEIGHT: '.sommaPesoNetto($conn,$bancaleOld);
				riempiStampaPalletTemp($conn,NULL,$nomeOld,$descPallet,"TOT:",sommaPesoNetto($conn,$bancaleOld),sommaPesoLordo($conn,$bancaleOld),NULL,NULL,NULL,NULL,NULL,NULL);
			}
			echo '<tr>';
			echo '<td>'.$rowRighe['docNum'].'</td>';
			echo '<td>'.$rowRighe['itemCode'].'</td>';
			echo '<td>'.utf8_encode($rowRighe['descriptionLang']).'</td>';
			echo '<td>'.$rowRighe['quantity'].'</td>';
			echo '<td>'.$rowRighe['pesoNetto'].'</td>';
			echo '<td>'.$rowRighe['pesoLordo'].'</td>';
			echo '<td>'.$rowRighe['codiceDoganale'].'</td>';
			echo '<td>'.$rowRighe['Misure'].'</td>';
			echo '<td>'.$rowRighe['gruppo'].'</td>';
			echo '</tr>';
			
			$bancaleOld=$rowRighe['bancale'];
			$nomeOld=$rowRighe['nome'];
			$pesoOld=$rowRighe['peso'];
			$larghezzaOld=$rowRighe['larghezza'];
			$lunghezzaOld=$rowRighe['lunghezza'];
			$altezzaOld=$rowRighe['altezza'];
			
			riempiStampaPalletTemp($conn,$rowRighe['docNum'],$rowRighe['itemCode'],utf8_encode($rowRighe['descriptionLang']),$rowRighe['quantity'],$rowRighe['pesoNetto'],$rowRighe['pesoLordo'],$rowRighe['codiceDoganale'],$rowRighe['Misure'],$rowRighe['gruppo'],$rowRighe['cliente'],$rowRighe['itemCodePadre'],$rowRighe['descrizionePadre']);
			$i++;
		}
		echo "<input type='hidden' name='hiddenDiv' id='hiddenDiv' class='hiddenDiv' value='$i' />";
		echo '<tr style="border:2px solid gray">';
			echo '<td></td>';
			echo '<td style="background-color:#CFD1DC;font-weight:bold;font-family:arial">'.$nomeOld.'</td>';
			echo '<td style="background-color:#F9EF62;font-weight:bold;font-family:arial">1&nbsp'.getTipo($nomeOld).':&nbspL.'.$lunghezzaOld.'&nbspX&nbsp'.$larghezzaOld.'&nbspX&nbspH.'.$altezzaOld.'&nbsp|&nbspGROSS&nbspWEIGHT:&nbsp'.$pesoOld.'&nbsp|&nbspNET&nbspWEIGHT:&nbsp'.sommaPesoNetto($conn,$bancaleOld).'</td>';
			echo '<td style="font-weight:bold;font-family:arial">TOTALE:</td>';
			echo '<td style="font-weight:bold;color:red;font-family:arial">'.sommaPesoNetto($conn,$bancaleOld).'</td>';
			echo '<td style="font-weight:bold;color:red;font-family:arial">'.sommaPesoLordo($conn,$bancaleOld).'</td>';
			echo '<td></td>';
			echo '<td></td>';
			echo '<td></td>';
		echo '</tr>';
		$descPallet='1 '.getTipo($nomeOld).': L.'.$lunghezzaOld.' X '.$larghezzaOld.' X H.'.$altezzaOld.' | GROSS WEIGHT: '.$pesoOld.' | NET WEIGHT: '.sommaPesoNetto($conn,$bancaleOld);
		riempiStampaPalletTemp($conn,NULL,$nomeOld,$descPallet,"TOT:",sommaPesoNetto($conn,$bancaleOld),sommaPesoLordo($conn,$bancaleOld),NULL,NULL,NULL,NULL,NULL,NULL);
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function sommaPesoNetto($conn,$id_bancale)
{
	$query2="SELECT SUM(pesoNetto) AS sommaPesoNetto FROM T_Picking_01 WHERE bancale=$id_bancale";
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
			return $row2['sommaPesoNetto'];
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function sommaPesoLordo($conn,$id_bancale)
{
	$query2="SELECT SUM(pesoLordo) AS sommaPesoLordo FROM T_Picking_01 WHERE bancale=$id_bancale";
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
			return $row2['sommaPesoLordo'];
		}
	}
}


function svuotaStampaPalletTemp($conn)
{
	$query2="DELETE stampaPalletTemp FROM stampaPalletTemp";
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
}
function riempiStampaPalletTemp($conn,$order,$itemCode,$description,$quantity,$netWeight,$grossWeight,$codDog,$misure,$group,$cliente,$itemCodePadre,$descrizionePadre)
{
	
	$query2="INSERT INTO stampaPalletTemp ([order],itemCode,description,quantity,netWeight,grossWeight,codDog,misure,[group],cliente,itemCodePadre,descrizionePadre) VALUES ('$order','$itemCode','$description','$quantity','$netWeight','$grossWeight','$codDog','$misure','$group','$cliente','$itemCodePadre','$descrizionePadre')";
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		//die("Errore: E' presente un apice nel nome cliente. Contatta l' amministratore");
		/*echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));*/
		die("<br><br><h1 style='color:red'>Errore. Contatta l' amministratore</h1><br><br>");
	}
}
function getItemCodePadre($conn,$order,$itemCode)
{
	/*if($order<>'' && $order<>null)
	{
		$query2="SELECT DISTINCT c.ORDINE, r.CODHOST AS itemCodePadre, r.DESCR1 AS descrizionePadre, c.CODE, c.DESC1
				FROM dbo.elenco_colli_2 AS c INNER JOIN
				dbo.ORDRIGHE AS r ON r.TIPORD = c.TIPORD AND r.ORDINE = c.ORDINE AND r.NUMRIG = c.NUMRIG
				WHERE (c.TIPORD = 'H') AND (c.ORDINE = $order) AND (c.CODE = '$itemCode') and CODHOST<>CODE";
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
				return $row2['itemCodePadre'];
			}
		}
	}*/
}
function getDescrizionePadre($conn,$order,$itemCode)
{
	/*if($order<>'' && $order<>null)
	{
		$query2="SELECT DISTINCT c.ORDINE, r.CODHOST AS itemCodePadre, r.DESCR1 AS descrizionePadre, c.CODE, c.DESC1
				FROM dbo.elenco_colli_2 AS c INNER JOIN
				dbo.ORDRIGHE AS r ON r.TIPORD = c.TIPORD AND r.ORDINE = c.ORDINE AND r.NUMRIG = c.NUMRIG
				WHERE (c.TIPORD = 'H') AND (c.ORDINE = $order) AND (c.CODE = '$itemCode') and CODHOST<>CODE";
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
				return $row2['descrizionePadre'];
			}
		}
	}*/
}
function stato($conn,$N_PickS)
{
	$query2="SELECT chiuso FROM T_Picking_01 WHERE N_Pick=$N_PickS";
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$rows = sqlsrv_has_rows( $result2 );
		if ($rows === FALSE)
		{
			return "Non processato";
		}
		else
		{
			while($row2=sqlsrv_fetch_array($result2))
			{
				if($row2['chiuso']=='')
				{
					return "Aperto";
				}
			}
		}
		return "Chiuso";
	}
}
function getNBancali($conn,$N_Pick)
{
	$query2="SELECT COUNT(*) AS nBancali FROM bancali,T_Picking_01 WHERE T_Picking_01.bancale=bancali.id_bancale AND bancali.N_Pick=$N_Pick";
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		return $row2['nBancali'];
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
				return "<b style='color:red;font-family:arial'>Non&nbspcontrollato</b>";
		}
	}
	return "<b style='color:green;font-family:arial'>Controllato</b>";
}
function controllaCheckedStampato($conn,$N_Pick)
{
	$query2="SELECT stampato FROM T_Picking_01 WHERE T_Picking_01.N_Pick=$N_Pick";
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
			if($row2['stampato']=='false')
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
	return implode(" - ",$docNum);
}
function getTipo($bancale)
{
	$nome = substr($bancale, 0, 7);
	if($nome=="BANCALE")
		$tipo="PALLET";
	else
	{
		if($nome=="SCATOLA")
			$tipo="C. BOX";
		else
			$tipo="W. CRATE";
	}
	return $tipo;
}
?>
