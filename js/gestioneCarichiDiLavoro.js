var stazioneVisualizzata;
var weekCapacitaProduttiva;
var docnumDettaglio;
var endSessionGestioneFlag=1;
var globalHoveredElement;
var draggedElement;
var checkHoveredElementInterval;
var counter=0;
var nWeeks=11;

function resetStyle()
{
	stazioneVisualizzata="";
	document.getElementById('comandiTabelle').style.height="0px";
	var all = document.getElementsByClassName("btnIntestazioneCarichiDiLavoro");
	for (var i = 0; i < all.length; i++) 
	{
		all[i].style.color = 'black';
		all[i].style.boxShadow="";
	}
	document.getElementById('containerGestioneSettimane').innerHTML="";
}
function puntoPunto()
{
	stazioneVisualizzata="Punto punto";
	document.getElementById('selectVER').style.display="none";
	document.getElementById('selectMON').style.display="none";
	var stazione="PTO_PTO";
	document.getElementById('btnPuntoPunto').style.color="#3367d6";
	document.getElementById('btnPuntoPunto').style.boxShadow=" 5px 5px 10px #9c9e9f";
	document.getElementById('comandiTabelle').style.height="50px";
	document.getElementById("containerGestioneSettimane").style.display = "inline-block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			document.getElementById('containerGestioneSettimane').innerHTML=this.responseText;
			fixContainer();
			getTotali();
			setTimeout(function(){getCapacitaProduttive();getOrdiniFuturi();}, 20);
		}
	};
	xmlhttp.open("POST", "getGestionePuntoPunto.php?stazione="+stazione, true);
	xmlhttp.send();
}
function verniciatura()
{
	stazioneVisualizzata="Verniciatura";
	document.getElementById('selectMON').style.display="none";
	document.getElementById('selectVER').style.display="inline-block";
	var stazione=document.getElementById('selectVER').value;
	//console.log(stazione);
	document.getElementById('btnVerniciatura').style.color="#3367d6";
	document.getElementById('btnVerniciatura').style.boxShadow=" 5px 5px 10px #9c9e9f";
	document.getElementById('comandiTabelle').style.height="50px";
	document.getElementById("containerGestioneSettimane").style.display = "inline-block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			document.getElementById('containerGestioneSettimane').innerHTML=this.responseText;
			fixContainer();
			getTotali();
			setTimeout(function(){getCapacitaProduttive();getOrdiniFuturi();}, 20);
		}
	};
	xmlhttp.open("POST", "getGestioneVerniciatura.php?stazione="+stazione, true);
	xmlhttp.send();
}
function montaggio()
{
	stazioneVisualizzata="Montaggio";
	document.getElementById('selectVER').style.display="none";
	document.getElementById('selectMON').style.display="inline-block";
	var stazione=document.getElementById('selectMON').value;
	document.getElementById('btnMontaggio').style.color="#3367d6";
	document.getElementById('btnMontaggio').style.boxShadow=" 5px 5px 10px #9c9e9f";
	document.getElementById('comandiTabelle').style.height="50px";
	document.getElementById("containerGestioneSettimane").style.display = "inline-block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			document.getElementById('containerGestioneSettimane').innerHTML=this.responseText;
			fixContainer();
			getTotali();
			setTimeout(function(){getCapacitaProduttive();getOrdiniFuturi();}, 20);
		}
	};
	xmlhttp.open("POST", "getGestioneMontaggio.php?stazione="+stazione, true);
	xmlhttp.send();
}
function riempiTabelle()
{
	startSessionGestione(function(responseTextStartSessionGestione) 
	{
		if(responseTextStartSessionGestione!="ok")
		{
			document.getElementById('containerRangeBar').innerHTML=responseTextStartSessionGestione;
		}
		else
		{
			setInterval(function()
			{
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() 
				{
					if (this.readyState == 4 && this.status == 200) 
					{
						if(this.responseText!="ok")
						{
							window.alert(this.responseText);
							endSessionGestione();
							logoutB();
						}
					}
				};
				xmlhttp.open("POST", "checkDisconnessione.php?", true);
				xmlhttp.send();
			}, 1000);
			eliminaNotifiche();
			aggiungiNotifica("Hai l' accesso esclusivo a questa pagina. Nessuno può accedervi o aggiornare i dati.")
			document.getElementById('inner').innerHTML='<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
			document.getElementById('messaggi').innerHTML="Importo pdf ordini...";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					if(this.responseText!="ok")
						window.alert(this.responseText);
					else
					{
						document.getElementById('messaggi').innerHTML="Importo tabella collezioni...";
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange = function() 
						{
							if (this.readyState == 4 && this.status == 200) 
							{
								if(this.responseText!="ok")
									window.alert(this.responseText);
								else
								{
									document.getElementById('messaggi').innerHTML="Importo tabella montaggio...";
									var xmlhttp = new XMLHttpRequest();
									xmlhttp.onreadystatechange = function() 
									{
										if (this.readyState == 4 && this.status == 200) 
										{
											if(this.responseText!="ok")
												window.alert(this.responseText);
											else
											{
												document.getElementById('messaggi').innerHTML="Importo tabella punto punto...";
												var xmlhttp = new XMLHttpRequest();
												xmlhttp.onreadystatechange = function() 
												{
													if (this.readyState == 4 && this.status == 200) 
													{
														if(this.responseText!="ok")
															window.alert(this.responseText);
														else
														{
															document.getElementById('messaggi').innerHTML="Importo tabella verniciatura...";
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
																		setTimeout(function(){ document.getElementById('containerProgressBar').style.display="none";document.getElementById('push2').style.height="50px"; }, 1500);
																	}
																}
															};
															xmlhttp.open("POST", "riempiTabelleGestione3.php?", true);
															xmlhttp.send();
														}
													}
												};
												xmlhttp.open("POST", "riempiTabelleGestione2.php?", true);
												xmlhttp.send();
											}
										}
									};
									xmlhttp.open("POST", "riempiTabelleGestione1.php?", true);
									xmlhttp.send();
								}
							}
						};
						xmlhttp.open("POST", "riempiTabelleGestioneCollezioni.php?", true);
						xmlhttp.send();
					}
				}
			};
			xmlhttp.open("POST", "importaPdf.php?", true);
			xmlhttp.send();
		}
	});
}
function getTotali()
{
	getTotaliResiduo();
	getTotaliOrdini();
}
function fixContainer()
{
	var altezzeVER=[];
	var height=document.getElementById('residuoVER').offsetHeight;
	altezzeVER.push(height);
	for (let index = 1; index <= nWeeks; index++) 
	{
		var height=document.getElementById('ordiniVER'+index).offsetHeight;
		altezzeVER.push(height);
	}
	//var altezzeVER=[document.getElementById('residuoVER').offsetHeight,document.getElementById('ordiniVER1').offsetHeight,document.getElementById('ordiniVER2').offsetHeight,document.getElementById('ordiniVER3').offsetHeight,document.getElementById('ordiniVER4').offsetHeight,document.getElementById('ordiniVER5').offsetHeight];
	var largestVER = Math.max.apply(null, altezzeVER);
	largestVER=largestVER+7;
	
	document.getElementById('residuoVER').style.height=largestVER+"px";
	for (let index = 1; index <= nWeeks; index++) 
	{
		document.getElementById('ordiniVER'+index).style.height=largestVER+"px";
	}
	if(document.getElementById("residuoVER").childElementCount==0)
		document.getElementById('residuoVER').style.height=largestVER+7+"px";
	for (let index = 1; index <= nWeeks; index++) 
	{
		if(document.getElementById("ordiniVER"+index).childElementCount==0)
			document.getElementById('ordiniVER'+index).style.height=largestVER+7+"px";
	}
	/*document.getElementById('residuoVER').style.height=largestVER+"px";
	document.getElementById('ordiniVER1').style.height=largestVER+"px";
	document.getElementById('ordiniVER2').style.height=largestVER+"px";
	document.getElementById('ordiniVER3').style.height=largestVER+"px";
	document.getElementById('ordiniVER4').style.height=largestVER+"px";
	document.getElementById('ordiniVER5').style.height=largestVER+"px";*/
	/*if(document.getElementById("residuoVER").childElementCount==0)
		document.getElementById('residuoVER').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER1").childElementCount==0)
		document.getElementById('ordiniVER1').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER2").childElementCount==0)
		document.getElementById('ordiniVER2').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER3").childElementCount==0)
		document.getElementById('ordiniVER3').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER4").childElementCount==0)
		document.getElementById('ordiniVER4').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER5").childElementCount==0)
		document.getElementById('ordiniVER5').style.height=largestVER+7+"px";*/
}
function fixContainerDrop(nElementi)
{
	var altezzeVER=[];
	var height=document.getElementById('residuoVER').offsetHeight;
	altezzeVER.push(height);
	for (let index = 1; index <= nWeeks; index++) 
	{
		var height=document.getElementById('ordiniVER'+index).offsetHeight;
		altezzeVER.push(height);
	}
	//var altezzeVER=[document.getElementById('residuoVER').offsetHeight,document.getElementById('ordiniVER1').offsetHeight,document.getElementById('ordiniVER2').offsetHeight,document.getElementById('ordiniVER3').offsetHeight,document.getElementById('ordiniVER4').offsetHeight,document.getElementById('ordiniVER5').offsetHeight];
	var largestVER = Math.max.apply(null, altezzeVER);
	
	var nElementiVER=[];
	var nElementi=document.getElementById('residuoVER').offsetHeight;
	nElementiVER.push(nElementi);
	for (let index = 1; index <= nWeeks; index++) 
	{
		var nElementi=document.getElementById('ordiniVER'+index).childElementCount;
		nElementiVER.push(nElementi);
	}
	//var nElementiVER=[document.getElementById('residuoVER').childElementCount,document.getElementById('ordiniVER1').childElementCount,document.getElementById('ordiniVER2').childElementCount,document.getElementById('ordiniVER3').childElementCount,document.getElementById('ordiniVER4').childElementCount,document.getElementById('ordiniVER5').childElementCount];
	var largestnElementi = Math.max.apply(null, nElementiVER);
	//console.log("C'erano "+nElementi+" elementi");
	//console.log("Ci sono "+largestnElementi+" elementi");
	if(nElementi>=largestnElementi)
	{
		largestVER=largestVER-40;
		//console.log("piu piccolo");
	}
	else
	{
		largestVER=largestVER+27;
		//console.log("piu grande");
	}
	
	document.getElementById('residuoVER').style.height=largestVER+"px";
	for (let index = 1; index <= nWeeks; index++) 
	{
		document.getElementById('ordiniVER'+index).style.height=largestVER+"px";
	}
	if(document.getElementById("residuoVER").childElementCount==0)
		document.getElementById('residuoVER').style.height=largestVER+7+"px";
	for (let index = 1; index <= nWeeks; index++) 
	{
		if(document.getElementById("ordiniVER"+index).childElementCount==0)
			document.getElementById('ordiniVER'+index).style.height=largestVER+7+"px";
	}	
	/*document.getElementById('residuoVER').style.height=largestVER+"px";
	document.getElementById('ordiniVER1').style.height=largestVER+"px";
	document.getElementById('ordiniVER2').style.height=largestVER+"px";
	document.getElementById('ordiniVER3').style.height=largestVER+"px";
	document.getElementById('ordiniVER4').style.height=largestVER+"px";
	document.getElementById('ordiniVER5').style.height=largestVER+"px";*/
	/*if(document.getElementById("residuoVER").childElementCount==0)
		document.getElementById('residuoVER').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER1").childElementCount==0)
		document.getElementById('ordiniVER1').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER2").childElementCount==0)
		document.getElementById('ordiniVER2').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER3").childElementCount==0)
		document.getElementById('ordiniVER3').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER4").childElementCount==0)
		document.getElementById('ordiniVER4').style.height=largestVER+7+"px";
	if(document.getElementById("ordiniVER5").childElementCount==0)
		document.getElementById('ordiniVER5').style.height=largestVER+7+"px";*/
}
function getTotaliResiduo()
{
	var MQ=0;
	var BP=0;
	var BA=0;
	var P=0;
	var C=0;
	var A=0;
	var TOT=0;
	var all =document.getElementById('residuoVER').getElementsByClassName("elementOrdine");
	for (var i = 0; i < all.length; i++) 
	{
		MQ+=parseInt(all[i].childNodes[1].innerHTML);
		BP+=parseInt(all[i].childNodes[2].innerHTML);
		BA+=parseInt(all[i].childNodes[3].innerHTML);
		P+=parseInt(all[i].childNodes[4].innerHTML);
		C+=parseInt(all[i].childNodes[5].innerHTML);
		A+=parseInt(all[i].childNodes[6].innerHTML);
		TOT+=parseInt(all[i].childNodes[7].innerHTML);
	}
	document.getElementById('totaleResiduoORD').innerHTML=i;
	document.getElementById('totaleResiduoMQ').innerHTML=MQ;
	document.getElementById('totaleResiduoBP').innerHTML=BP;
	document.getElementById('totaleResiduoBA').innerHTML=BA;
	document.getElementById('totaleResiduoP').innerHTML=P;
	document.getElementById('totaleResiduoC').innerHTML=C;
	document.getElementById('totaleResiduoA').innerHTML=A;
	document.getElementById('totaleResiduoTOT').innerHTML="TOTALE : "+TOT;
}
function getTotaliOrdini()
{
	for (var j = 1; j <= nWeeks; j++) 
	{
		var MQ=0;
		var BP=0;
		var BA=0;
		var P=0;
		var C=0;
		var A=0;
		var TOT=0;
		var all =document.getElementById('ordiniVER'+j).getElementsByClassName("elementOrdine");
		for (var i = 0; i < all.length; i++) 
		{
			MQ+=parseInt(all[i].childNodes[1].innerHTML);
			BP+=parseInt(all[i].childNodes[2].innerHTML);
			BA+=parseInt(all[i].childNodes[3].innerHTML);
			P+=parseInt(all[i].childNodes[4].innerHTML);
			C+=parseInt(all[i].childNodes[5].innerHTML);
			A+=parseInt(all[i].childNodes[6].innerHTML);
			TOT+=parseInt(all[i].childNodes[7].innerHTML);
		}
		document.getElementById('totaleOrdini'+j+'ORD').innerHTML=i;
		document.getElementById('totaleOrdini'+j+'MQ').innerHTML=MQ;
		document.getElementById('totaleOrdini'+j+'BP').innerHTML=BP;
		document.getElementById('totaleOrdini'+j+'BA').innerHTML=BA;
		document.getElementById('totaleOrdini'+j+'P').innerHTML=P;
		document.getElementById('totaleOrdini'+j+'C').innerHTML=C;
		document.getElementById('totaleOrdini'+j+'A').innerHTML=A;
		document.getElementById('totaleOrdini'+j+'TOT').innerHTML="TOTALE : "+TOT;
	}
}
function getCapacitaProduttive()
{
	if(stazioneVisualizzata=="Verniciatura")
	{
		var stazione=document.getElementById('selectVER').value;
	}
	if(stazioneVisualizzata=="Montaggio")
	{
		var stazione=document.getElementById('selectMON').value;
	}
	if(stazioneVisualizzata=="Punto punto")
	{
		var stazione="PTO_PTO";
	}
	
	var weeks=[];
	var weeksU=[];
	var capacitaQnt=[];
	var all =document.getElementsByClassName("week");
	var j=1;
	for (var i = 0; i < all.length; i++) 
	{
		weeksU.push(all[i].innerHTML);
		weeks.push(all[i].innerHTML.replace("_",""));
		//SCELTA VALORE UM PER CAPACITA PRODUTTIVA
		if(stazioneVisualizzata=="Verniciatura")
			capacitaQnt.push(document.getElementById('totaleOrdini'+j+'MQ').innerHTML);
		else
		{
			var str=document.getElementById('totaleOrdini'+j+'TOT').innerHTML;
			str=str.replace("TOTALE : ", "");
			capacitaQnt.push(str);
		}
		j++;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			//console.log(this.responseText);
			
			var res=this.responseText.split("£");
			var percentuali=res[0].split("|");
			var capacitaProduttiveMax=res[1].split("|");
			
			weekN=1;
			for (var z = 0; z < capacitaProduttiveMax.length; z++) 
			{
				///PRINT OUTPUT-----------------------------------------------------------------------------
				document.getElementById('capacitaProduttivaQnt'+weekN).innerHTML=capacitaQnt[z];
				document.getElementById('progressBarCapacitaProduttiva'+weeksU[z]).value=percentuali[z];
				document.getElementById('progressBarCapacitaProduttiva'+weeksU[z]).setAttribute("data-label",percentuali[z]+"%");
				if(capacitaProduttiveMax[z]==0)
				{
					document.getElementById('capacitaProduttivaQnt'+weekN).style.color="black";
					document.getElementById('capacitaProduttivaTot'+weekN).innerHTML="/?";
				}
				else
				{
					document.getElementById('capacitaProduttivaTot'+weekN).innerHTML="/"+capacitaProduttiveMax[z];
					if(percentuali[z]<=70)
					{
						document.getElementById('capacitaProduttivaQnt'+weekN).style.color="#009900";
					}
					if(percentuali[z]>70 && percentuali[z]<100)
					{
						document.getElementById('capacitaProduttivaQnt'+weekN).style.color="#FFFF14";
					}
					if(percentuali[z]>=100)
					{
						document.getElementById('capacitaProduttivaQnt'+weekN).style.color="red";
					}
				}
				weekN++;
			}
			
		}
	};
	xmlhttp.open("POST", "getCapacitaProduttive.php?stazione="+stazione+"&weeks="+weeks.toString()+"&capacitaQnt="+capacitaQnt.toString(), true);
	xmlhttp.send();
}
function nonAggiornare()
{
	startSessionGestione(function(responseTextStartSessionGestione) 
	{
		if(responseTextStartSessionGestione!="ok")
		{
			document.getElementById('containerRangeBar').innerHTML=responseTextStartSessionGestione;
		}
		else
		{
			setInterval(function()
			{
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() 
				{
					if (this.readyState == 4 && this.status == 200) 
					{
						if(this.responseText!="ok")
						{
							window.alert(this.responseText);
							endSessionGestione();
							logoutB();
						}
					}
				};
				xmlhttp.open("POST", "checkDisconnessione.php?", true);
				xmlhttp.send();
			}, 1000);
			eliminaNotifiche();
			aggiungiNotifica("Hai l' accesso esclusivo a questa pagina. Nessuno può accedervi o aggiornare i dati.")
			document.getElementById('containerProgressBar').style.display="none";
			document.getElementById('push2').style.height="50px";
		}
	});
}
function startSessionGestione(cb)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			if( typeof cb === 'function' )
				cb(xmlhttp.responseText);
		}
	};
	xmlhttp.open("POST", "startSessionGestione.php?", true);
	xmlhttp.send();
}
function endSessionGestione()
{
	if(endSessionGestioneFlag==1)
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				if(this.responseText!="ok")
					console(this.responseText);
			}
		};
		xmlhttp.open("POST", "endSessionGestione.php?", true);
		xmlhttp.send();
	}
}
window.onbeforeunload = function() 
{
	endSessionGestione();
	logoutB();
};
setTimeout(function() 
{
	endSessionGestione();
	logoutB();
}, 1000 * 60 * 20);
//DRAG AND DROP---------------------------------------------------------------------------------------------------------------------------------------------------------------------
function allowDrop(ev,weekN) 
{
	ev.preventDefault();
	document.getElementById('containerOrdiniVER'+weekN).style.backgroundColor="#C8D2DC";
}
function dragLeave(ev,weekN)
{
	document.getElementById('containerOrdiniVER'+weekN).style.backgroundColor="#EBEBEB";
}
function blockDrop()
{
	
}
function drag(ev) 
{
	ev.dataTransfer.setData("div", ev.target.id);
	//draggedElement=ev.target;
	//draggedElement.style.visibility="hidden";
	var data = ev.dataTransfer.getData("div");
	document.getElementById('containerResiduoVER').style.border = '2px solid red';
	document.getElementById('containerResiduoVER').style.opacity ='0.7';
	var all = document.getElementsByClassName("containerOrdini");
	for (var i = 0; i < all.length; i++) 
	{
		all[i].style.border = '2px dashed blue';
		all[i].style.zIndex ='11';
		all[i].style.opacity ='0.7';
	}
	getScrollContainers();
}
function getScrollContainers()
{
	var scrollDownContainer=document.createElement("div");
	scrollDownContainer.setAttribute("id","scrollDownContainer");
	scrollDownContainer.setAttribute("ondragenter","scrollDownPage()");
	
	document.body.appendChild(scrollDownContainer);

	var scrollUpContainer=document.createElement("div");
	scrollUpContainer.setAttribute("id","scrollUpContainer");
	scrollUpContainer.setAttribute("ondragenter","scrollUpPage()");
	
	document.body.appendChild(scrollUpContainer);

	$("#scrollDownContainer").show(150,"swing");

	$("#scrollUpContainer").show(150,"swing");

	setTimeout(function()
	{
		$("#scrollDownContainer").css("display","flex");
		var i=document.createElement("i");
		i.setAttribute("class","fad fa-chevron-double-down");
		document.getElementById("scrollDownContainer").appendChild(i);
		var span=document.createElement("span");
		span.innerHTML="Trascina qui l'ordine per scrorrere in giu la pagina";
		document.getElementById("scrollDownContainer").appendChild(span);

		$("#scrollUpContainer").css("display","flex");
		var span=document.createElement("span");
		span.innerHTML="Trascina qui l'ordine per scrorrere in su la pagina";
		document.getElementById("scrollUpContainer").appendChild(span);
		var i=document.createElement("i");
		i.setAttribute("class","fad fa-chevron-double-up");
		document.getElementById("scrollUpContainer").appendChild(i);
	}, 150);
}
function scrollUpPage()
{
	window.scrollTo(0,0);
}
function scrollDownPage()
{
	/*var altezzeVER=[];
	var height=document.getElementById('residuoVER').offsetHeight;
	altezzeVER.push(height);
	for (let index = 1; index <= nWeeks; index++) 
	{
		var height=document.getElementById('ordiniVER'+index).offsetHeight;
		altezzeVER.push(height);
	}
	//var altezzeVER=[document.getElementById('residuoVER').offsetHeight,document.getElementById('ordiniVER1').offsetHeight,document.getElementById('ordiniVER2').offsetHeight,document.getElementById('ordiniVER3').offsetHeight,document.getElementById('ordiniVER4').offsetHeight,document.getElementById('ordiniVER5').offsetHeight];
	var largestVER = Math.max.apply(null, altezzeVER);
	window.scrollTo(0,largestVER);*/
	window.scrollTo(0,document.body.scrollHeight+10000000);
}
function removeScrollContainers()
{
	$("#scrollDownContainer").hide(150,"swing");
	$("#scrollUpContainer").hide(150,"swing");
	setTimeout(function(){ document.getElementById("scrollDownContainer").remove();document.getElementById("scrollUpContainer").remove(); }, 150);
}
function fixContainerStyle()
{
	//draggedElement.style.visibility="";
	//draggedElement=null;
	//counter=0;
	//cleanHoveredElements();
	document.getElementById('containerResiduoVER').style.border = '';
	document.getElementById('containerResiduoVER').style.opacity ='';
	var all = document.getElementsByClassName("containerOrdini");
	for (var i = 0; i < all.length; i++) 
	{
		all[i].style.border = '';
		all[i].style.zIndex ='';
		all[i].style.opacity ='';
		all[i].style.backgroundColor="#EBEBEB";
	}
}
function dragOverElementOrdine(ev,hoveredElement)
{
	/*if(draggedElement!=hoveredElement)
	{
		if(globalHoveredElement==null || globalHoveredElement!=hoveredElement)
		{
			triggerDragLeaveElementOrdine(ev,globalHoveredElement);
			globalHoveredElement=hoveredElement;

			var y = ev.clientY;
			var hoverPosition=y-hoveredElement.offsetTop;

			//if(hoveredElement.previousSibling.previousSibling != null && hoveredElement.previousSibling.previousSibling.className == "elementOrdine"  && hoveredElement.previousSibling.previousSibling.style.visibility == "hidden")
				//hoveredElement.style.marginTop="0px";
			//else

			//console.log("previous: "+hoveredElement.previousSibling.previousSibling.className+", visibility: "+hoveredElement.previousSibling.previousSibling.style.visibility)
			try
			{
				if(hoveredElement.previousSibling.previousSibling.style.visibility == "hidden")
				{
					hoveredElement.style.marginTop="";
				}
				else
					hoveredElement.style.marginTop="30px";
			}
			catch(e)
			{
				hoveredElement.style.marginTop="30px";
			}
			
		}
	}*/
}
function dragLeaveContainer(ev,container)
{
	/*counter--;
	if(counter==0)
	{
		var childrens=container.firstChild.children;
		for (var i = 0; i < childrens.length; i++)
		{
			var children=container.firstChild.children[i];
			if(children.className=="elementOrdine")
			{
				children.style.marginTop="";
				//console.log(children);
			}
		}
	}*/
}
/*function dragLeaveElementOrdine(ev,leavingElement)
{
	console.log("triggered");
	//leavingElement.style.marginTop="";
}*/
function triggerDragLeaveElementOrdine(ev,hoveredElement)
{
	/*try
	{
		hoveredElement.style.marginTop="";
	}
	catch(e){}*/
}
function cleanHoveredElements()
{
	/*globalHoveredElement=null;
	var all=document.getElementsByClassName("elementOrdine");
	for (var i = 0; i < all.length; i++) 
	{
		all[i].style.marginTop ='';
	}*/
}
function fixContainersHeight()
{
	var heights=[];
	var all=document.getElementsByClassName("containerOrdini");
	for (var i = 0; i < all.length; i++) 
	{
		heights.push(all[i].offsetHeight);
	}
	heights.push(document.getElementsByClassName("containerResiduo")[0].offsetHeight);

	var newHeight = Math.max.apply(null, heights);
	//newHeight=newHeight+50;

	var all=document.getElementsByClassName("containerOrdini");
	for (var i = 0; i < all.length; i++) 
	{
		all[i].style.height=newHeight+"px";
	}
	document.getElementsByClassName("containerResiduo")[0].style.height=newHeight+"px";
}
function drop(ev,weekNDD) 
{
	console.log("end");
	removeScrollContainers();
	//console.log(ev);
	//getOrdiniFuturi();

	var nElementiVER=[];
	var nElementi=document.getElementById('residuoVER').offsetHeight;
	nElementiVER.push(nElementi);
	for (let index = 1; index <= nWeeks; index++) 
	{
		var nElementi=document.getElementById('ordiniVER'+index).childElementCount;
		nElementiVER.push(nElementi);
	}
	//var nElementiVER=[document.getElementById('residuoVER').childElementCount,document.getElementById('ordiniVER1').childElementCount,document.getElementById('ordiniVER2').childElementCount,document.getElementById('ordiniVER3').childElementCount,document.getElementById('ordiniVER4').childElementCount,document.getElementById('ordiniVER5').childElementCount];
	var largestnElementi = Math.max.apply(null, nElementiVER);
	ev.preventDefault();
	var data = ev.dataTransfer.getData("div");

	document.getElementById('ordiniVER'+weekNDD).appendChild(document.getElementById(data));
	//fixContainersHeight();
	/*
	//------------------- test1
	var posizione=0;
	var fakePosizione=0;
	var elementOrdineChildrens=[];
	var childrens=document.getElementById('ordiniVER'+weekNDD).children;
	for (var i = 0; i < childrens.length; i++)
	{
		var children=document.getElementById('ordiniVER'+weekNDD).children[i];
		if(children.className=="elementOrdine")
			elementOrdineChildrens.push(children);
	}
	for (var i = 0; i < elementOrdineChildrens.length; i++)
	{
		try
		{
			//console.log(elementOrdineChildrens);
			var children=elementOrdineChildrens[i];
			if(children.id==globalHoveredElement.id)
			{
				posizione=i;
				fakePosizione=posizione*2;
			}
		}catch(e){}
	}
	if(fakePosizione==0)
	{
		var checkZeroPosition=false;
		var all=document.getElementsByClassName("elementOrdine");
		for (var i = 0; i < all.length; i++) 
		{
			if(all[i].style.marginTop !='')
				checkZeroPosition=true;
		}
		if(!checkZeroPosition)
		{
			fakePosizione=childrens.length;
			posizione=fakePosizione/2;
		}
	}*/
	/* //test2-----------------
	var posizione=0;
	var all=$('#ordiniVER'+weekNDD+' .elementOrdine');
	for (var i = 0; i < all.length; i++) 
	{
		if(all[i].getAttribute("ordine")==globalHoveredElement.getAttribute("ordine"))
		{
			posizione=i;
		}
	}
	posizione++;
	console.log(posizione);*/
	//console.log(globalHoveredElement);

	//document.getElementById('ordiniVER'+weekNDD).insertBefore(document.getElementById(data), document.getElementById('ordiniVER'+weekNDD).children[posizione]);
	//trovaRealePosizione(weekNDD,document.getElementById(data));
	//cleanHoveredElements();

	document.getElementById('containerResiduoVER').style.border = '';
	document.getElementById('containerResiduoVER').style.opacity ='';
	var all = document.getElementsByClassName("containerOrdini");
	for (var i = 0; i < all.length; i++) 
	{
		all[i].style.border = '';
		all[i].style.zIndex ='';
		all[i].style.opacity ='';
		all[i].style.backgroundColor="#EBEBEB";
	}
	setTimeout(function(){getTotali();}, 50);
	setTimeout(function(){getCapacitaProduttive();}, 60);
	//ev.target.appendChild(document.getElementById(data));
	//-------------------------------------------------------------------------------
	var element =document.getElementById(data);
	var docnum=element.childNodes[0].innerHTML;
	
	var idElement=data;
	idElement=idElement.slice(4);
	idElement=idElement.replace("elementOrdine", "");
	
	var targetWeekN=document.getElementById(data).parentNode.id;
	var weekN=targetWeekN.replace("ordiniVER", "");
	
	var weekDest=document.getElementById('week'+weekN).innerHTML;
	var anno=weekDest.substring(0, 4);
	weekDest=weekDest.slice(5);
	
	if(idElement=="Residuo")
	{
		var weekStart="Residuo";
	}
	else
	{
		var weekStart=data.slice(4);
		weekStart=weekStart.replace("elementOrdine", "");
		weekStart=weekStart.slice(4);
	}
	if(weekDest!=weekStart)
	{
		fixContainerDrop(largestnElementi);
		var n=getCount(document.getElementById("ordiniVER"+weekN), false)+999;
		//console.log(n);
		var newId=n+'elementOrdine'+anno+weekDest;
		//console.log("oldId: "+data);
		//console.log("newId: "+newId);
		document.getElementById(data).id = newId;

		var inputCollezione=document.getElementById(data+"collezione");
		inputCollezione.id=newId+"collezione";
		
		if(stazioneVisualizzata=="Verniciatura")
		{
			var fileModifica="modificaDateVerniciatura";
		}
		if(stazioneVisualizzata=="Montaggio")
		{
			var fileModifica="modificaDateMontaggio";
		}
		if(stazioneVisualizzata=="Punto punto")
		{
			var fileModifica="modificaDatePuntoPunto";
		}
		//console.log(fileModifica);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//window.alert(this.responseText);
				if(this.responseText!="ok")
				{
					window.alert(this.responseText);
					console.log(this.responseText);
				}
				else
				{
					fixContainersHeight()
					getOrdiniFuturi();
					//puntoPunto();
				}
			}
		};
		xmlhttp.open("POST", fileModifica+".php?docnum=" + docnum + "&weekDest=" + weekDest+"&anno="+anno+"&weekStart="+weekStart, true);
		xmlhttp.timeout = 25000; // Set timeout to 25 seconds (25000 milliseconds)
		xmlhttp.ontimeout = function () 
		{ 
			window.alert("timeout");
		}
		xmlhttp.send();

	}
	else
		console.log("stessa sett");
}
function trovaRealePosizione(settimana,elementOrdine)
{
	//console.log(elementOrdine.getAttribute("ordine"));
	var all=$('#ordiniVER'+settimana+' .elementOrdine');
	//var all=document.getElementById('ordiniVER'+settimana).childNodes;
	for (var i = 0; i < all.length; i++) 
	{
		if(all[i].getAttribute("ordine")==elementOrdine.getAttribute("ordine"))
		{
			console.log("posizione: "+i);
		}
	}
}
function getCount(parent, getChildrensChildren)
{
	var relevantChildren = 0;
	var children = parent.childNodes.length;
	for(var i=0; i < children; i++)
	{
		if(parent.childNodes[i].nodeType != 3)
		{
			if(getChildrensChildren)
			relevantChildren += getCount(parent.childNodes[i],true);
			relevantChildren++;
		}
	}
	return relevantChildren;
}
//--------------------------------------------------------------------------------------------------------------------
function apriPopupColori()
{
	document.getElementById('popupColori').style.height="330px";
	document.getElementById('popupColori').style.width="500px";
	setTimeout(function()
	{ 
		document.getElementById('header').style.opacity="0.2";
		document.getElementById('containerGestioneSettimane').style.opacity="0.2";
		document.getElementById('container').style.opacity="0.2";
		document.getElementById('footer').style.opacity="0.2";	
	}, 100);
	setTimeout(function()
	{ 
		document.getElementById('popupColori').style.opacity="1";
		//getColoriCollezioni();
	}, 200);
	dragElement(document.getElementById("popupColori"));
}
function chiudiPopupColori()
{
	newGridSpinner("Applico le modifiche","popupColoriContainer","","background:#12365A","");
	//document.getElementById('popupColoriContainer').innerHTML='<div class="sk-cube-grid" style="margin-left:130px;margin-top: 80px;width:24px;height:24px;display:inline-block;float:left;text-align:right"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div><div style="display:inline-block;float:right;margin-top: 82px;width:280px;text-align:left;">Applico le modifiche</div>';
	setTimeout(function()
	{ 
		location.reload();
	}, 2000);
}
function newGridSpinner(message,container,spinnerContainerStyle,spinnerStyle,messageStyle)
{
	document.getElementById(container).innerHTML='<div id="gridSpinnerContainer"  style="'+spinnerContainerStyle+'"><div  style="'+spinnerStyle+'" class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div><div id="messaggiSpinner" style="'+messageStyle+'">'+message+'</div></div>';
}
function apriPopupDettaglioOrdine(elementId,settimana)
{
	console.log(elementId);
	var element =document.getElementById(elementId);
	var docnum=element.childNodes[0].innerHTML;
	var MQ=element.childNodes[1].innerHTML;
	var BP=element.childNodes[2].innerHTML;
	var BA=element.childNodes[3].innerHTML;
	var P=element.childNodes[4].innerHTML;
	var C=element.childNodes[5].innerHTML;
	var A=element.childNodes[6].innerHTML;
	var TOT=element.childNodes[7].innerHTML;
	var DataC=element.childNodes[8].innerHTML;
	
	pdfPopupDettaglio(docnum);
	docnumDettaglio=docnum;
	
	document.getElementById('titoloPopupDettaglioOrdine').innerHTML="Dettaglio ordine "+docnum;
	
	var container = document.getElementById('popupDettaglioOrdineContainer');
	var tbl = document.createElement('table');
	tbl.setAttribute('id', 'myTableDettaglioOrdine');
	var tbdy = document.createElement('tbody');
	
	var tr = document.createElement('tr');
	var th = document.createElement('th');
	th.innerHTML="Parametro";
	tr.appendChild(th)
	var th = document.createElement('th');
	th.innerHTML="Valore";
	tr.appendChild(th)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Collezione";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=document.getElementById(elementId+'collezione').value;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Docnum";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=docnum;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Data consegna";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=DataC;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	if(stazioneVisualizzata=="Verniciatura")
		td.innerHTML='Mq<button class="btnDettaglioMq" onclick="getDettaglioMq('+docnum+')">Dettaglio<i class="far fa-info-circle" style="margin-left:10px"></i></button>';
	else
		td.innerHTML="Mq";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=MQ;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Basi portalavabo";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=BP;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Basi accostabili";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=BA;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Pensili";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=P;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Colonne";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=C;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Altro";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=A;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.innerHTML="Totale";
	tr.appendChild(td)
	var td = document.createElement('td');
	td.innerHTML=TOT;
	tr.appendChild(td)
	tbdy.appendChild(tr);
	
	tbl.appendChild(tbdy);
	container.innerHTML=tbl.outerHTML;
	
	document.getElementById('popupDettaglioOrdine').style.height="330px";
	document.getElementById('popupDettaglioOrdine').style.width="500px";
	setTimeout(function()
	{ 
		document.getElementById('header').style.opacity="0.2";
		document.getElementById('containerGestioneSettimane').style.opacity="0.2";
		document.getElementById('container').style.opacity="0.2";
		document.getElementById('footer').style.opacity="0.2";	
	}, 100);
	setTimeout(function()
	{ 
		document.getElementById('popupDettaglioOrdine').style.opacity="1";
	}, 200);
	dragElement(document.getElementById("popupDettaglioOrdine"));
}
function getDettaglioMq(docnum)
{
	var stazione=document.getElementById('selectVER').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			//console.log(this.responseText);
			if(this.responseText.indexOf("error")>-1)
			{
				Swal.fire
				({
					type: 'error',
					title: 'Errore',
					text: "Se il problema persiste contatta l' amministratore"
				})
			}
			else
			{
				Swal.fire
				({
					width:"800px",
					title: 'Dettaglio mq',
					html: this.responseText,
					confirmButtonText: 'Ok'
				});
			}
		}
	};
	xmlhttp.open("POST", "getDettaglioMq.php?docnum="+docnum+"&stazione="+stazione, true);
	xmlhttp.send();
}
function setCorrezioneMq(ItemCode,oldValue,newValue)
{
	if(oldValue!=newValue)
	{
		document.getElementById("resultCorreggiMq"+ItemCode).innerHTML="";
		$.post("setCorrezioneMq.php",
		{
			ItemCode,
			oldValue,
			newValue
		},
		function(response, status)
		{
			if(status=="success")
			{
				if(response.indexOf("ok")>-1)
					document.getElementById("resultCorreggiMq"+ItemCode).innerHTML='<i title="Mq modificati" class="far fa-check-circle" style="color:green;"></i>';
				else
					document.getElementById("resultCorreggiMq"+ItemCode).innerHTML='<i title="Errore" class="far fa-exclamation-circle" style="color:red;"></i>';
			}
			else
				console.log(status);
		});
	}
}
function chiudiPopupDettaglioOrdine()
{
	document.getElementById('popupDettaglioOrdine').style.height='0px';
	document.getElementById('popupDettaglioOrdine').style.width='0px';
	document.getElementById('header').style.opacity="";
	document.getElementById('containerGestioneSettimane').style.opacity="";
	document.getElementById('container').style.opacity="";
	document.getElementById('footer').style.opacity="";
	setTimeout(function()
	{ 
		document.getElementById('header').style.opacity='1';
		document.getElementById('containerGestioneSettimane').style.opacity="1";
		document.getElementById('container').style.opacity='1';
		document.getElementById('footer').style.opacity='1';
	}, 100);
}
function dragElement(elmnt) 
{
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	function dragMouseDown(e) 
	{
		//document.getElementById('popupColoriheader').style.cursor='-webkit-grabbing';
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
		//document.getElementById('popupColoriheader').style.cursor='-webkit-grab';
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
function modificaColoriCollezioni(id)
{
	var colore=document.getElementById('colonnaColore'+id).value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			if(this.responseText!="ok")
			{
				document.getElementById('risultato'+id).innerHTML='<div id="warning" style="" title="'+this.responseText+'"></div>';
			}
			else
			{
				document.getElementById('risultato'+id).innerHTML='<div id="success" style="" title="Colore modificato"></div>';
			}
		}
	};
	xmlhttp.open("POST", "modificaColoriCollezioni.php?colore="+colore+"&id="+id, true);
	xmlhttp.send();
}
function salvaStato()
{
	var nomeSalvataggio = prompt("Assegna un nome al salvataggio", "Salvataggio "+stazioneVisualizzata+"");
	if (nomeSalvataggio == "") 
	{
		window.alert("Nome vuoto.");
		salvaStato();
	} 
	if (nomeSalvataggio == null) 
	{
		
	} 
	if (nomeSalvataggio != null && nomeSalvataggio!="")  
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() 
		{//console.log(this.responseText);
			if (this.readyState == 4 && this.status == 200) 
			{
				if(this.responseText=="ok")
				{
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							if(this.responseText!="ok")
							{
								window.alert(this.responseText);
							}
						}
					};
					xmlhttp.open("POST", "salvaStato.php?stazione="+stazioneVisualizzata+"&nomeSalvataggio="+nomeSalvataggio, true);
					xmlhttp.send();
				}
				else
				{
					window.alert("Nome gia in uso. Riprova");
					salvaStato();
				}
			}
		};
		xmlhttp.open("POST", "checkNome.php?stazione="+stazioneVisualizzata+"&nomeSalvataggio="+nomeSalvataggio, true);
		xmlhttp.send();
	}
}
function autoSalvaStato()
{
	var suggestedWeek=document.getElementById("week3").innerHTML.replace("_","");
	
	var week1=document.getElementById("week1").innerHTML.replace("_","");
	var week2=document.getElementById("week2").innerHTML.replace("_","");
	var week4=document.getElementById("week4").innerHTML.replace("_","");
	var week5=document.getElementById("week5").innerHTML.replace("_","");
	
	var select=document.createElement("select");
	select.setAttribute("id","selectSettimanaSalvataggioAutomatico");
	
	var option=document.createElement("option");
	option.setAttribute("value",suggestedWeek);
	option.innerHTML=suggestedWeek;
	select.appendChild(option);
	
	var option=document.createElement("option");
	option.setAttribute("value",week1);
	option.innerHTML=week1;
	select.appendChild(option);
	
	var option=document.createElement("option");
	option.setAttribute("value",week2);
	option.innerHTML=week2;
	select.appendChild(option);
	
	var option=document.createElement("option");
	option.setAttribute("value",week4);
	option.innerHTML=week4;
	select.appendChild(option);
	
	var option=document.createElement("option");
	option.setAttribute("value",week5);
	option.innerHTML=week5;
	select.appendChild(option);
	
	Swal.fire
	({
		type: 'question',
		title: 'Seleziona la settimana di cui stai salvando lo stato',
		html : select.outerHTML,
		allowOutsideClick:false,
		allowEscapeKey:false
	}).then((result) => 
	{
		if (result.value)
		{
			swal.close();
			var week=document.getElementById("selectSettimanaSalvataggioAutomatico").value;
			if(week!=null && week!='')
			{
				console.log(week);
				if(stazioneVisualizzata=="Verniciatura")
				{
					var stazione=document.getElementById('selectVER').value;
				}
				if(stazioneVisualizzata=="Montaggio")
				{
					var stazione=document.getElementById('selectMON').value;
				}
				if(stazioneVisualizzata=="Punto punto")
				{
					var stazione="PTO_PTO";
				}
				$.post("autoSalvaStato.php",
				{
					stazione,
					stazioneVisualizzata,
					week
				},
				function(response, status)
				{
					if(status=="success")
					{
						console.log(response);
						if(response.indexOf("error")>-1)
						{
							Swal.fire
							({
								type: 'error',
								title: 'Errore',
								text: "Impossibile salvare automaticamente lo stato. Segnala il problema all' amministratore"
							});
						}
					}
					else
						console.log(status);
				});
			}
		}
		else
			swal.close();
	})

}
function pdfPopupDettaglio(docnum)
{
	//var server_adress=document.getElementById("server_adress");
	document.getElementById('btnPdfPopupDettaglioOrdine').setAttribute("href","http://remote.oasisgroup.it/oasisPdfOrdini/pdf_ordini/H"+docnum+".pdf");
	//document.getElementById('btnPdfPopupDettaglioOrdine').setAttribute("href","./pdf_ordini/H"+docnum+".pdf");
}
function apriPopupCapacitaProduttiva(week)
{
	document.getElementById('popupCapacitaProduttiva').style.height="330px";
	document.getElementById('popupCapacitaProduttiva').style.width="500px";
	setTimeout(function()
	{ 
		document.getElementById('header').style.opacity="0.2";
		document.getElementById('container').style.opacity="0.2";
		document.getElementById('footer').style.opacity="0.2";	
		document.getElementById('containerGestioneSettimane').style.opacity="0.2";
	}, 100);
	setTimeout(function()
	{ 
		document.getElementById('popupCapacitaProduttiva').style.opacity="1";	
	}, 200);
	dragElement(document.getElementById("popupCapacitaProduttiva"));
	week=week.replace("_","");
	getInputCapacitaProduttiva(week);
}
function chiudiPopupCapacitaProduttiva()
{
	document.getElementById('popupCapacitaProduttiva').style.height='0px';
	document.getElementById('popupCapacitaProduttiva').style.width='0px';
	document.getElementById('header').style.opacity="";
	document.getElementById('container').style.opacity="";
	document.getElementById('footer').style.opacity="";
	setTimeout(function()
	{ 
		document.getElementById('header').style.opacity='1';
		document.getElementById('container').style.opacity='1';
		document.getElementById('footer').style.opacity='1';
		document.getElementById('containerGestioneSettimane').style.opacity="1";
	}, 100);
}
function getInputCapacitaProduttiva(week)
{
	document.getElementById('tabellaPopupCapacitaProduttiva').innerHTML="";
	if(stazioneVisualizzata=="Verniciatura")
	{
		var stazione=document.getElementById('selectVER').value;
		var um="mq";
	}
	if(stazioneVisualizzata=="Montaggio")
	{
		var stazione=document.getElementById('selectMON').value;
		var um="pezzi";
	}
	if(stazioneVisualizzata=="Punto punto")
	{
		var stazione="PTO_PTO";
		var um="pezzi";
	}
	weekCapacitaProduttiva=week;
	document.getElementById('tabellaPopupCapacitaProduttiva').innerHTML="<div class='boxCapacitaProduttiva'><b>Stazione:</b> "+stazione+"</div><div class='boxCapacitaProduttiva'><b>Settimana:</b> "+week+"</div><div class='boxCapacitaProduttiva'><input type='number' id='inputCapacitaProduttiva' class='inputCapacitaProduttiva' placeholder='Capacita produttiva' /></div><div class='boxCapacitaProduttiva'><b>Unita di misura:</b> "+um+"</div>";
}
function confermaCapacitaProduttiva()
{
	if(stazioneVisualizzata=="Verniciatura")
	{
		var stazione=document.getElementById('selectVER').value;
		var um="mq";
	}
	if(stazioneVisualizzata=="Montaggio")
	{
		var stazione=document.getElementById('selectMON').value;
		var um="pezzi";
	}
	if(stazioneVisualizzata=="Punto punto")
	{
		var stazione="PTO_PTO";
		var um="pezzi";
	}
	var capacitaProduttiva=document.getElementById('inputCapacitaProduttiva').value;
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			if(this.responseText!="ok")
			{
				document.getElementById('tabellaPopupCapacitaProduttiva').innerHTML=this.responseText;
			}
			else
			{
				document.getElementById('tabellaPopupCapacitaProduttiva').innerHTML='<div class="sk-cube-grid" style="margin-left:130px;margin-top: 50px;width:24px;height:24px;display:inline-block;float:left;text-align:right"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div><div style="display:inline-block;float:right;margin-top: 52px;width:280px;text-align:left;">Applico le modifiche</div>';
				setTimeout(function()
				{ 
					location.reload();
				}, 2000);
			}
		}
	};
	xmlhttp.open("POST", "confermaCapacitaProduttiva.php?stazione="+stazione+"&um="+um+"&week="+weekCapacitaProduttiva+"&capacitaProduttiva="+capacitaProduttiva, true);
	xmlhttp.send();
}
function stampaPopupDettaglio()
{
	var stazione="";
	if(stazioneVisualizzata=="Verniciatura")
	{
		var stazione=document.getElementById('selectVER').value;
	}
	if(stazioneVisualizzata=="Punto punto")
	{
		var stazione="FORA";
	}
	if(stazioneVisualizzata=="Montaggio")
	{
		//var stazione=document.getElementById('selectMON').value;
		var stazione="";
		window.alert("Stampa temporaneamente disabilitata per la stazione montaggio");
	}
	if(stazione!="")
	{
		document.getElementById('docnumStampa').value=docnumDettaglio;
		document.getElementById('stazioneStampa').value=stazione;
		document.getElementById('formStampaOrdine').submit();
	}
}
function stampaSettimana(week)
{
	if(week!="Stampa sett.")
	{
		newCircleSpinner("Creazione file in corso...");
		week = week.replace("_", "");
		if(stazioneVisualizzata=="Montaggio")
		{
			var stazione=document.getElementById('selectMON').value;
			var container=document.createElement("div");
			container.setAttribute("style","float:left;display:inline-block;width:100%;box-sizing:border-box;padding-left:120px;padding-right:120px;");
			var label=document.createElement("span");
			label.setAttribute("style","float:right;display:inline-block;margin-left:15px;");
			label.innerHTML="Stampa schede ordini";
			var checkbox=document.createElement("input");
			checkbox.setAttribute("type","checkbox");
			label.setAttribute("style","float:left;display:inline-block;font-size:14px");
			checkbox.setAttribute("id","checkboxStampaordineStampaSettimana");
			container.appendChild(checkbox);
			container.appendChild(label);
			Swal.fire
			({
				type: 'question',
				html: container.outerHTML,
				confirmButtonText:'Continua'
			}).then((result) => 
			{
				if (result.value)
				{
					var stampaordine= document.getElementById("checkboxStampaordineStampaSettimana").checked;
					$.post("generaPdfSettimana.php",
					{
						week,
						stazione,
						stampaordine
					},
					function(response, status)
					{
						if(status=="success")
						{
							removeCircleSpinner();
							if(response.indexOf("generato1")>-1)
							{
								document.getElementById('scaricaPdfSettimanaFormSettimana').value=week;
								document.getElementById('scaricaPdfSettimanaFormStazione').value=stazione;
								document.getElementById('scaricaPdfSettimanaForm').submit();
								autoSalvaStato();
							}
							if(response.indexOf("generato0")>-1)
							{
								Swal.fire
								({
									type: 'error',
									title: 'Errore',
									text: "Impossibile generare il file. Se il problema persiste contatta l' amministratore"
								})
							}
							if(response.indexOf("error")>-1 || response.indexOf("fatal")>-1)
							{
								Swal.fire
								({
									type: 'error',
									title: 'Errore generale',
									text: "Se il problema persiste contatta l' amministratore"
								})
							}
							console.log(response);
						}
						else
							console.log(status);
					});
				}
				else
					swal.close();
			})
		}
		else
		{
			if(stazioneVisualizzata=="Verniciatura")
			{
				var stazione=document.getElementById('selectVER').value;
			}
			if(stazioneVisualizzata=="Punto punto")
			{
				var stazione="PTO_PTO";
			}
			var stampaordine=true;
			$.post("generaPdfSettimana.php",
			{
				week,
				stazione,
				stampaordine
			},
			function(response, status)
			{
				if(status=="success")
				{
					removeCircleSpinner();
					if(response.indexOf("generato1")>-1)
					{
						document.getElementById('scaricaPdfSettimanaFormSettimana').value=week;
						document.getElementById('scaricaPdfSettimanaFormStazione').value=stazione;
						document.getElementById('scaricaPdfSettimanaForm').submit();
						autoSalvaStato();
					}
					if(response.indexOf("generato0")>-1)
					{
						Swal.fire
						({
							type: 'error',
							title: 'Errore',
							text: "Impossibile generare il file. Se il problema persiste contatta l' amministratore"
						})
					}
					if(response.indexOf("error")>-1 || response.indexOf("fatal")>-1)
					{
						Swal.fire
						({
							type: 'error',
							title: 'Errore generale',
							text: "Se il problema persiste contatta l' amministratore"
						})
					}
					console.log(response);
				}
				else
					console.log(status);
			});
		}
		document.getElementById('selectWEEK').value="Stampa sett.";
	}
}
function getStampaordine()
{
	var container=document.createElement("div");
	container.setAttribute("style","float:left;display:inline-block;width:100%;box-sizing:border-box;padding-left:120px;padding-right:120px;");
	var label=document.createElement("span");
	label.setAttribute("style","float:right;display:inline-block;margin-left:15px;");
	label.innerHTML="Stampa schede ordini";
	var checkbox=document.createElement("input");
	checkbox.setAttribute("type","checkbox");
	label.setAttribute("style","float:left;display:inline-block;font-size:14px");
	checkbox.setAttribute("id","checkboxStampaordineStampaSettimana");
	container.appendChild(checkbox);
	container.appendChild(label);
	Swal.fire
	({
		type: 'question',
		html: container.outerHTML,
		confirmButtonText:'Continua'
	}).then((result) => 
	{
		if (result.value)
		{
			return document.getElementById("checkboxStampaordineStampaSettimana").checked;
		}
		else
			swal.close();
	})
}
function stampaPDFSettimana(week)
{
	window.alert("Funzione temporaneamente non disponibile");
	document.getElementById('selectWEEKPDF').value="Stampa PDF";
	/*if(week!="Stampa PDF")
	{
		if(stazioneVisualizzata=="Verniciatura")
		{
			var stazione=document.getElementById('selectVER').value;
		}
		if(stazioneVisualizzata=="Punto punto")
		{
			var stazione="PTO_PTO";
		}
		if(stazioneVisualizzata=="Montaggio")
		{
			var stazione=document.getElementById('selectMON').value;
		}
		document.getElementById('selectWEEKPDF').value="Stampa PDF";
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log(this.responseText);
				//var ordini = this.responseText.split("|");
				//var nOrdini = ordini.length-1;
				//for (var i = 0; i < nOrdini; i++) 
				//{
				//	console.log(ordini[i]);
				//	pdfPopupDettaglio(ordini[i]);
				//	document.getElementById('btnPdfPopupDettaglioOrdine').click();
					//printJS(ordini[i]);
				//}
			}
		};
		xmlhttp.open("POST", "stampaPDFSettimana.php?week="+week+"&stazione="+stazione, true);
		xmlhttp.send();
	}*/
}
function forzaDisconnessione(username)
{
	if(confirm("Sei sicuro di voler disconettere forzatamente l' utente ["+username+"] ?"))
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				if(this.responseText!="ok")
				{
					window.alert(this.responseText);
				}
				else
				{
					location.reload();
				}
			}
		};
		xmlhttp.open("POST", "forzaDisconnessione.php?username="+username, true);
		xmlhttp.send();
	}
}
function getOrdiniFuturi()
{
	document.getElementById("inputTextOrdine").value="";
	document.getElementById("containerOrdineFuturo").innerHTML="";
	if(stazioneVisualizzata=="Verniciatura")
	{
		var stazione=document.getElementById('selectVER').value;
	}
	if(stazioneVisualizzata=="Montaggio")
	{
		var stazione=document.getElementById('selectMON').value;
	}
	if(stazioneVisualizzata=="Punto punto")
	{
		var stazione="PTO_PTO";
	}
	var lastWeek=parseInt(document.getElementById("week5").innerHTML.replace("_",""));
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			document.getElementById("listaOrdini").innerHTML=this.responseText;
		}
	};
	xmlhttp.open("POST", "getOrdiniFuturi.php?stazione="+stazione+"&stazioneVisualizzata="+stazioneVisualizzata+"&lastWeek="+lastWeek, true);
	xmlhttp.send();
}
function checkCercaOrdine(ordine)
{
	if(ordine.length==8)
	{
		if(checkOrdine(ordine))
		{
			if(stazioneVisualizzata=="Verniciatura")
			{
				var stazione=document.getElementById('selectVER').value;
			}
			if(stazioneVisualizzata=="Montaggio")
			{
				var stazione=document.getElementById('selectMON').value;
			}
			if(stazioneVisualizzata=="Punto punto")
			{
				var stazione="PTO_PTO";
			}
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					//var width = document.getElementsByClassName('elementOrdine')[0].offsetWidth+20;
					//document.getElementById("containerOrdineFuturo").style.width=width;
					document.getElementById("containerOrdineFuturo").innerHTML=this.responseText;
				}
			};
			xmlhttp.open("POST", "getElementOrdineByDocnum.php?stazione="+stazione+"&stazioneVisualizzata="+stazioneVisualizzata+"&docnum="+ordine, true);
			xmlhttp.send();
		}
		else
		{
			window.alert("Codice non valido");
			document.getElementById("inputTextOrdine").value="";
			document.getElementById("containerOrdineFuturo").innerHTML="";
		}
	}
	else
		window.alert("Codice non valido");
}
function checkOrdine(ordine)
{
	var ordini=[];
	var all=document.getElementById("listaOrdini").childNodes;
	for (var i = 0; i < all.length; i++) 
	{
		ordini.push(all[i].value);
	}
	if(ordini.indexOf(ordine)!=-1)
		return true;
	return false;
}
function scaricaExcelWeeks()
{
	/*swal("Caricamento in corso...","•••", 
	{
		buttons: [false],
		html:'<div class="loader"></div>'
	});*/
	Swal.fire({
		title: 'Caricamento in corso...',
		buttons: [false],
		html:'<div class="loader"></div>'
	})
	
	if(stazioneVisualizzata=="Verniciatura")
	{
		var stazione=document.getElementById('selectVER').value;
	}
	if(stazioneVisualizzata=="Montaggio")
	{
		var stazione=document.getElementById('selectMON').value;
	}
	if(stazioneVisualizzata=="Punto punto")
	{
		var stazione="PTO_PTO";
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			document.getElementById("scaricaExcelWeeksContainer").innerHTML=this.responseText;
			endSessionGestioneFlag=0;
			tableToExcel('excelExportTable');
			swal.close()
			setTimeout(function(){ endSessionGestioneFlag=1; }, 3000);
		}
	};
	xmlhttp.open("POST", "scaricaExcelWeeks.php?stazione="+stazione, true);
	xmlhttp.send();
}