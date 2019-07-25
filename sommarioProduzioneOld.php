<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Sommario produzione";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
			<link rel="stylesheet" href="css/styleV30.css" />
			<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
			<script src="canvasjs.min.js"></script>
			<script src="struttura.js"></script>
			<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
			<script src="jquery.table2excel.js"></script>
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
			<script>
				function selectStazione(nomeSalvataggio)
				{
					document.getElementById('containerSommarioProduzione').innerHTML="";
					document.getElementById('chartContainer').innerHTML="";
					
					document.getElementById('selectPTOSommario').value="Stazione";
					document.getElementById('selectVERSommario').value="Stazione";
					document.getElementById('selectMONSommario').value="Stazione";
					
					document.getElementById('selectPTOSommario').style.display="none";
					document.getElementById('selectVERSommario').style.display="none";
					document.getElementById('selectMONSommario').style.display="none";
					
					var stazione=nomeSalvataggio.charAt(0);
					if(stazione=="P")
						document.getElementById('selectPTOSommario').style.display="inline-block";
					if(stazione=="V")
						document.getElementById('selectVERSommario').style.display="inline-block";
					if(stazione=="M")
						document.getElementById('selectMONSommario').style.display="inline-block";
				}
				function sommarioSettimana(nomeSalvataggio,stazione)
				{
					document.getElementById('containerSommarioProduzione').innerHTML='<div class="sk-cube-grid" style="width:24px;height:24px;margin-left:638px;margin-top:200px;text-align:center" ><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
					document.getElementById('chartContainer').innerHTML="";
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('containerSommarioProduzione').innerHTML= this.responseText;
							creaGrafico();
							getGrafico(nomeSalvataggio,stazione);
						}
					};
					xmlhttp.open("POST", "getSommarioProduzione.php?nomeSalvataggio="+nomeSalvataggio+"&stazione="+stazione, true);
					xmlhttp.send();
				}
				
				var myvar, chart;
				var dataPoints1 = [];
				var dataPoints2 = [];
				var dataPoints3 = [];
				
				function creaGrafico()
				{
					myvar="";
					chart="";
					dataPoints1 = [];
					dataPoints2 = [];
					dataPoints3 = [];
					
					chart = new CanvasJS.Chart("chartContainer", {
						animationEnabled: true,
						theme: "light2",
						title:
						{
							text: ""
						},
						legend:
						{
							cursor: "pointer",
							verticalAlign: "center",
							horizontalAlign: "right",
							itemclick: toggleDataSeries
						},
						data: 
						[	
							{
								type: "column",
								name: "Ordini aggiunti",
								indexLabel: "{y}",
								yValueFormatString: "#0.##",
								showInLegend: true,
								dataPoints: dataPoints2
							},
							{
								type: "column",
								name: "Ordini prodotti",
								indexLabel: "{y}",
								yValueFormatString: "#0.##",
								showInLegend: true,
								dataPoints: dataPoints1
							},
							{
								type: "column",
								name: "Ordini non prodotti",
								indexLabel: "{y}",
								yValueFormatString: "#0.##",
								showInLegend: true,
								dataPoints: dataPoints3
							}
						]
					});
					//chart.render();
					
					document.getElementById("btnScaricaGrafico").addEventListener("click",function()
					{
						chart.exportChart({format: "jpg"});
					});

					function toggleDataSeries(e)
					{
						if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) 
						{
							e.dataSeries.visible = false;
						}
						else
						{
							e.dataSeries.visible = true;
						}
						//chart.render();
					}
				}
				function getGrafico(nomeSalvataggio,stazione) 
				{
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							//console.log(this.responseText);
							var res1=this.responseText.split("%");
							var res=res1[0].split("|");
							var settimana=res[0];
							var ordini=res[1];
							dataPoints1.push({
									label: settimana,
									y: parseInt(ordini)
								});
							
							var res=res1[1].split("|");
							var settimana=res[0];
							var ordini=res[1];
							dataPoints2.push({
									label: settimana,
									y: parseInt(ordini)
								});
							
							var res=res1[2].split("|");
							var settimana=res[0];
							var ordini=res[1];
							dataPoints3.push({
									label: settimana,
									y: parseInt(ordini)
								});
							
							chart.render();
						}
					};
					xmlhttp.open("POST", "getGraficoSommario.php?nomeSalvataggio="+nomeSalvataggio+"&stazione="+stazione, true);
					xmlhttp.send();
				}
				function stampaSommario()
				{
					document.getElementById('header').style.display="none";
					document.getElementById('comandiTabelle').style.display="none";
					document.getElementById('footer').style.display="none";
					document.body.style.background="white";
					window.print();
					document.getElementById('header').style.display="";
					document.getElementById('comandiTabelle').style.display="";
					document.getElementById('footer').style.display="";
					document.body.style.background="";
				}
				function scaricaExcel(table)
				{
					$("#"+table).table2excel({
					// exclude CSS class
					exclude: ".noExl",
					name: "Sommario produzione",
					filename: "Sommario_produzione" //do not include extension
					});
				}
			</script>
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div id="container">
			<div id="content">
				<div id="comandiTabelle" style="height:50px;margin-top:40px;width:1294px;">
					<select id="selectReg" class="btnBlu" onchange="selectStazione(this.value)">
						<option value="Salvataggio"disabled selected>Salvataggio</option>
						<?php
							$query="SELECT DISTINCT nomeSalvataggio,dataSalvataggio FROM stato_punto_punto";
							$result=sqlsrv_query($conn,$query);
							if($result==FALSE)
							{
								echo "Errore esecuzione query<br>Query: ".$query."<br>Errore: ";
								die(print_r(sqlsrv_errors(),TRUE));
							}
							else
							{
								//echo '<option value="Punto punto" disabled selected>Punto punto</option>';
								while($row=sqlsrv_fetch_array($result))
								{
								echo '<option value="P|'.$row["nomeSalvataggio"].'">[PUNTO PUNTO]&nbsp-->   '.$row["nomeSalvataggio"].' | '.$row["dataSalvataggio"]->format("d/m/Y H:m:s").'</option>';
								}
							}
							$query2="SELECT DISTINCT nomeSalvataggio,dataSalvataggio FROM stato_verniciatura";
							$result2=sqlsrv_query($conn,$query2);
							if($result2==FALSE)
							{
								echo "Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
								die(print_r(sqlsrv_errors(),TRUE));
							}
							else
							{
								//echo '<option value="Verniciatura" disabled selected>Verniciatura</option>';
								while($row2=sqlsrv_fetch_array($result2))
								{
									echo '<option value="V|'.$row2["nomeSalvataggio"].'">[VERNICIATURA]&nbsp-->   '.$row2["nomeSalvataggio"].' | '.$row2["dataSalvataggio"]->format("d/m/Y H:m:s").'</option>';
								}
							}
							$query3="SELECT DISTINCT nomeSalvataggio,dataSalvataggio FROM stato_montaggio";
							$result3=sqlsrv_query($conn,$query3);
							if($result3==FALSE)
							{
								echo "Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
								die(print_r(sqlsrv_errors(),TRUE));
							}
							else
							{
								//echo '<option value="Verniciatura" disabled selected>Verniciatura</option>';
								while($row3=sqlsrv_fetch_array($result3))
								{
									echo '<option value="M|'.$row3["nomeSalvataggio"].'">[MONTAGGIO]&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp-->   '.$row3["nomeSalvataggio"].' | '.$row3["dataSalvataggio"]->format("d/m/Y H:m:s").'</option>';
								}
							}
						?>
					</select>
					<select id="selectPTOSommario" class="selectStazioneSommario btnBlu" onchange="sommarioSettimana(document.getElementById('selectReg').value,this.value)">
						<option value="Stazione"disabled selected>Stazione</option>
						<option value="PTO_PTO">PTO_PTO</option>
					</select>
					<select id="selectVERSommario" class="selectStazioneSommario btnBlu" onchange="sommarioSettimana(document.getElementById('selectReg').value,this.value)">
						<option value="Stazione"disabled selected>Stazione</option>
						<option value="CAB_ACR">CAB_ACR</option>
						<option value="CAB_LAC">CAB_LAC</option>
					</select>
					<select id="selectMONSommario" class="selectStazioneSommario btnBlu" onchange="sommarioSettimana(document.getElementById('selectReg').value,this.value)">
						<option value="Stazione"disabled selected>Stazione</option>
						<option value="MNT_ACA">MNT_ACA</option>
						<option value="MNT_HOME">MNT_HOME</option>
						<option value="MNT_LUT">MNT_LUT</option>
						<option value="MNT_MAST">MNT_MAST</option>
					</select>
					<input type="button" id="btnScaricaGrafico" class="btnBlu" value="Scarica grafico" />
					<input type="button" id="btnScaricaExcel" class="btnBlu" value="Scarica Excel" onclick="scaricaExcel('myTableSommarioProduzione')" />
				</div>
				<div id="containerSommarioProduzione"></div>
				<div id='chartContainer'></div>
			</div>
		</div>
		<div id="push"></div>
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
