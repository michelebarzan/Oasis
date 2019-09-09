<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Sommario produzione";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV32.css" />
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
		<script src="canvasjs.min.js"></script>
		<script src="struttura.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<script src="js_libraries/jquery.table2excel.js"></script>
		<script src="js_libraries/tableToExcel.js"></script>
		<style>
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
			var chart;
			function sommarioSettimana()
			{
				var nomeSalvataggio='autosalvataggio_'+document.getElementById('selectSalvataggioSommarioProduzione').value;
				var stazione=document.getElementById('selectStazioneSommarioProduzione').value;
				document.getElementById('containerSommarioProduzione').innerHTML="";
				document.getElementById('chartContainer').innerHTML="";
				//document.getElementById('chartContainer').innerHTML="";
				var errore=false;
				if(nomeSalvataggio=='' || nomeSalvataggio==null)
				{
					errore=true;
					Swal.fire
					({
						type: 'error',
						title: 'Errore',
						text: "Seleziona un salvataggio"
					});
				}
				if(stazione=='' || stazione==null)
				{
					errore=true;
					Swal.fire
					({
						type: 'error',
						title: 'Errore',
						text: "Seleziona una stazione"
					});
				}
				if(!errore)
				{
					newCircleSpinner("Caricamento in corso...");
					//newGridSpinner("Caricamento in corso...","containerSommarioProduzione","","","");
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							//console.log(this.responseText);
							document.getElementById('containerSommarioProduzione').innerHTML= this.responseText;
							getChart();
							removeCircleSpinner();
						}
					};
					xmlhttp.open("POST", "getSommarioProduzione.php?nomeSalvataggio="+nomeSalvataggio+"&stazione="+stazione, true);
					xmlhttp.send();
				}
			}
			function getChart()
			{
				var ordiniProdotti=[];
				var ordiniNonProdotti=[];
				var ordiniAggiunti=[];
				
				var table = document.getElementById("myTableSommarioProduzione");
				for (var i = 1, row; row = table.rows[i]; i++)
				{
					if(row.cells[9].innerText=='Prodotto')
						ordiniProdotti.push(row.cells[0].innerText);
					if(row.cells[9].innerText=='Non prodotto')
						ordiniNonProdotti.push(row.cells[0].innerText);
					if(row.cells[9].innerText=='Aggiunto')
						ordiniAggiunti.push(row.cells[0].innerText);
				}
				chart = new CanvasJS.Chart("chartContainer",
				{
					theme: "light2",
					animationEnabled: true,
					data: 
					[{
						type: "doughnut",
						indexLabel: "{label} : {y}",
						showInLegend: true,
						legendText: "{label} : {y}",
						dataPoints : 
						[ 
						   { y: ordiniProdotti.length, label: "Prodotti",color: "rgb(0, 153, 0)",  },
						   { y: ordiniNonProdotti.length,  label: "Non prodotti",color: "red",  }, 
						   { y: ordiniAggiunti.length, label: "Aggiunti",color: "#4C91CB", }
						]
					}]
				});
				chart.render();
			}
			function scaricaExcel(table)
			{
				var settimana=document.getElementById('selectSalvataggioSommarioProduzione').value;
				var stazione=document.getElementById('selectStazioneSommarioProduzione').value;
				
				/*$("#"+table).table2excel({
				// exclude CSS class
				exclude: ".noExl",
				name: "Sommario produzione_"+settimana+"_"+stazione,
				filename: "Sommario produzione_"+settimana+"_"+stazione //do not include extension
				});*/
				exportTableToExcel(table, "Sommario produzione_"+settimana+"_"+stazione);
			}
			function exportTableToExcel(tableID, filename = '')
			{
				var downloadLink;
				var dataType = 'application/vnd.ms-excel';
				var tableSelect = document.getElementById(tableID);
				var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
				
				// Specify file name
				filename = filename?filename+'.xls':'excel_data.xls';
				
				// Create download link element
				downloadLink = document.createElement("a");
				
				document.body.appendChild(downloadLink);
				
				if(navigator.msSaveOrOpenBlob){
					var blob = new Blob(['\ufeff', tableHTML], {
						type: dataType
					});
					navigator.msSaveOrOpenBlob( blob, filename);
				}else{
					// Create a link to the file
					downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
				
					// Setting the file name
					downloadLink.download = filename;
					
					//triggering the function
					downloadLink.click();
				}
			}
		</script>
	</head>
	<body onload="sommarioSettimana()">
		<?php include('struttura.php'); ?>
		<div id="container">
			<div id="content">
				<div id="comandiTabelle" style="height:50px;margin-top:40px;width:1294px;">
					<select id="selectSalvataggioSommarioProduzione" class="btnBlu" onchange="sommarioSettimana()">
						<?php
							$query="SELECT settimana FROM settimane_salvataggi ORDER BY settimana DESC";
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
									echo '<option value="'.$row["settimana"].'">Settimana '.$row["settimana"].'</option>';
								}
							}
						?>
					</select>
					<select id="selectStazioneSommarioProduzione" class="btnBlu" onchange="sommarioSettimana()">
						<option value="PTO_PTO">Punto Punto PTO_PTO</option>
						<option value="CAB_ACR">Verniciatura CAB_ACR</option>
						<option value="CAB_LAC">Verniciatura CAB_LAC</option>
						<option value="MNT_ACA">Montaggio MNT_ACA</option>
						<option value="MNT_HOME">Montaggio MNT_HOME</option>
						<option value="MNT_LUT">Montaggio MNT_LUT</option>
						<option value="MNT_MAST">Montaggio MNT_MAST</option>
					</select>
					<input type="button" id="btnScaricaGrafico" class="btnBlu" value="Scarica grafico" onclick='chart.exportChart({format: "jpg"});' />
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
