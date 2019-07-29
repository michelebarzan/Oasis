<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Ricevimento merci";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<link rel="stylesheet" href="fontawesomepro/css/fontawesomepro.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="editableTable/editableTable.css" />
		<script src="jquery.table2excel.js"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV32.css" />
		<script src="struttura.js"></script>
		<script>
			function getTable(table,orderBy,orderType)
			{
				if(table=="riepilogo_registrazioni_ricevimento_merci")
				{
					getEditableTable
					({
						table:'riepilogo_registrazioni_ricevimento_merci',
						primaryKey:'id_reg',
						container:'containerRicevimentoMerci',
						noFilterColumns:['d_reg_ordine','d_consegna','d_invio_mail','d_ricezione','descr_destinazione','testo_nota'],
						editable:false,
						orderBy:orderBy,
						orderType:orderType
					});
				}
			}
			function editableTableLoad()
			{
			
			}
		</script>
		<style>
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
	<body onload="getTable('riepilogo_registrazioni_ricevimento_merci')">
		<?php include('struttura.php'); ?>
		<div class="absoluteActionBar">
			<div class="absoluteActionBarElement">Righe: <span id="rowsNumEditableTable"></span></div>
			<button class="absoluteActionBarButton" onclick="excelExport('containerRicevimentoMerci')">Esporta <i style="margin-left:5px;color:green" class="far fa-file-excel"></i></button>
			<button class="absoluteActionBarButton" onclick="resetFilters();getTable(selectetTable)">Ripristina <i style="margin-left:5px" class="fal fa-filter"></i></button>
		</div>
		<div id="containerRicevimentoMerci"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

