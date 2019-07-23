<?php
	include "Session.php";
	include "connessione.php";
	
	$docnum=$_POST['docnumStampa'];
	$stazione=$_POST['stazioneStampa'];
	
	if($stazione=="FORA")
	{
		$RESOURCETYPE="FORA";
	}
	else
	{
		$RESOURCETYPE="VERN_".substr($stazione, -3);
	}
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="css/stylePrintV2Ordine.css" />
		<link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text" rel="stylesheet">
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script>
		function printDiv() 
		{
			window.frames["print_frame"].document.body.innerHTML ='<link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text" rel="stylesheet">';
			window.frames["print_frame"].document.body.innerHTML += document.getElementById("printableTable").innerHTML; 
			window.frames["print_frame"].window.focus();
			window.frames["print_frame"].window.print();
			window.close();
        }
		</script>
</head>
	<body onload="removeCircleSpinner();printDiv() ">
	<script>newCircleSpinner("Caricamento in corso...")</script>
		<?php
			//echo $docnum;
		?>
		<div id="printableTable">
			<?php
				$query1="SELECT DISTINCT DESCRIPTION FROM stampa_ordini WHERE AUFTRAGINT=$docnum AND RESOURCETYPE='$RESOURCETYPE'";
				$result1=sqlsrv_query($conn,$query1);
				if($result1==FALSE)
				{
					echo "<br><br>Errore esecuzione query<br>Query: ".$query1."<br>Errore: ";
					die(print_r(sqlsrv_errors(),TRUE));
				}
				else
				{
					while($row1=sqlsrv_fetch_array($result1))
					{
						echo "<div style='border-bottom:1px solid gray;width:100%;height:50px;font-size:150%;font-family:sans-serif;line-height:50px;font-weight:bold;color:black;text-align:left;box-sizing:border-box;padding-left:10px;display:inline-block;float:left'>".$row1['DESCRIPTION']."</div>";
					}
				}
				echo "<div style='border-right:1px solid gray;box-sizing:border-box;width:43%;height:80px;display:inline-block;float:left;overflow:hidden'>";
					echo "<div style='width:100%;height:40px;line-height:40px;float:left;display:inline-block;color:black;font-weight:normal;font-family:sans-serif;font-size:100%;text-align:left;box-sizing:border-box;padding-left:10px;'>Commessa: $docnum</div>";
					echo "<div style='width:100%;height:40px;line-height:40px;float:left;display:inline-block;color:black;font-weight:normal;font-family:sans-serif;font-size:100%;text-align:left;box-sizing:border-box;padding-left:10px;'>Ordine di produzione: ".getODP($conn,$docnum)."</div>";
				echo "</div>";
				echo "<div style='border-right:1px solid gray;width:29%;height:80px;display:inline-block;float:left;box-sizing:border-box;padding-left:10px;line-height:80px;font-size:350%;text-align:center;overflow:hidden;font-family:".htmlspecialchars(json_encode('Libre Barcode 39 Text'))." , cursive;'>";
					echo getBarcode($conn,$docnum);
				echo "</div>";
				echo "<div style='box-sizing:border-box;width:28%;height:80px;display:inline-block;float:left;overflow:hidden'>";
					echo "<div style='width:100%;height:40px;line-height:40px;float:left;display:inline-block;color:black;font-weight:normal;font-family:sans-serif;font-size:100%;text-align:right;box-sizing:border-box;padding-right:10px;'>Data consegna: ".getDataConsegna($conn,$docnum)."</div>";
					echo "<div style='width:100%;height:40px;line-height:40px;float:left;display:inline-block;color:black;font-weight:normal;font-family:sans-serif;font-size:100%;text-align:right;box-sizing:border-box;padding-right:10px;'>Tipo operazione: ".getTO($conn,$docnum)."</div>";
				echo "</div>";
				
				$query2="SELECT DISTINCT Codice_0,Descrizione_0,Qta_0,UM_0,Lunghezza_0,Larghezza_0,Altezza_0,Peso_0 FROM stampa_ordini WHERE AUFTRAGINT=$docnum AND RESOURCETYPE='$RESOURCETYPE'";	
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
						echo "<table style='border-collapse:collapse;width:100%;border-top:1px solid gray;border-bottom:1px solid gray'>";
							echo "<tr>";
								echo "<th style='border-bottom:1px solid #ddd;width:20%;font-family:sans-serif;padding:5px;text-align:left;background:gray;font-size:80%;color:white'>Item code</th>";
								echo "<th style='border-bottom:1px solid #ddd;width:40%;font-family:sans-serif;padding:5px;text-align:left;background:gray;font-size:80%;color:white'>Descrizione</th>";
								echo "<th style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;text-align:left;background:gray;font-size:80%;color:white'>Quantita</th>";
								echo "<th style='border-bottom:1px solid #ddd;width:20%;font-family:sans-serif;padding:5px;text-align:left;background:gray;font-size:80%;color:white'>Dimensioni</th>";
								echo "<th style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;text-align:left;background:gray;font-size:80%;color:white'>Peso</th>";
								echo "<th style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;text-align:left;background:gray;font-size:80%;color:white'>Ordinato</th>";
								echo "<th style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;text-align:left;background:gray;font-size:80%;color:white'>Giacenza</th>";
							echo "</tr>";
							echo "<tr>";
								echo "<td style='border-bottom:1px solid #ddd;width:20%;font-family:sans-serif;padding:5px;font-size:80%;font-weight:bold'>".$row2['Codice_0']."</td>";
								echo "<td style='border-bottom:1px solid #ddd;width:40%;font-family:sans-serif;padding:5px;font-size:80%;font-weight:bold'>".$row2['Descrizione_0']."</td>";
								echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;font-size:80%;font-weight:bold'>".$row2['Qta_0']." ".$row2['UM_0']."</td>";
								echo "<td style='border-bottom:1px solid #ddd;width:20%;font-family:sans-serif;padding:5px;font-size:80%;font-weight:bold'>".$row2['Lunghezza_0']." X ".$row2['Larghezza_0']." X ".$row2['Altezza_0']."</td>";
								echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;font-size:80%;font-weight:bold'>".$row2['Peso_0']."</td>";
								echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;font-size:80%;font-weight:bold'></td>";
								echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;font-size:80%;font-weight:bold'></td>";
							echo "</tr>";
							$query3="SELECT DISTINCT AG_ID,CONVERT(VARCHAR(200),BEZ) AS BEZ,APLATZ_ID,DescrizioneRisorsa FROM stampa_ordini WHERE AUFTRAGINT=$docnum AND Codice_0='".$row2['Codice_0']."'  AND RESOURCETYPE='$RESOURCETYPE'";	
							$result3=sqlsrv_query($conn,$query3);
							if($result3==FALSE)
							{
								echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
								die(print_r(sqlsrv_errors(),TRUE));
							}
							else
							{
								while($row3=sqlsrv_fetch_array($result3))
								{
									echo "<tr>";
										echo "<td style='width:20%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-top:5px;font-size:70%;background:#CDCDCD'>LAVORAZIONE: ".$row3['AG_ID']."</td>";
										echo "<td style='width:20%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-top:5px;font-size:70%;background:#CDCDCD'>".$row3['BEZ']."</td>";
										echo "<td style='width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-top:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-top:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-top:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-top:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-top:5px;font-size:70%;background:#CDCDCD'></td>";
									echo "</tr>";
									echo "<tr>";
										echo "<td style='border-bottom:1px solid #ddd;width:20%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:70%;background:#CDCDCD'>RISORSA: ".$row3['DescrizioneRisorsa']." (".$row3['APLATZ_ID'].")</td>";
										echo "<td style='border-bottom:1px solid #ddd;width:20%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:70%;background:#CDCDCD'>FASE: ".getFase($conn,$docnum,$RESOURCETYPE,$row3['AG_ID'],$row2['Codice_0'])."</td>";
										echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:70%;background:#CDCDCD'></td>";
										echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:70%;background:#CDCDCD'></td>";
									echo "</tr>";
									$query4="SELECT * FROM stampa_ordini WHERE AUFTRAGINT=$docnum AND RESOURCETYPE='$RESOURCETYPE' AND  AG_ID='".$row3['AG_ID']."' AND Codice_0='".$row2['Codice_0']."'";	
									$result4=sqlsrv_query($conn,$query4);
									if($result4==FALSE)
									{
										echo "<br><br>Errore esecuzione query<br>Query: ".$query4."<br>Errore: ";
										die(print_r(sqlsrv_errors(),TRUE));
									}
									else
									{
										while($row4=sqlsrv_fetch_array($result4))
										{
											echo "<tr>";
												echo "<td style='border-bottom:1px solid #ddd;width:20%;font-family:sans-serif;padding:5px;font-size:70%;font-weight:normal'>".$row4['ART1_ID']."</td>";
												echo "<td style='border-bottom:1px solid #ddd;width:40%;font-family:sans-serif;padding:5px;font-size:70%;font-weight:normal'>".$row4['ItemName']."</td>";
												echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;font-size:70%;font-weight:normal'>".$row4['qnt']." ".$row4['ME_VERBRAUCH']."</td>";
												echo "<td style='border-bottom:1px solid #ddd;width:20%;font-family:sans-serif;padding:5px;font-size:70%;font-weight:normal'>".$row4['Lunghezza_1']." X ".$row4['Larghezza_1']." X ".$row4['Altezza_1']."</td>";
												echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;font-size:70%;font-weight:normal'>".$row4['Peso_1']."</td>";
												echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;font-size:70%;font-weight:normal'>".$row4['Ordinato']."</td>";
												echo "<td style='border-bottom:1px solid #ddd;width:5%;font-family:sans-serif;padding:5px;font-size:70%;font-weight:normal'>".$row4['Giacenza']."</td>";
											echo "</tr>";
										}
									}
								}
							}
						echo "</table>";
					}
				}
			?>
		</div>
		<iframe name="print_frame" id="print_frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
		<script>
		var printFrame = document.getElementById('print_frame');
		printFrame.onload = function () 
		{
			var mediaQueryList=printFrame.contentWindow.matchMedia('print');
			mediaQueryList.addListener(function (mql) 
			{
				if (mql.matches) 
				{
					beforePrint();
				} 
				else 
				{
					afterPrint();
				}
				//console.log('print event', mql);
				//alert('print event');
			});
			
			
			var beforePrint = function() 
			{
				
			};
			var afterPrint = function() 
			{
				//window.close();
				console.log("printed");
			};

			

			printFrame.contentWindow.onbeforeprint = beforePrint;
			printFrame.contentWindow.onafterprint = afterPrint;
			
			
		}
		</script>
	</body>
</html>
<?php
	function getODP($conn,$docnum)
	{
		$query2="SELECT BELNR_ID,KNDNAME FROM stampa_ordini WHERE AUFTRAGINT=$docnum";	
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
				return $row2['BELNR_ID']." | ".$row2['KNDNAME'];
			}
		}
	}
	function getBarcode($conn,$docnum)
	{
		$query2="SELECT barrcode FROM stampa_ordini WHERE AUFTRAGINT=$docnum";	
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
				return $row2['barrcode'];
			}
		}
	}
	function getDataConsegna($conn,$docnum)
	{
		$query2="SELECT LFGDAT FROM stampa_ordini WHERE AUFTRAGINT=$docnum";	
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
				return $row2['LFGDAT']->format('d/m/Y');
			}
		}
	}
	function getTO($conn,$docnum)
	{
		$query2="SELECT TipoOperazione FROM stampa_ordini WHERE AUFTRAGINT=$docnum";	
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
				return $row2['TipoOperazione'];
			}
		}
	}
	function getFase($conn,$docnum,$RESOURCETYPE,$AG_ID,$Codice_0)
	{
		$query2="SELECT Fase FROM stampa_ordini WHERE AUFTRAGINT=$docnum AND RESOURCETYPE='$RESOURCETYPE' AND  AG_ID='$AG_ID' AND Codice_0='$Codice_0'";	//echo $query2;
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
				return $row2['Fase'];
			}
		}
	}
?>