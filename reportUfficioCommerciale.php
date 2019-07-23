<?php
	include "Session.php";
	include "connessione.php";
	
	$pageName="Report ufficio commerciale";
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
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
		<script src="https://cdn.jsdelivr.net/npm/handsontable@7.1.0/dist/handsontable.full.min.js"></script>
		<link href="https://cdn.jsdelivr.net/npm/handsontable@7.1.0/dist/handsontable.full.min.css" rel="stylesheet" media="screen">
		<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/handsontable@7.1.0/dist/languages/it-IT.js"></script>
		<script src="jquery.table2excel.js"></script>
		<title><?php echo $pageName; ?></title>
		<link rel="stylesheet" href="css/styleV28.css" />
		<script src="struttura.js"></script>
		<script>
			function apriPopupIntervalloDate()
			{
				var input1Container=document.createElement("div");
				input1Container.setAttribute("class","cointainerDataReportUfficioCommerciale");
				input1Container.setAttribute("style","margin-top:15px;");
				
				var label1=document.createElement("div");
				label1.setAttribute("class","labelDateReportUfficioCommerciale");
				label1.innerHTML="Data inizio";
				
				var input1=document.createElement("input");
				input1.setAttribute("type","date");
				input1.setAttribute("class","inputDateReportUfficioCommerciale");
				input1.setAttribute("id","data1ReportUfficioCommerciale");
				
				var input2Container=document.createElement("div");
				input2Container.setAttribute("class","cointainerDataReportUfficioCommerciale");
				input2Container.setAttribute("style","margin-bottom:15px;");
				
				var label2=document.createElement("div");
				label2.setAttribute("class","labelDateReportUfficioCommerciale");
				label2.innerHTML="Data fine";
				
				var input2=document.createElement("input");
				input2.setAttribute("type","date");
				input2.setAttribute("class","inputDateReportUfficioCommerciale");
				input2.setAttribute("id","data2ReportUfficioCommerciale");
				
				input1Container.appendChild(label1);
				input1Container.appendChild(input1);
				
				input2Container.appendChild(label2);
				input2Container.appendChild(input2);
				
				Swal.fire
				({
					type: 'question',
					title: "Seleziona intervallo date",
					html : input1Container.outerHTML+input2Container.outerHTML,
					showCancelButton:true,
					cancelButtonText: "Annulla",
					confirmButtonText : "Conferma"
				}).then((result) => 
				{
					if (result.value)
					{
						swal.close();
						var data1=document.getElementById("data1ReportUfficioCommerciale").value;
						var data2=document.getElementById("data2ReportUfficioCommerciale").value;
						if(data1!=null && data1!='' && data2!=null && data2!='')
						{
							if(data2<data1)
							{
								Swal.fire
								({
									type: 'error',
									title: 'Errore',
									text: "Seleziona un intervallo date valido",
									showCancelButton:true,
									cancelButtonText: "Annulla"
								}).then((result) => 
								{
									if (result.value)
										apriPopupIntervalloDate();
									else
										swal.close();
								});
							}
							else
							{
								$.post("getReportUfficioCommercialeView.php",
								{
									data1,
									data2
								},
								function(response, status)
								{
									if(status=="success")
									{
										//console.log(response);
										if(response.indexOf("error")>-1)
										{
											Swal.fire
											({
												type: 'error',
												title: 'Errore',
												text: "Se il problema persiste contatta l' amministratore"
											});
										}
										else
										{
											var responseArray=[];
											var responseArrayObj = JSON.parse(response);
											for (var key in responseArrayObj)
											{
												responseArray.push(responseArrayObj[key]);							
											}
											var columns=[];
											var columnsObj = JSON.parse(responseArray[0]);
											for (var key in columnsObj)
											{
												columns.push(columnsObj[key]);							
											}
											var data=[];
											var rowsObj = JSON.parse(responseArray[1]);
											for (var key in rowsObj)
											{
												data.push(rowsObj[key]);							
											}
											//console.log(columns);
											console.log(data);
											/*var data = [
											  ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
											  ['2017', 10, 11, 12, 13],
											  ['2018', 20, 11, 14, 13],
											  ['2019', 30, 15, 12, 13]
											];*/

											var container = document.getElementById('containerReportUfficioCommerciale');
											var hot = new Handsontable(container, {
											  data: data,
											  rowHeaders: false,
											  colHeaders: columns,
											  filters: true,
											  dropdownMenu: true,
											  language: 'it-IT'
											});
										}
									}
									else
										console.log(status);
								});
							}
						}
						else
						{
							Swal.fire
							({
								type: 'error',
								title: 'Errore',
								text: "Seleziona un intervallo date valido",
								showCancelButton:true,
								cancelButtonText: "Annulla"
							}).then((result) => 
							{
								if (result.value)
									apriPopupIntervalloDate();
								else
									swal.close();
							});
						}
					}
					else
						swal.close();
				})
			}
			/*function test()
			{
				var data = [
				  ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
				  ['2017', 10, 11, 12, 13],
				  ['2018', 20, 11, 14, 13],
				  ['2019', 30, 15, 12, 13]
				];

				var container = document.getElementById('containerReportUfficioCommerciale');
				var hot = new Handsontable(container, {
				  data: data,
				  rowHeaders: false,
				  colHeaders: ['A', 'B', 'Long column header label', 'D', 'Another long label', 'E', 'F'],
				  filters: true,
				  dropdownMenu: true,
				  language: 'it-IT'
				});
			}*/
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
		</style>
	</head>
	<body>
		<?php include('struttura.php'); ?>
		<div class="absoluteActionBar">
			<!--<div class="absoluteActionBarElement">Righe: <span id="rowsNumEditableTable"></span></div>-->
			<button class="absoluteActionBarButton" onclick="apriPopupIntervalloDate()">Intervallo date <i style="margin-left:5px" class="far fa-calendar-alt"></i></button>
		</div>
		<div id="containerReportUfficioCommerciale" class="absoluteContainer"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

