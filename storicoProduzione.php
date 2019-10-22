<?php
	include "Session.php";
	include "connessione.php";
	include "connessionePDO.php";

	$pageName="Storico produzione";
	
	if(!$conn || !$connPDO)
		die("Errore: impossibile connettersi al server SQL");	
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
			<link rel="stylesheet" href="css/styleV34.css" />
			<script src="struttura.js"></script>
			<script>
				var stazioneG;
				var weekG;
				var tipoG;
				var nSettimane;
				var dettaglio;
				var updateSettimane=[];
				
				function resetStyle()
				{
					document.getElementById('comandiTabelle').style.height="0px";
					document.getElementById('tabelleCarichiDiLavoro').innerHTML="";
					var all = document.getElementsByClassName("btnIntestazioneCarichiDiLavoro");
					for (var i = 0; i < all.length; i++) 
					{
						all[i].style.color = 'black';
						all[i].style.boxShadow="";
					}
				}
				function puntoPunto()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="100%";
					document.getElementById('btnPuntoPunto').style.color="#3367d6";
					document.getElementById('btnPuntoPunto').style.boxShadow=" 5px 5px 10px #9c9e9f";
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('tabelleCarichiDiLavoro').innerHTML= this.responseText;
							document.getElementById('comandiTabelle').style.height="50px";
						}
					};
					xmlhttp.open("POST", "storicoPuntoPunto.php?nSettimane="+nSettimane, true);
					xmlhttp.send();
				}
				function verniciatura()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="100%";
					document.getElementById('btnVerniciatura').style.color="#3367d6";
					document.getElementById('btnVerniciatura').style.boxShadow=" 5px 5px 10px #9c9e9f";
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('tabelleCarichiDiLavoro').innerHTML= this.responseText;
							document.getElementById('comandiTabelle').style.height="50px";
						}
					};
					xmlhttp.open("POST", "storicoVerniciatura.php?nSettimane="+nSettimane, true);
					xmlhttp.send();
				}
				function montaggio()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="100%";
					document.getElementById('btnMontaggio').style.color="#3367d6";
					document.getElementById('btnMontaggio').style.boxShadow=" 5px 5px 10px #9c9e9f";
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('tabelleCarichiDiLavoro').innerHTML= this.responseText;
							document.getElementById('comandiTabelle').style.height="50px";
						}
					};
					xmlhttp.open("POST", "storicoMontaggio.php?nSettimane="+nSettimane, true);
					xmlhttp.send();
				}
				function stampa()
				{
					document.getElementById('header').style.display="none";
					document.getElementById('intestazioneCarichiDiLavoro').style.display="none";
					document.getElementById('navBar').style.display="none";
					document.getElementById('comandiTabelle').style.display="none";
					document.getElementById('immagineLogo').style.display="none";
					document.getElementById('footer').style.display="none";
					document.body.style.backgroundColor = "white";
					window.print();
					document.body.style.backgroundColor = "#EBEBEB";
					document.getElementById('header').style.display="";
					document.getElementById('intestazioneCarichiDiLavoro').style.display="";
					document.getElementById('navBar').style.display="";
					document.getElementById('comandiTabelle').style.display="";
					document.getElementById('immagineLogo').style.display="";
					document.getElementById('footer').style.display="";
				}
				function apriPopupModificaSettimane()
				{
					document.getElementById('popupModificaSettimane').style.height="330px";
					document.getElementById('popupModificaSettimane').style.width="500px";
					setTimeout(function()
					{ 
						document.getElementById('header').style.opacity="0.2";
						document.getElementById('container').style.opacity="0.2";
						document.getElementById('footer').style.opacity="0.2";	
					}, 100);
					setTimeout(function()
					{ 
						document.getElementById('popupModificaSettimane').style.opacity="1";	
					}, 200);
					dragElement(document.getElementById("popupModificaSettimane"));
					getTableModificaSettimane();
				}
				function chiudiPopupModificaSettimane()
				{
					document.getElementById('popupModificaSettimane').style.height='0px';
					document.getElementById('popupModificaSettimane').style.width='0px';
					document.getElementById('header').style.opacity="";
					document.getElementById('container').style.opacity="";
					document.getElementById('footer').style.opacity="";
					setTimeout(function()
					{ 
						document.getElementById('header').style.opacity='1';
						document.getElementById('container').style.opacity='1';
						document.getElementById('footer').style.opacity='1';
					}, 100);
				}
				function getTableModificaSettimane()
				{
					document.getElementById('statoModificaSettimane').innerHTML='';
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							if(this.responseText.indexOf("Error")!=-1 || this.responseText.indexOf("Notice")!=-1)
							{
								document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="'+this.responseText+'"></div>';
							}
							else
							{
								document.getElementById('tabellaPopupModificaSettimane').innerHTML=this.responseText;
							}
						}
					};
					xmlhttp.open("POST", "getTableModificaSettimane.php?", true);
					xmlhttp.timeout = 25000; // Set timeout to 25 seconds (25000 milliseconds)
					xmlhttp.ontimeout = function () 
					{ 
						document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="Timeout"></div>';
					}
					xmlhttp.send();
				}
				function dragElement(elmnt) 
				{
					var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
					document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
					function dragMouseDown(e) 
					{
						//document.getElementById('popupUpdateSapheader').style.cursor='-webkit-grabbing';
						e = e || window.event;
						e.preventDefault();
						// get the mouse cursor position at startup:
						pos3 = e.clientX;
						pos4 = e.clientY;
						document.onmouseup = closeDragElement;
						// call a function whenever the cursor moves:
						document.onmousemove = elementDrag;
					}

					function elementDrag(e) 
					{
						e = e || window.event;
						e.preventDefault();
						// calculate the new cursor position:
						pos1 = pos3 - e.clientX;
						pos2 = pos4 - e.clientY;
						pos3 = e.clientX;
						pos4 = e.clientY;
						// set the element's new position:
						elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
						elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
					}

					function closeDragElement() 
					{
						//document.getElementById('popupUpdateSapheader').style.cursor='-webkit-grab';
						/* stop moving when mouse button is released:*/
						document.onmouseup = null;
						document.onmousemove = null;
					}
				}
				function changeOpacity()
				{
					document.getElementById('header').style.opacity='1';
					document.getElementById('container').style.opacity='1';
					document.getElementById('footer').style.opacity='1';
					document.getElementById('popupModificaSettimane').style.opacity='0.7';
				}
				function modificaSettimana(valore,Tipo_mont,colonna)
				{
					if(valore=='' || valore==null  || valore>9 || isNaN(valore))
					{
						document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="Valore non valido"></div>';
					}
					else
					{
						document.getElementById('statoModificaSettimane').innerHTML='';
						updateSettimane.push("UPDATE Settimane SET ["+colonna+"]="+valore+" WHERE Tipo_mont='"+Tipo_mont+"'");
					}
				}
				function confermaModificaSettimane()
				{
					if(updateSettimane.length>0)
					{
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange = function() 
						{
							if (this.readyState == 4 && this.status == 200) 
							{
								if(this.responseText!="ok")
								{
									document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="'+this.responseText+'"></div>';
								}
								else
								{
									document.getElementById('statoModificaSettimane').innerHTML='<div id="success" style="margin-top:3px;" title="Settimane modificate"></div>';
								}
							}
						};
						xmlhttp.open("POST", "modificaSettimana.php?query="+updateSettimane.toString(), true);
						xmlhttp.timeout = 25000; // Set timeout to 25 seconds (25000 milliseconds)
						xmlhttp.ontimeout = function () 
						{ 
							document.getElementById('statoModificaSettimane').innerHTML='<div id="warning" style="margin-top:3px;" title="Timeout"></div>';
						}
						xmlhttp.send();
					}
				}
				function riempiTabelle()
				{
					nSettimane=document.getElementById("nSettimane").value;
					document.getElementById('inner').innerHTML='<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
					//document.getElementById('containerProgressBar').style.display="table";
					document.getElementById('messaggi').innerHTML="Importo storico montaggio...";
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							if(this.responseText!="ok")
								window.alert(this.responseText);
							else
							{
								document.getElementById('messaggi').innerHTML="Importo storico punto punto...";
								var xmlhttp = new XMLHttpRequest();
								xmlhttp.onreadystatechange = function() 
								{
									if (this.readyState == 4 && this.status == 200) 
									{
										if(this.responseText!="ok")
											window.alert(this.responseText);
										else
										{
											document.getElementById('messaggi').innerHTML="Importo storico verniciatura...";
											var xmlhttp = new XMLHttpRequest();
											xmlhttp.onreadystatechange = function() 
											{
												if (this.readyState == 4 && this.status == 200) 
												{
													if(this.responseText!="ok")
														window.alert(this.responseText);
													else
													{
														document.getElementById('messaggi').innerHTML="Tabelle importate";
														setTimeout(function(){ document.getElementById('containerProgressBar').style.display="none"; document.getElementById('push2').style.height="70px";}, 1500);
													}
												}
											};
											xmlhttp.open("POST", "riempiTabelleStorico3.php?", true);
											xmlhttp.send();
										}
									}
								};
								xmlhttp.open("POST", "riempiTabelleStorico2.php?", true);
								xmlhttp.send();
							}
						}
					};
					xmlhttp.open("POST", "riempiTabelleStorico1.php?", true);
					xmlhttp.send();
				}
				function nonAggiornare()
				{
					nSettimane=document.getElementById("nSettimane").value;
					document.getElementById('containerProgressBar').style.display="none";
					document.getElementById('push2').style.height="70px";
				}
				function getDettaglioPtoPto(stazione,week) 
				{ 
					topFunction();
					document.getElementById('titoloDettaglio').innerHTML="";
					document.getElementById('contenutoDettaglio').innerHTML="";
					var week2=week.split("_");
					week=week2[0]+week2[1];
					stazioneG=stazione;
					weekG=week;
					document.getElementById('popupDettaglio').style.display="inline-block";
					document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
							console.log(this.responseText);
							document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
							dettaglio=0;
						}
					};
					xmlhttp.open("POST", "getDettaglioPtoPtoStorico.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioVer(stazione,week) 
				{
					topFunction();
					document.getElementById('titoloDettaglio').innerHTML="";
					document.getElementById('contenutoDettaglio').innerHTML="";
					var week2=week.split("_");
					week=week2[0]+week2[1];
					stazioneG=stazione;
					weekG=week;
					document.getElementById('popupDettaglio').style.display="inline-block";
					document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
							document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
							dettaglio=0;
						}
					};
					xmlhttp.open("POST", "getDettaglioVerStorico.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioMon(stazione,week) 
				{
					topFunction();
					document.getElementById('titoloDettaglio').innerHTML="";
					document.getElementById('contenutoDettaglio').innerHTML="";
					var week2=week.split("_");
					week=week2[0]+week2[1];
					stazioneG=stazione;
					weekG=week;
					document.getElementById('popupDettaglio').style.display="inline-block";
					document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
							document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
							dettaglio=0;
						}
					};
					xmlhttp.open("POST", "getDettaglioMonStorico.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioPtoPtoResiduo(stazione,week) 
				{ 
					topFunction();
					document.getElementById('titoloDettaglio').innerHTML="";
					document.getElementById('contenutoDettaglio').innerHTML="";
					var week2=week.split("_");
					week=week2[0]+week2[1];
					stazioneG=stazione;
					weekG=week;
					tipoG="residuo";
					document.getElementById('popupDettaglio').style.display="inline-block";
					document.getElementById('titoloDettaglio').innerHTML="Dettaglio residuo stazione "+stazione+" precedente alla settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
							console.log(this.responseText);
							document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
							dettaglio=0;
						}
					};
					xmlhttp.open("POST", "getDettaglioPtoPtoResiduoStorico.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioVerResiduo(stazione,week) 
				{
					topFunction();
					document.getElementById('titoloDettaglio').innerHTML="";
					document.getElementById('contenutoDettaglio').innerHTML="";
					var week2=week.split("_");
					week=week2[0]+week2[1];
					stazioneG=stazione;
					weekG=week;
					tipoG="residuo";
					document.getElementById('popupDettaglio').style.display="inline-block";
					document.getElementById('titoloDettaglio').innerHTML="Dettaglio residuo stazione "+stazione+" precedente alla settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
							document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
							dettaglio=0;
						}
					};
					xmlhttp.open("POST", "getDettaglioVerResiduoStorico.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioMonResiduo(stazione,week) 
				{
					topFunction();
					document.getElementById('titoloDettaglio').innerHTML="";
					document.getElementById('contenutoDettaglio').innerHTML="";
					var week2=week.split("_");
					week=week2[0]+week2[1];
					stazioneG=stazione;
					weekG=week;
					tipoG="residuo";
					document.getElementById('popupDettaglio').style.display="inline-block";
					document.getElementById('titoloDettaglio').innerHTML="Dettaglio residuo stazione "+stazione+" precedente alla settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							document.getElementById('hiddenContenutoDettaglio').innerHTML= this.responseText;
							document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
							dettaglio=0;
						}
					};
					xmlhttp.open("POST", "getDettaglioMonResiduoStorico.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function fullscreenDettaglio()
				{
					document.getElementById('tipoH').value=tipoG;
					document.getElementById('stazioneH').value=stazioneG;
					document.getElementById('weekH').value=weekG;
					document.getElementById('TheForm').submit();
				}
				function downloadExcel()
				{
					if(dettaglio==0)
					{
						tableToExcel('myTableDettaglio');
						return 0;
					}
					if(dettaglio==2)
					{
						tableToExcel('myTableDettaglio2');
						return 0;
					}
				}
				function fixNSettimane()
				{
					if(document.getElementById("nSettimane").value<4)
						document.getElementById("nSettimane").value=4;
					if(document.getElementById("nSettimane").value>40)
						document.getElementById("nSettimane").value=40;
				}
				function topFunction() 
				{
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
				}
				function nextDettaglio()
				{
					if(dettaglio==0)
					{
						document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio2').outerHTML;
						dettaglio=2;
						return 0;
					}
					if(dettaglio==2)
					{
						document.getElementById('contenutoDettaglio').innerHTML=document.getElementById('myTableDettaglio').outerHTML;
						dettaglio=0;
						return 0;
					}
				}
			</script>
			<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
			<script src="canvasjs.min.js"></script>
			<script src="tableToExcel.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
			<style>
				@import url(http://fonts.googleapis.com/css?family=Exo:100,200,400);
				@import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:700,400,300);
				
				/* width */
				::-webkit-scrollbar 
				{
					width: 10px;
					height: 10px;
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
	<body onload="document.getElementById('btnConfermaSettimane').disabled=false;document.getElementById('btnNonAggiornare').disabled=false;">
		<div id="containerProgressBar">
			<div id="middle">
				<div id="messaggi"></div>
				<div id="inner">
					<div id="containerRangeBar">
						<span style="display:inline-block;float:left">Numero di settimane da visualizzare (4-40):</span>
						<div id="containerNSettimane">
							<button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" id="btnMeno">-</button>
							<input type="number" id="nSettimane" value="20" min="4" max="40" onchange="fixNSettimane()" />
							<button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="btnPiu">+</button>
						</div>
						<input type="button" id="btnConfermaSettimane" class="btnBlu" value="Conferma" onclick="riempiTabelle();" disabled>
						<input type="button" id="btnNonAggiornare" value="Non aggiornare le tabelle" onclick="nonAggiornare();" disabled>
					</div>
				</div>
			</div>
		</div>
		<div id="hiddenContenutoDettaglio" style="display:none"></div>
		<div id="popupDettaglio">
			<div id="intestazioneDettaglio">
				<div id='bottoniPopupDettaglio'>
					<input type="button" id="btnChiudiPopupDettaglio" onclick="dettaglio=0;document.getElementById('popupDettaglio').style.display='none'" value="" />
					<input type="button" id="btnFullScreenPopupDettaglio" onclick="fullscreenDettaglio()" value="" />
					<input type="button" id="btnExcelDettaglio" onclick="downloadExcel();" value="" />
				</div>
				<div id='titoloDettaglio'></div>
			</div>
			<div id="contenitoreBntNextDettaglio">
				<input type="button" id="btnLeftDettaglio" onclick="nextDettaglio()" value="" />
				<input type="button" id="btnRightDettaglio" onclick="nextDettaglio()" value="" />
			</div>
			<div id="contenutoDettaglio"></div>
		</div>
		<form target="_blank" id="TheForm" method="post" action="fullscreenDettaglioStorico.php" style="display:none;">
			<input type="hidden" name="tipoH" id="tipoH" value="" />
			<input type="hidden" name="stazioneH" id="stazioneH" value="" />
			<input type="hidden" name="weekH" id="weekH" value="" />
		</form>
		<div id="popupModificaSettimane" onclick="document.getElementById('popupModificaSettimane').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmouseup="document.getElementById('popupModificaSettimane').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmousedown="document.getElementById('popupModificaSettimane').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	">
			<div id="popupModificaSettimaneheader">
				<div style="color:white;box-sizing:border-box;height:60px;padding-left:40px;padding-top:20px;width:250px;float:left;display:inline-block;font-weight:bold">Modifica settimane</div>
				<input type="button" id="btnChiudiPopupModificaSettimane" onclick="chiudiPopupModificaSettimane()" value="" />
			</div>
			<div id="tabellaPopupModificaSettimane"></div>
			<div id="containerInputPopupModificaSettimane">
				<input type="button" id="btnConfermaPopupModificaSettimane" class="btnBlu" value="Conferma" onclick="confermaModificaSettimane()" />
				<div id="statoModificaSettimane"></div>
				<input type="button" id="btnAnnullaPopupModificaSettimane" class="btnBlu" value="Annulla" onclick="getTableModificaSettimane()" />
			</div>
		</div>
		<?php include('struttura.php'); ?>
		<div id="container" onclick="changeOpacity()">
			<div id="content">
				<div id="immagineLogo" class="immagineLogo" ></div>
				<div id="intestazioneCarichiDiLavoro">
					<input type="button" id="btnPuntoPunto" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();puntoPunto()" value="Storico punto punto" />
					<input type="button" id="btnVerniciatura" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();verniciatura()" value="Storico verniciatura" />
					<input type="button" id="btnMontaggio" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();montaggio()" value="Storico montaggio" />
				</div>
				<div id="comandiTabelle">
					<input type="button" id="btnStampaCaricoDiLavoro" class="btnBlu" value="Stampa" onclick="stampa();" />
					<input type="button" id="btnExcelCaricoDiLavoro" class="btnBlu" value="Scarica" onclick="tableToExcel('myTableTabelleCarichiDiLavoro');" />
					<input type="button" id="btnAggiornaTabelle" class="btnBlu" value="Importa tabelle" onclick="document.getElementById('push2').style.height='0px';document.getElementById('containerProgressBar').style.display='table';document.getElementById('btnConfermaSettimane').click();resetStyle()" />
					<input type="button" id="btnModificaSettimane" class="btnBlu" value="Settimane" onclick="apriPopupModificaSettimane();" />
				</div>
				<div id="tabelleCarichiDiLavoro"></div>
			</div>
		</div>
		<div id="push2"></div>
		<div id="footer" onclick="changeOpacity()">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
