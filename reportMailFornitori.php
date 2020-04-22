<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Report mail fornitori";

	if(isset($_GET["colonnaFiltro"]))
		echo '<input type="hidden" value="'.$_GET["colonnaFiltro"].'" id="getParamsColonnaFiltro">';
	if(isset($_GET["valoreFiltro"]))
	{
		$valoreFiltro=$_GET["valoreFiltro"];
		$valoreFiltro=str_replace("||","'",$valoreFiltro);
		$valoreFiltro=str_replace("|_|"," ",$valoreFiltro);
		$valoreFiltro=str_replace("|-|","/",$valoreFiltro);
		$valoreFiltro=str_replace("|--|","\\",$valoreFiltro);
		$valoreFiltro=str_replace("|e|","&",$valoreFiltro);
		$valoreFiltro=str_replace("|uguale|","=",$valoreFiltro);
		echo '<input type="hidden" value="'.$valoreFiltro.'" id="getParamsValoreFiltro">';
	}
	?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
		<title><?php echo $pageName; ?></title>
		<script src="js_libraries/spinnersV2/spinners.js"></script>
		<link rel="stylesheet" href="js_libraries/spinnersV2/spinners.css" />
		<link rel="stylesheet" href="css/styleV35.css" />
		<link rel="stylesheet" href="css/reusableContainer.css" />
		<script src="struttura.js"></script>
		<script src="js/reportMailFornitori.js"></script>
		<link rel="stylesheet" href="css/reportMailFornitori.css" />
	</head>
	<body onload="onloadActions()">
		<?php include('struttura.php'); ?>
		<div class="reusable-outer-container reusable-outer-container-c">
            <div class="reusable-control-bar reusable-control-bar-r" id="reportAcquistiControlBar">
				<div class="rcb-input-icon-container">
					<i class="fas fa-filter" style="font-size:14px"></i>
					<select style="margin-left:5px" id="selectColonnaFiltroReportAcquisti" onchange="getSelectTipoFiltro(this.value)">
						<option value="ordine_fornitore">Ordine fornitore</option>
						<option value="ordine_cliente">Ordine cliente</option>
						<option value="nome_fornitore">Nome fornitore</option>
						<option value="nome_cliente">Nome cliente</option>
						<option value="data_spedizione">Data spedizione</option>
						<option value="doc_due_date">Data ordine</option>
					</select>
					<select id="selectTipoFiltroReportAcquisti" style="margin-left:5px">
						<option value="contiene">Contiene</option>
						<option value="uguale">Uguale</option>
						<option value="diverso">Diverso</option>
					</select>
					<input type="search" placeholder="Valore..." style="margin-left:5px;border:0.5px solid #ddd;height:23px;margin-right:10px;border-radius:2px;padding-left:5px;padding-right:5px" id="inputSearchreportAcquisti" onkeyup="checkInputSearchreportAcquisti(this,event)">
					<i class="fad fa-search" onclick="getElencoMail()" id="iconSearchreportAcquisti"></i>
				</div>
				<!--<button class="rcb-button-text-icon" onclick="getElencoMail()">
					<span>Aggiorna</span>
					<i class="fad fa-sync-alt" style="margin-left:5px"></i>
				</button>-->
				<!--<div class="rcb-input-icon-container" style="width:85px">
					<span style="color:gray;margin-right:5px">Righe</span>
					<input type="number" id="inputTopreportAcquisti" value="400" onkeyup="getElencoMail()">
				</div>-->
				<div class="rcb-select-container">
					<i class="fad fa-sort-alt"></i>
					<span>Ordina per</span>
					<select id="selectOrderByreportAcquisti" onchange="getElencoMail()">
						<option value="ordine_fornitore DESC">ordine fornitore decrescente</option>
						<option value="ordine_fornitore ASC">ordine fornitore crescente</option>
						<option value="ordine_cliente DESC">ordine cliente decrescente</option>
						<option value="ordine_cliente ASC">ordine cliente crescente</option>
						<option value="data_mail DESC">data mail decrescente</option>
						<option value="data_mail ASC">data mail crescente</option>
						<option value="doc_due_date DESC">data ordine decrescente</option>
						<option value="doc_due_date ASC">data ordine crescente</option>
						<option value="data_spedizione DESC">data spedizione decrescente</option>
						<option value="data_spedizione ASC">data spedizione crescente</option>
					</select>
				</div>
				<!--<button class="rcb-button-text-icon" onclick="getImportaPdfreportAcquisti()">
					<span>Importa pdf</span>
					<i class="fad fa-file-import" style="margin-left:5px"></i>
				</button>-->
			</div>
			<div class="reusable-row-container" style="overflow:hidden;min-height: calc(100% - 40px);">
				<div class="reusable-inner-container reusable-inner-container-margin" id="reportAcquistiItemsContainer"></div>
				<div class="reusable-column-container" style="box-sizing:border-box;overflow:hidden;width:75%;padding:10px;padding-bottom:10px;height:100%;">
				<div class="reusable-inner-container" id="reportAcquistiInfoOrdineContainer"></div>
				<div class="reusable-inner-container" id="reportAcquistiPdfContainer"></div>
				</div>
			</div>
		</div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

