<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="FAQ & richieste";
?>
<html>
	<head>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <link href="js_libraries/bootstrap-tour/bootstrap-tour-standalone.min.css" rel="stylesheet">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
		<script src="js_libraries/bootstrap-tour/bootstrap-tour-standalone.min.js"></script>
		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Graduate&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="js_libraries/spinners/spinner.css" />
		<script src="js_libraries/spinners/spinner.js"></script>
		<script src="editableTable/editableTable.js"></script>
		<link rel="stylesheet" href="editableTable/editableTable.css" />
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV35.css" />
		<script src="struttura.js"></script>
		<script src="js/richiesteEfaq.js"></script>
		<link rel="stylesheet" href="css/richiesteEfaqV3.css" />
		<!--<link href="js_libraries/intro.js/introjs.css" rel="stylesheet">-->
		<script src="js_libraries/jquery.table2excel.js"></script>
		<!--<script type="text/javascript" src="js_libraries/intro.js/intro.js"></script>-->
		<link rel="stylesheet" href="https://unpkg.com/multiple-select@1.4.1/dist/multiple-select.min.css">
		<!--<script src="https://unpkg.com/multiple-select@1.4.1/dist/multiple-select.min.js"></script>-->
		<script src="js/sendMail.js"></script>
		<script src="js/commonRichieste.js"></script>	
		<link rel="stylesheet" href="css/commonRichieste.css" />	
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
			#bootstrap-tour-btnGestioneRichieste
			{
				text-decoration:none;
				color:black;
			}
			#bootstrap-tour-btnGestioneRichieste:visited
			{
				color:black;
			}
		</style>
	</head>
	<body onload="checkServerSideSettings();checkTutorial()">
		<?php include('struttura.php'); ?>
        <div class="absoluteActionBar2" id="richiesteEfaqAbsoluteActionBar2" style="top:100">
            <button class="absoluteActionBarButton" id="bootstrap-tour-btnNuovaRichiesta" onclick="apriPopupNuovaRichiesta()">
                Nuova richiesta
                <i class="fad fa-layer-plus" style="margin-left:5px"></i>
			</button>
			<button class="absoluteActionBarButton" id="bootstrap-tour-btnLeTueRichieste" onclick="resetStyle(this);getRichiesteUtente()">
                Le tue richieste
                <i class="fad fa-user-edit" style="margin-left:5px"></i>
			</button>
			<button class="absoluteActionBarButton" id="bootstrap-tour-btnTutteLeRichieste" onclick="resetStyle(this);getTutteRichieste()">
                Tutte le richieste
                <i class="fad fa-list-alt" style="margin-left:5px"></i>
			</button>
			<a class="absoluteActionBarButton" id="bootstrap-tour-btnGestioneRichieste" href="gestioneRichiesteEfaq.php">
                Gestione richieste
                <i class="fad fa-inbox-in" style="margin-left:5px"></i>
			</a>
			<button class="absoluteActionBarButton" style="margin-left:5px" onclick="getPopupImpostazioni()">Impostazioni <i style="margin-left:5px;" class="fad fa-cog"></i></button>
			<button class="absoluteActionBarButton" id="bootstrap-tour-btnTutorial" title="Tutorial" onclick="startTutorial()">
                <i class="far fa-question" ></i>
			</button>
        </div>
		<div class="absoluteContainer2" style="top:150">
		<!----------------------------------------------------------------------------------------------------------------------------------------------------------------->
			<div id="viewFunctionBar">
				<div class="viewFunctionBarRow">
					<div id="viewTitleContainer"><span id="viewTitle"></span></div>
					<div class="viewFunctionBarTextContainer" id="bootstrap-tour-btnVisualizzazione">
						<span style="float:left;display:block;margin-right:5px;">Visualizzazione</span>
						<div class="switchVisualizzazioneButton switchVisualizzazioneR" id="switchVisualizzazioneButton-1">
							<input type="checkbox" id="switchVisualizzazioneCheckbox" class="switchVisualizzazioneCheckbox" onchange="toggleVisualizzazione()">
							<div class="switchVisualizzazioneKnobs"></div>
							<div class="switchVisualizzazioneLayer"></div>
						</div>
					</div>
					<button class="absoluteActionBarButton" id="bootstrap-tour-btnFiltri" style="margin-top:5px" onclick="$('#viewFunctionBarRowFiltri').toggle('fast','swing')">Filtri <i style="margin-left:5px;" class="far fa-filter"></i></button>
					<button class="absoluteActionBarButton" id="btnCollassaEspandiTutteRichieste" style="margin-top:5px;margin-left:10px" onclick="toggleAllRichieste(this)">Espandi tutte <i style="margin-left:5px;" class="fas fa-caret-down"></i></button>
				</div>
				<div class="viewFunctionBarRow" id="viewFunctionBarRowFiltri" style="display:none">
					<div id="editableTableElementsRichiesteEfaq" style="display:none">
						<div class="absoluteActionBarElement">Righe: <span id="rowsNumEditableTable"></span></div>
						<button class="absoluteActionBarButton" onclick="scaricaExcel('richiesteContainer')">Esporta <i style="margin-left:5px;color:green" class="far fa-file-excel"></i></button>
						<button class="absoluteActionBarButton" onclick="resetFilters();getTable(selectetTable)">Ripristina <i style="margin-left:5px" class="fal fa-filter"></i></button>
					</div>
					<div id="listViewElementsRichiesteEfaq" style="display:none">
						<div class="absoluteActionBarElement">
							Stato: 
							<select id="selectStatoLeTueRichieste" multiple>
								<option value="In attesa di chiusura" selected>Richieste in attesa di chiusura</option>
								<option value="Presa in carico" selected>Richieste prese in carico</option>
								<option value="Aperta" selected>Richieste aperte</option>
								<option id="selectStatoLeTueRichiesteOptionChiusa" value="Chiusa">Richieste chiuse</option>
							</select>
						</div>
						<div class="absoluteActionBarElement">
							<div style="float:left;display:block">Area di competenza</div> 
							<select id="selectFiltraMacrocategoriaLeTueRichieste" style="margin-left:5px;width:80px" onchange="if(view=='richieste_utente'){getRichiesteUtente()}else{getTutteRichieste()}">
								<option value="*">Tutte</option>
								<?php
									$queryMacrocategorie="SELECT id_macrocategoria, nome FROM dbo.macrocategorie_richieste";	
									$resultMacrocategorie=sqlsrv_query($conn,$queryMacrocategorie);
									if($resultMacrocategorie==TRUE)
									{
										while($rowMacrocategorie=sqlsrv_fetch_array($resultMacrocategorie))
										{
											echo '<option value="'.$rowMacrocategorie['id_macrocategoria'].'">'.$rowMacrocategorie['nome'].'</option>';
										}
									}
								?>
							</select>
						</div>
						<div class="absoluteActionBarElement">
							<div style="float:left;display:block">Categoria</div> 
							<select id="selectFiltraCategoriaLeTueRichieste" style="margin-left:5px;width:80px" onchange="if(view=='richieste_utente'){getRichiesteUtente()}else{getTutteRichieste()}">
								<option value="*">Tutte</option>
								<?php
									$queryCategorie="SELECT id_categoria, nome FROM dbo.categorie_richieste";	
									$resultCategorie=sqlsrv_query($conn,$queryCategorie);
									if($resultCategorie==TRUE)
									{
										while($rowCategorie=sqlsrv_fetch_array($resultCategorie))
										{
											echo '<option value="'.$rowCategorie['id_categoria'].'">'.$rowCategorie['nome'].'</option>';
										}
									}
								?>
							</select>
						</div>
						<div class="absoluteActionBarElement">
							<div style="float:left;display:block">Cerca</div> 
							<select id="searchSelectLeTueRichiesteListItem1" onchange="searchLeTueRichieste()">
								<option value="oggetto">nell' oggetto</option>
								<option value="id_richiesta">nel codice</option>
								<option value="descrizione">nella descrizione</option>
								<option value="data_creazione">nella data creazione</option>
								<option id="searchSelectLeTueRichiesteListItem1OptionUtente" value="utente_creazione">nell' utente</option>
							</select>
							<input class="absoluteActionBarInput" style="width:120px" id="searchInputLeTueRichiesteListItem1" onkeyup="searchLeTueRichieste()">
						</div>
						<div class="absoluteActionBarElement">
							<div style="float:left;display:block">Cerca nella colonna</div> 
							<select id="searchSelectLeTueRichiesteListItem2" onchange="searchLeTueRichieste()">
								<?php
									$queryColonneMacrocategorie="SELECT DISTINCT colonna,label FROM dbo.colonne_richieste_macrocategorie";	
									$resultColonneMacrocategorie=sqlsrv_query($conn,$queryColonneMacrocategorie);
									if($resultColonneMacrocategorie==TRUE)
									{
										while($rowColonneMacrocategorie=sqlsrv_fetch_array($resultColonneMacrocategorie))
										{
											echo '<option value="'.$rowColonneMacrocategorie["colonna"].'">'.$rowColonneMacrocategorie["label"].'</option>';
										}
									}
								?>
							</select>
							<input class="absoluteActionBarInput"  style="width:120px" id="searchInputLeTueRichiesteListItem2" onkeyup="searchLeTueRichieste()">
						</div>
					</div>
				</div>
			</div>
			<!----------------------------------------------------------------------------------------------------------------------------------------------------------------->
			<div id="richiesteSearchBarContainer">
				<input type="text" id="richiesteMainSearchInput" onkeyup="mainSearchRichieste(this)"  placeholder="Cerca tra le richieste...">
			</div>
			<div id="richiesteContainer"></div>
		</div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
		<script src="https://unpkg.com/multiple-select@1.4.1/dist/multiple-select.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="js_libraries/selectize/selectize.min.js"></script>
		<link rel="stylesheet" href="js_libraries/selectize/selectize.css" />
	</body>
</html>