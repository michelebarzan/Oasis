<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Sommario produzione";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV33.css" />
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
		<script src="canvasjs.min.js"></script>
		<script src="struttura.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<script src="js_libraries/jquery.table2excel.js"></script>
		<script src="js/sommarioProduzione.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="editableTable/editableTable.css" />
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
	</head>
	<body onload="getTable()">
		<?php include('struttura.php'); ?>
		<div id="container">
			<div id="content">
				<div id="comandiTabelle" style="height:50px;margin-top:40px;width:1294px;">
					<select id="selectSalvataggioSommarioProduzione" class="btnBlu" onchange="getTable(selectetTable,'stato','DESC')">
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
					<select id="selectStazioneSommarioProduzione" class="btnBlu" onchange="getTable(selectetTable,'stato','DESC')">
						<option value="PTO_PTO">Punto Punto PTO_PTO</option>
						<option value="CAB_ACR">Verniciatura CAB_ACR</option>
						<option value="CAB_LAC">Verniciatura CAB_LAC</option>
						<option value="MNT_ACA">Montaggio MNT_ACA</option>
						<option value="MNT_HOME">Montaggio MNT_HOME</option>
						<option value="MNT_LUT">Montaggio MNT_LUT</option>
						<option value="MNT_MAST">Montaggio MNT_MAST</option>
					</select>
					<input type="button" id="btnScaricaGrafico" class="btnBlu" value="Scarica grafico" onclick='chart.exportChart({format: "jpg"});' />
					<!--<input type="button" id="btnScaricaExcel" class="btnBlu" value="Scarica Excel" onclick="scaricaExcel('myTableSommarioProduzione')" />-->

					<!--Editable table-->
					<div style="float:left;margin-top:15px;margin-left:20px;display:block">
						<div class="absoluteActionBarSommarioArchiviElement">Righe: <span id="rowsNumEditableTable"></span></div>
						<button class="absoluteActionBarSommarioArchiviButton" onclick="scaricaExcel('containerSommarioProduzione')">Esporta <i style="margin-left:5px;color:green" class="far fa-file-excel"></i></button>
						<button class="absoluteActionBarSommarioArchiviButton" onclick="resetFilters();getTable(selectetTable,'stato','DESC')">Ripristina <i style="margin-left:5px" class="fal fa-filter"></i></button>
					</div>
				</div>
				<div id='chartContainer'></div>
				<div id="containerSommarioProduzione"></div>
			</div>
		</div>
		<div id="push"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
