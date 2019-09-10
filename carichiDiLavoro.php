<?php
	include "Session.php";
	include "connessione.php";
	include "connessionePDO.php";
	
	$pageName="Carichi di lavoro";

	if(!$conn || !$connPDO)
		die("Errore: impossibile connettersi al server SQL");
	
	$week=date('W', time());
	$year=date('Y', time());
	$week--;
	$week=$year.$week;
		
	//PTO_PTO------------------------------------------------------------------------------------------------------------------------------------------------------------------	
		
	$dataPoints1 = array();
	$dataPoints2 = array();	
	
	$handle1 = $connPDO->prepare('SELECT TOP(12) settimana AS x,ordini as y FROM grafico_punto_punto WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle1->execute(); 
    $result1 = $handle1->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result1 as $row1)
	{
        array_push($dataPoints1, array("label"=> $row1->x, "y"=> $row1->y));
    }
	
	$handle2 = $connPDO->prepare('SELECT TOP(12) settimana AS x,pezzi as y FROM grafico_punto_punto WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle2->execute(); 
    $result2 = $handle2->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result2 as $row2)
	{
        array_push($dataPoints2, array("label"=> $row2->x, "y"=> $row2->y));
    }
	
	//VERNICIATURA-------------------------------------------------------------------------------------------------------------------------------------------------------------	
	
	$dataPoints3 = array();
	$dataPoints4 = array();
	$dataPoints5 = array();
	$dataPoints11 = array();
	$dataPoints12 = array();
	$dataPoints13 = array();
	
	$handle3 = $connPDO->prepare('SELECT TOP(12) settimana AS x,ordini as y FROM grafico_verniciatura_cab_lac WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle3->execute(); 
    $result3 = $handle3->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result3 as $row3)
	{
        array_push($dataPoints3, array("label"=> $row3->x, "y"=> $row3->y));
    }
	
	$handle4 = $connPDO->prepare('SELECT TOP(12) settimana AS x,mq as y FROM grafico_verniciatura_cab_lac WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle4->execute(); 
    $result4 = $handle4->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result4 as $row4)
	{
        array_push($dataPoints4, array("label"=> $row4->x, "y"=> $row4->y));
    }
	
	$handle5 = $connPDO->prepare('SELECT TOP(12) settimana AS x,pezzi as y FROM grafico_verniciatura_cab_lac WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle5->execute(); 
    $result5 = $handle5->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result5 as $row5)
	{
        array_push($dataPoints5, array("label"=> $row5->x, "y"=> $row5->y));
    }
	
	//---------------------------------------
	
	$handle11 = $connPDO->prepare('SELECT TOP(12) settimana AS x,ordini as y FROM grafico_verniciatura_cab_acr WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle11->execute(); 
    $result11 = $handle11->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result11 as $row11)
	{
        array_push($dataPoints11, array("label"=> $row11->x, "y"=> $row11->y));
    }
	
	$handle12 = $connPDO->prepare('SELECT TOP(12) settimana AS x,mq as y FROM grafico_verniciatura_cab_acr WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle12->execute(); 
    $result12 = $handle12->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result12 as $row12)
	{
        array_push($dataPoints12, array("label"=> $row12->x, "y"=> $row12->y));
    }
	
	$handle13 = $connPDO->prepare('SELECT TOP(12) settimana AS x,pezzi as y FROM grafico_verniciatura_cab_acr WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle13->execute(); 
    $result13 = $handle13->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result13 as $row13)
	{
        array_push($dataPoints13, array("label"=> $row13->x, "y"=> $row13->y));
    }
	
	//MONTAGGIO-------------------------------------------------------------------------------------------------------------------------------------------------------------	
		
	$dataPoints14 = array();
	$dataPoints15 = array();
	$dataPoints16 = array();
	$dataPoints17 = array();
	$dataPoints18 = array();
	$dataPoints19 = array();
	$dataPoints20 = array();
	$dataPoints21 = array();
	$dataPoints22 = array();
	$dataPoints23 = array();
	$dataPoints24 = array();
	$dataPoints25 = array();
	$dataPoints26 = array();
	$dataPoints27 = array();
	$dataPoints28 = array();
	$dataPoints29 = array();
	$dataPoints30 = array();
	$dataPoints31 = array();
	$dataPoints32 = array();
	$dataPoints33 = array();
	$dataPoints34 = array();
	$dataPoints35 = array();
	$dataPoints36 = array();
	$dataPoints37 = array();
		
	$handle14 = $connPDO->prepare('SELECT TOP(6) settimana AS x,nOrdini as y FROM grafico_montaggi_mnt_aca WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle14->execute(); 
    $result14 = $handle14->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result14 as $row14)
	{
        array_push($dataPoints14, array("label"=> $row14->x, "y"=> $row14->y));
    }	
	
	$handle15 = $connPDO->prepare('SELECT TOP(6) settimana AS x,basi_portalavabo as y FROM grafico_montaggi_mnt_aca WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle15->execute(); 
    $result15 = $handle15->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result15 as $row15)
	{
        array_push($dataPoints15, array("label"=> $row15->x, "y"=> $row15->y));
    }	
	
	$handle16 = $connPDO->prepare('SELECT TOP(6) settimana AS x,basi_accostabili as y FROM grafico_montaggi_mnt_aca WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle16->execute(); 
    $result16 = $handle16->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result16 as $row16)
	{
        array_push($dataPoints16, array("label"=> $row16->x, "y"=> $row16->y));
    }	
	
	$handle17 = $connPDO->prepare('SELECT TOP(6) settimana AS x,colonne as y FROM grafico_montaggi_mnt_aca WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle17->execute(); 
    $result17 = $handle17->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result17 as $row17)
	{
        array_push($dataPoints17, array("label"=> $row17->x, "y"=> $row17->y));
    }	
	
	$handle18 = $connPDO->prepare('SELECT TOP(6) settimana AS x,pensili as y FROM grafico_montaggi_mnt_aca WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle18->execute(); 
    $result18 = $handle18->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result18 as $row18)
	{
        array_push($dataPoints18, array("label"=> $row18->x, "y"=> $row18->y));
    }	
	
	$handle19 = $connPDO->prepare('SELECT TOP(6) settimana AS x,altro as y FROM grafico_montaggi_mnt_aca WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle19->execute(); 
    $result19 = $handle19->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result19 as $row19)
	{
        array_push($dataPoints19, array("label"=> $row19->x, "y"=> $row19->y));
    }	
	
	//---------------------------------------
	
	$handle20 = $connPDO->prepare('SELECT TOP(6) settimana AS x,nOrdini as y FROM grafico_montaggi_mnt_home WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle20->execute(); 
    $result20 = $handle20->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result20 as $row20)
	{
        array_push($dataPoints20, array("label"=> $row20->x, "y"=> $row20->y));
    }	
	
	$handle21 = $connPDO->prepare('SELECT TOP(6) settimana AS x,basi_portalavabo as y FROM grafico_montaggi_mnt_home WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle21->execute(); 
    $result21 = $handle21->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result21 as $row21)
	{
        array_push($dataPoints21, array("label"=> $row21->x, "y"=> $row21->y));
    }	
	
	$handle22 = $connPDO->prepare('SELECT TOP(6) settimana AS x,basi_accostabili as y FROM grafico_montaggi_mnt_home WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle22->execute(); 
    $result22 = $handle22->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result22 as $row22)
	{
        array_push($dataPoints22, array("label"=> $row22->x, "y"=> $row22->y));
    }	
	
	$handle23 = $connPDO->prepare('SELECT TOP(6) settimana AS x,colonne as y FROM grafico_montaggi_mnt_home WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle23->execute(); 
    $result23 = $handle23->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result23 as $row23)
	{
        array_push($dataPoints23, array("label"=> $row23->x, "y"=> $row23->y));
    }	
	
	$handle24 = $connPDO->prepare('SELECT TOP(6) settimana AS x,pensili as y FROM grafico_montaggi_mnt_home WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle24->execute(); 
    $result24 = $handle24->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result24 as $row24)
	{
        array_push($dataPoints24, array("label"=> $row24->x, "y"=> $row24->y));
    }	
	
	$handle25 = $connPDO->prepare('SELECT TOP(6) settimana AS x,altro as y FROM grafico_montaggi_mnt_home WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle25->execute(); 
    $result25 = $handle25->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result25 as $row25)
	{
        array_push($dataPoints25, array("label"=> $row25->x, "y"=> $row25->y));
    }	
	
	//---------------------------------------
	
	$handle26 = $connPDO->prepare('SELECT TOP(6) settimana AS x,nOrdini as y FROM grafico_montaggi_mnt_lut WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle26->execute(); 
    $handle26 = $handle26->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($handle26 as $row26)
	{
        array_push($dataPoints26, array("label"=> $row26->x, "y"=> $row26->y));
    }	
	
	$handle27 = $connPDO->prepare('SELECT TOP(6) settimana AS x,basi_portalavabo as y FROM grafico_montaggi_mnt_lut WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle27->execute(); 
    $result27 = $handle27->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result27 as $row27)
	{
        array_push($dataPoints27, array("label"=> $row27->x, "y"=> $row27->y));
    }	
	
	$handle28 = $connPDO->prepare('SELECT TOP(6) settimana AS x,basi_accostabili as y FROM grafico_montaggi_mnt_lut WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle28->execute(); 
    $result28 = $handle28->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result28 as $row28)
	{
        array_push($dataPoints28, array("label"=> $row28->x, "y"=> $row28->y));
    }	
	
	$handle29 = $connPDO->prepare('SELECT TOP(6) settimana AS x,colonne as y FROM grafico_montaggi_mnt_lut WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle29->execute(); 
    $result29 = $handle29->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result29 as $row29)
	{
        array_push($dataPoints29, array("label"=> $row29->x, "y"=> $row29->y));
    }	
	
	$handle30 = $connPDO->prepare('SELECT TOP(6) settimana AS x,pensili as y FROM grafico_montaggi_mnt_lut WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle30->execute(); 
    $result30 = $handle30->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result30 as $row30)
	{
        array_push($dataPoints30, array("label"=> $row30->x, "y"=> $row30->y));
    }	
	
	$handle31 = $connPDO->prepare('SELECT TOP(6) settimana AS x,altro as y FROM grafico_montaggi_mnt_lut WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle31->execute(); 
    $result31 = $handle31->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result31 as $row31)
	{
        array_push($dataPoints31, array("label"=> $row31->x, "y"=> $row31->y));
    }	
	
	//---------------------------------------
	
	$handle32 = $connPDO->prepare('SELECT TOP(6) settimana AS x,nOrdini as y FROM grafico_montaggi_mnt_mast WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle32->execute(); 
    $result32 = $handle32->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result32 as $row32)
	{
        array_push($dataPoints32, array("label"=> $row32->x, "y"=> $row32->y));
    }	
	
	$handle33 = $connPDO->prepare('SELECT TOP(6) settimana AS x,basi_portalavabo as y FROM grafico_montaggi_mnt_mast WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle33->execute(); 
    $result33 = $handle33->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result33 as $row33)
	{
        array_push($dataPoints33, array("label"=> $row33->x, "y"=> $row33->y));
    }	
	
	$handle34 = $connPDO->prepare('SELECT TOP(6) settimana AS x,basi_accostabili as y FROM grafico_montaggi_mnt_mast WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle34->execute(); 
    $result34 = $handle34->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result34 as $row34)
	{
        array_push($dataPoints34, array("label"=> $row34->x, "y"=> $row34->y));
    }	
	
	$handle35 = $connPDO->prepare('SELECT TOP(6) settimana AS x,colonne as y FROM grafico_montaggi_mnt_mast WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle35->execute(); 
    $result35 = $handle35->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result35 as $row35)
	{
        array_push($dataPoints35, array("label"=> $row35->x, "y"=> $row35->y));
    }	
	
	$handle36 = $connPDO->prepare('SELECT TOP(6) settimana AS x,pensili as y FROM grafico_montaggi_mnt_mast WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle36->execute(); 
    $result36 = $handle36->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result36 as $row36)
	{
        array_push($dataPoints36, array("label"=> $row36->x, "y"=> $row36->y));
    }	
	
	$handle37 = $connPDO->prepare('SELECT TOP(6) settimana AS x,altro as y FROM grafico_montaggi_mnt_mast WHERE settimana>='.$week.' ORDER by settimana'); 
    $handle37->execute(); 
    $result37 = $handle37->fetchAll(\PDO::FETCH_OBJ);
		
    foreach($result37 as $row37)
	{
        array_push($dataPoints37, array("label"=> $row37->x, "y"=> $row37->y));
    }	
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
			<link rel="stylesheet" href="css/styleV33.css" />
			<script src="struttura.js"></script>
			<script>
				var tipoG;
				var stazioneG;
				var weekG;
				var nSettimane;
				var grafico;
				var dettaglio;
				var updateSettimane=[];
				
				/*function startSessionCarichi(cb)
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
					xmlhttp.open("POST", "startSessionCarichi.php?", true);
					xmlhttp.send();
				}*/
			
				function resetStyle()
				{
					grafico="";
					document.getElementById('comandiTabelle').style.height="0px";
					document.getElementById('btnLeft').style.display="none";
					document.getElementById('btnRight').style.display="none";
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
					xmlhttp.open("POST", "caricoPuntoPunto.php?nSettimane="+nSettimane, true);
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
					xmlhttp.open("POST", "caricoVerniciatura.php?nSettimane="+nSettimane, true);
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
					xmlhttp.open("POST", "caricoMontaggio.php?nSettimane="+nSettimane, true);
					xmlhttp.send();
				}
				function riempiTabelle()
				{
					nSettimane=document.getElementById("nSettimane").value;
					document.getElementById('inner').innerHTML='<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
					//document.getElementById('containerProgressBar').style.display="table";
					document.getElementById('messaggi').innerHTML="Importo tabella carico montaggio...";
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							if(this.responseText!="ok")
								window.alert(this.responseText);
							else
							{
								document.getElementById('messaggi').innerHTML="Importo tabella carico punto punto...";
								var xmlhttp = new XMLHttpRequest();
								xmlhttp.onreadystatechange = function() 
								{
									if (this.readyState == 4 && this.status == 200) 
									{
										if(this.responseText!="ok")
											window.alert(this.responseText);
										else
										{
											document.getElementById('messaggi').innerHTML="Importo tabella carico verniciatura...";
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
														setTimeout(function(){ document.getElementById('containerProgressBar').style.display="none";document.getElementById('push2').style.height="70px"; }, 1500);
													}
												}
											};
											xmlhttp.open("POST", "riempiTabelle3.php?", true);
											xmlhttp.send();
										}
									}
								};
								xmlhttp.open("POST", "riempiTabelle2.php?", true);
								xmlhttp.send();
							}
						}
					};
					xmlhttp.open("POST", "riempiTabelle1.php?", true);
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
					xmlhttp.open("POST", "getDettaglioPtoPto.php?stazione="+stazione+"&week="+week, true);
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
					xmlhttp.open("POST", "getDettaglioVer.php?stazione="+stazione+"&week="+week, true);
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
					xmlhttp.open("POST", "getDettaglioMon.php?stazione="+stazione+"&week="+week, true);
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
					xmlhttp.open("POST", "getDettaglioPtoPtoResiduo.php?stazione="+stazione+"&week="+week, true);
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
					xmlhttp.open("POST", "getDettaglioVerResiduo.php?stazione="+stazione+"&week="+week, true);
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
					xmlhttp.open("POST", "getDettaglioMonResiduo.php?stazione="+stazione+"&week="+week, true);
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
					if(document.getElementById("nSettimane").value>20)
						document.getElementById("nSettimane").value=20;
				}
				function topFunction() 
				{
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
				}
				function graficoPuntoPunto()
				{
					grafico='PTO_PTO';
					document.getElementById('tabelleCarichiDiLavoro').style.width="100%";
					document.getElementById('btnGraficoPuntoPunto').style.color="#3367d6";
					document.getElementById('btnGraficoPuntoPunto').style.boxShadow=" 5px 5px 10px #9c9e9f";
					setTimeout(function()
					{ 
						var chart = new CanvasJS.Chart("tabelleCarichiDiLavoro", 
						{
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
									name: "Ordini",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints1, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Pezzi",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints2, JSON_NUMERIC_CHECK); ?>
								}
							]
						});
						chart.render();

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
							chart.render();
						}
						document.getElementById('comandiTabelle').style.height="50px";
					}, 1000)
				}
				function graficoVerniciaturaCabLac()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="90%";
					grafico="CAB_LAC";
					document.getElementById('btnGraficoVerniciatura').style.color="#3367d6";
					document.getElementById('btnGraficoVerniciatura').style.boxShadow=" 5px 5px 10px #9c9e9f";
					setTimeout(function()
					{ 
						document.getElementById('btnLeft').style.marginTop="30px";
						document.getElementById('btnRight').style.marginTop="30px";
						document.getElementById('btnLeft').style.display="inline-block";
						document.getElementById('btnRight').style.display="inline-block";
						var chart = new CanvasJS.Chart("tabelleCarichiDiLavoro", 
						{
							animationEnabled: true,
							theme: "light2",
							title:
							{
								text: "CAB_LAC"
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
									name: "Ordini",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints3, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Mq",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints4, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Pezzi",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints5, JSON_NUMERIC_CHECK); ?>
								}
							]
						});
						chart.render();

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
							chart.render();
						}
						document.getElementById('comandiTabelle').style.height="50px";
					}, 1000)
				}
				function graficoVerniciaturaCabAcr()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="90%";
					grafico="CAB_ACR";
					document.getElementById('btnGraficoVerniciatura').style.color="#3367d6";
					document.getElementById('btnGraficoVerniciatura').style.boxShadow=" 5px 5px 10px #9c9e9f";
					setTimeout(function()
					{
						document.getElementById('btnLeft').style.marginTop="30px";
						document.getElementById('btnRight').style.marginTop="30px";
						document.getElementById('btnLeft').style.display="inline-block";
						document.getElementById('btnRight').style.display="inline-block";
						var chart = new CanvasJS.Chart("tabelleCarichiDiLavoro", 
						{
							animationEnabled: true,
							theme: "light2",
							title:
							{
								text: "CAB_ACR"
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
									name: "Ordini",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints11, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Mq",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints12, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Pezzi",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints13, JSON_NUMERIC_CHECK); ?>
								}
							]
						});
						chart.render();

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
							chart.render();
						}
						document.getElementById('comandiTabelle').style.height="50px";
					}, 1000)
				}
				function graficoMontaggioMntAca()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="90%";
					grafico="MNT_ACA";
					document.getElementById('btnGraficoMontaggio').style.color="#3367d6";
					document.getElementById('btnGraficoMontaggio').style.boxShadow=" 5px 5px 10px #9c9e9f";
					setTimeout(function()
					{
						document.getElementById('btnLeft').style.marginTop="30px";
						document.getElementById('btnRight').style.marginTop="30px";
						document.getElementById('btnLeft').style.display="inline-block";
						document.getElementById('btnRight').style.display="inline-block";
						var chart = new CanvasJS.Chart("tabelleCarichiDiLavoro", 
						{
							animationEnabled: true,
							theme: "light2",
							title:
							{
								text: "MNT_ACA"
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
									name: "Ordini",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints14, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Basi portalavabo",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints15, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Basi accostabili",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints16, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Colonne",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints17, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Pensili",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints18, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Altro",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints19, JSON_NUMERIC_CHECK); ?>
								}
							]
						});
						chart.render();

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
							chart.render();
						}
						document.getElementById('comandiTabelle').style.height="50px";
					}, 1000)
				}
				function graficoMontaggioMntHome()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="90%";
					grafico="MNT_HOME";
					document.getElementById('btnGraficoMontaggio').style.color="#3367d6";
					document.getElementById('btnGraficoMontaggio').style.boxShadow=" 5px 5px 10px #9c9e9f";
					setTimeout(function()
					{
						document.getElementById('btnLeft').style.marginTop="30px";
						document.getElementById('btnRight').style.marginTop="30px";
						document.getElementById('btnLeft').style.display="inline-block";
						document.getElementById('btnRight').style.display="inline-block";
						var chart = new CanvasJS.Chart("tabelleCarichiDiLavoro", 
						{
							animationEnabled: true,
							theme: "light2",
							title:
							{
								text: "MNT_HOME"
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
									name: "Ordini",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints20, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Basi portalavabo",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints21, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Basi accostabili",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints22, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Colonne",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints23, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Pensili",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints24, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Altro",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints25, JSON_NUMERIC_CHECK); ?>
								}
							]
						});
						chart.render();

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
							chart.render();
						}
						document.getElementById('comandiTabelle').style.height="50px";
					}, 1000)
				}
				function graficoMontaggioMntLut()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="90%";
					grafico="MNT_LUT";
					document.getElementById('btnGraficoMontaggio').style.color="#3367d6";
					document.getElementById('btnGraficoMontaggio').style.boxShadow=" 5px 5px 10px #9c9e9f";
					setTimeout(function()
					{
						document.getElementById('btnLeft').style.marginTop="30px";
						document.getElementById('btnRight').style.marginTop="30px";
						document.getElementById('btnLeft').style.display="inline-block";
						document.getElementById('btnRight').style.display="inline-block";
						var chart = new CanvasJS.Chart("tabelleCarichiDiLavoro", 
						{
							animationEnabled: true,
							theme: "light2",
							title:
							{
								text: "MNT_LUT"
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
									name: "Ordini",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints26, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Basi portalavabo",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints27, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Basi accostabili",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints28, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Colonne",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints29, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Pensili",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints30, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Altro",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints31, JSON_NUMERIC_CHECK); ?>
								}
							]
						});
						chart.render();

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
							chart.render();
						}
						document.getElementById('comandiTabelle').style.height="50px";
					}, 1000)
				}
				function graficoMontaggioMntMast()
				{
					document.getElementById('tabelleCarichiDiLavoro').style.width="90%";
					grafico="MNT_MAST";
					document.getElementById('btnGraficoMontaggio').style.color="#3367d6";
					document.getElementById('btnGraficoMontaggio').style.boxShadow=" 5px 5px 10px #9c9e9f";
					setTimeout(function()
					{
						document.getElementById('btnLeft').style.marginTop="30px";
						document.getElementById('btnRight').style.marginTop="30px";
						document.getElementById('btnLeft').style.display="inline-block";
						document.getElementById('btnRight').style.display="inline-block";
						var chart = new CanvasJS.Chart("tabelleCarichiDiLavoro", 
						{
							animationEnabled: true,
							theme: "light2",
							title:
							{
								text: "MNT_MAST"
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
									name: "Ordini",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints32, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Basi portalavabo",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints33, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Basi accostabili",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints34, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Colonne",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints35, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Pensili",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints36, JSON_NUMERIC_CHECK); ?>
								},
								{
									type: "column",
									name: "Altro",
									indexLabel: "{y}",
									yValueFormatString: "#0.##",
									showInLegend: true,
									dataPoints: <?php echo json_encode($dataPoints37, JSON_NUMERIC_CHECK); ?>
								}
							]
						});
						chart.render();

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
							chart.render();
						}
						document.getElementById('comandiTabelle').style.height="50px";
					}, 1000)
				}
				function cambiaGrafico()
				{
					if(grafico=="CAB_ACR")
					{
						graficoVerniciaturaCabLac();
						return 0;
					}
					if(grafico=="CAB_LAC")
					{
						graficoVerniciaturaCabAcr();
						return 0;
					}
					//----------------------------------
					if(grafico=="MNT_ACA")
					{
						graficoMontaggioMntHome();
						return 0;
					}
					if(grafico=="MNT_HOME")
					{
						graficoMontaggioMntLut();
						return 0;
					}
					if(grafico=="MNT_LUT")
					{
						graficoMontaggioMntMast();
						return 0;
					}
					if(grafico=="MNT_MAST")
					{
						graficoMontaggioMntAca();
						return 0;
					}
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
				function stampa()
				{
					document.getElementById('header').style.display="none";
					document.getElementById('intestazioneCarichiDiLavoro').style.display="none";
					document.getElementById('navBar').style.display="none";
					document.getElementById('comandiTabelle').style.display="none";
					document.getElementById('immagineLogo').style.display="none";
					document.getElementById('btnLeft').style.display="none";
					document.getElementById('btnRight').style.display="none";
					document.getElementById('footer').style.display="none";
					document.body.style.backgroundColor = "white";
					window.print();
					document.body.style.backgroundColor = "#EBEBEB";
					document.getElementById('header').style.display="";
					document.getElementById('intestazioneCarichiDiLavoro').style.display="";
					document.getElementById('navBar').style.display="";
					document.getElementById('comandiTabelle').style.display="";
					document.getElementById('immagineLogo').style.display="";
					document.getElementById('btnLeft').style.display="";
					document.getElementById('btnRight').style.display="";
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
				function apriPopupUpdateSap()
				{
					document.getElementById('popupUpdateSap').style.height="330px";
					document.getElementById('popupUpdateSap').style.width="500px";
					setTimeout(function()
					{ 
						document.getElementById('header').style.opacity="0.2";
						document.getElementById('container').style.opacity="0.2";
						document.getElementById('footer').style.opacity="0.2";	
					}, 100);
					setTimeout(function()
					{ 
						document.getElementById('popupUpdateSap').style.opacity="1";	
					}, 200);
					dragElement(document.getElementById("popupUpdateSap"));
				}
				function chiudiPopupUpdateSap()
				{
					cancellaInputSap();
					document.getElementById('popupUpdateSap').style.height='0px';
					document.getElementById('popupUpdateSap').style.width='0px';
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
					document.getElementById('popupUpdateSap').style.opacity='0.7';
					document.getElementById('popupModificaSettimane').style.opacity='0.7';
				}
				function modificaDateOrdine()
				{
					document.getElementById('statoUpdateSap').innerHTML='<div class="sk-cube-grid" style="margin: 2px 33px;"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div> <div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>';
					var exception=0;
					var docnum =document.getElementById('docnum').value;
					var data1 =document.getElementById('data1').value;
					var data2 =document.getElementById('data2').value;
					var data3 =document.getElementById('data3').value;
					
					if(docnum=='')
					{
						exception=1;
						document.getElementById('statoUpdateSap').innerHTML='<div id="warning" style="margin: 2px 33px;"></div>';
						window.alert("Compila il campo docnum");
						return 0;
					}
					/*if(data1=='')
					{
						exception=1;
						document.getElementById('statoUpdateSap').innerHTML='<div id="warning" style="margin: 2px 33px;"></div>';
						window.alert("Compila almeno una data");
						return 0;
					}*/
					if(isNaN(docnum))
					{
						exception=1;
						document.getElementById('statoUpdateSap').innerHTML='<div id="warning" style="margin: 2px 33px;"></div>';
						window.alert("Il campo docnum deve essere numerico");
						return 0;
					}
					if(docnum.length!=8)
					{
						exception=1;
						document.getElementById('statoUpdateSap').innerHTML='<div id="warning" style="margin: 2px 33px;"></div>';
						window.alert("Il campo docnum deve contenere 8 cifre");
						return 0;
					}
					if(exception==0)
					{
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange = function() 
						{
							if (this.readyState == 4 && this.status == 200) 
							{
								if(this.responseText!="ok")
								{
									document.getElementById('statoUpdateSap').innerHTML='<div id="warning" style="margin: 2px 33px;" title="'+this.responseText+'"></div>';
								}
								else
								{
									document.getElementById('statoUpdateSap').innerHTML='<div id="success" style="margin: 2px 33px;" title="Date modificate"></div>';
									document.getElementById('docnum').value='';
									document.getElementById('statoGetDate').innerHTML="";
									document.getElementById('data1').value='';
									document.getElementById('data2').value='';
									document.getElementById('data3').value='';
									document.getElementById('data1').disabled=true;
									document.getElementById('data2').disabled=true;
									document.getElementById('data3').disabled=true;
								}
							}
						};
						xmlhttp.open("POST", "updateSap.php?docnum=" + docnum + "&data1=" + data1 + "&data2=" + data2 + "&data3=" + data3, true);
						xmlhttp.timeout = 25000; // Set timeout to 25 seconds (25000 milliseconds)
						xmlhttp.ontimeout = function () 
						{ 
							document.getElementById('statoUpdateSap').innerHTML='<div id="warning" style="margin: 2px 33px;" title="Timeout: impossibile accedere al database SAP"></div>';
						}
						xmlhttp.send();
					}
				}
				function cancellaInputSap()
				{
					document.getElementById('docnum').value='';
					document.getElementById('statoGetDate').innerHTML="";
					document.getElementById('data1').value='';
					document.getElementById('data2').value='';
					document.getElementById('data3').value='';
					document.getElementById('data1').disabled=true;
					document.getElementById('data2').disabled=true;
					document.getElementById('data3').disabled=true;
					document.getElementById('statoUpdateSap').innerHTML="";
				}
				function getDate()
				{
					var docnum=document.getElementById('docnum').value;
					if(docnum!='')
					{
						document.getElementById('data1').disabled=false;
						if(!isNaN(docnum))
						{
							document.getElementById('statoGetDate').innerHTML='';
							if(docnum.length==8)
							{
								var xmlhttp = new XMLHttpRequest();
								xmlhttp.onreadystatechange = function() 
								{
									if (this.readyState == 4 && this.status == 200) 
									{
										if(this.responseText.indexOf("Error")!=-1 || this.responseText.indexOf("Notice")!=-1)
										{
											document.getElementById('statoGetDate').innerHTML='<div id="warning" title="'+this.responseText+'"></div>';
										}
										else
										{
											var date=this.responseText.split("|");
											var nDate=0;
											if(date[0]!='')
											{
												nDate++;
												document.getElementById('data1').disabled=false;
												document.getElementById('data1').value=date[0];
											}
											if(date[1]!='')
											{
												nDate++;
												document.getElementById('data2').disabled=false;
												document.getElementById('data2').value=date[1];
											}
											if(date[2]!='')
											{
												nDate++;
												document.getElementById('data3').disabled=false;
												document.getElementById('data3').value=date[2];
											}
											document.getElementById('statoGetDate').innerHTML='<div id="success" title="Docnum valido, '+nDate+' date trovate/a"></div>';
										}
									}
								};
								xmlhttp.open("POST", "getDate.php?docnum=" + docnum, true);
								xmlhttp.timeout = 25000; // Set timeout to 25 seconds (25000 milliseconds)
								xmlhttp.ontimeout = function () 
								{ 
									document.getElementById('statoGetDate').innerHTML='<div id="warning" title="Timeout: impossibile accedere al database SAP"></div>';
								}
								xmlhttp.send();
							}
						}
						else
							document.getElementById('statoGetDate').innerHTML='<div id="warning" title="Il campo docnum deve essere numerico"></div>';
					}
					else
					{
						document.getElementById('data1').value='';
						document.getElementById('data2').value='';
						document.getElementById('data3').value='';
						document.getElementById('data1').disabled=true;
						document.getElementById('data2').disabled=true;
						document.getElementById('data3').disabled=true
					}
				}
				function setDocnumPopupSap(docnum)
				{
					dettaglio=0;document.getElementById('popupDettaglio').style.display='none';
					apriPopupUpdateSap();
					setTimeout(function(){ document.getElementById('docnum').value=docnum;getDate(); }, 500);
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
		<div id="containerProgressBar">
			<div id="middle">
				<div id="messaggi"></div>
				<div id="inner">
					<div id="containerRangeBar">
						<span style="display:inline-block;float:left">Numero di settimane da visualizzare (4-20):</span>
						<div id="containerNSettimane">
							<button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" id="btnMeno">-</button>
							<input type="number" id="nSettimane" value="12" min="4" max="20" onchange="fixNSettimane()" />
							<button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" id="btnPiu">+</button>
						</div>
						<input type="button" id="btnConfermaSettimane" class="btnBlu" value="Conferma" onclick="riempiTabelle();" disabled>
						<input type="button" id="btnNonAggiornare" value="Non aggiornare le tabelle" onclick="nonAggiornare();" disabled>
					</div>
				</div>
			</div>
		</div>
		<form target="_blank" id="TheForm" method="post" action="fullscreenDettaglio.php" style="display:none;">
			<input type="hidden" name="tipoH" id="tipoH" value="" />
			<input type="hidden" name="stazioneH" id="stazioneH" value="" />
			<input type="hidden" name="weekH" id="weekH" value="" />
		</form>
		<div id="popupUpdateSap" onclick="document.getElementById('popupUpdateSap').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmouseup="document.getElementById('popupUpdateSap').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	" onmousedown="document.getElementById('popupUpdateSap').style.opacity='1';document.getElementById('header').style.opacity='0.2';document.getElementById('container').style.opacity='0.2';document.getElementById('footer').style.opacity='0.2';	">
			<div id="popupUpdateSapheader">
				<div style="color:white;box-sizing:border-box;height:60px;padding-left:40px;padding-top:20px;width:250px;float:left;display:inline-block;font-weight:bold">Modifica date ordine</div>
				<input type="button" id="btnChiudiPopupUpdateSap" onclick="chiudiPopupUpdateSap()" value="" />
			</div>
			<div class="containerInputPopupUpdateSap">Ordine
				<input placeholder="Docnum" list="docnumList" id="docnum" style="margin-left:15px;" class="inputPopupUpdateSap" onkeyup="getDate()" />
				<datalist id="docnumList" style="font-family:'Montserrat',sans-serif;">
					<?php getDocnumList($conn); ?>
				</datalist>
				<div id="statoGetDate"></div>
			</div>
			<div class="containerInputPopupUpdateSap">Data 1
				<input type="date" id="data1" class="inputPopupUpdateSap" onchange="if(this.value!='' && document.getElementById('docnum').value!=''){document.getElementById('data2').disabled=false;}else{document.getElementById('data2').disabled=true;document.getElementById('data2').value='';document.getElementById('data2').disabled=true;document.getElementById('data3').value='';document.getElementById('data3').disabled=true;}" disabled>
			</div>
			<div class="containerInputPopupUpdateSap">Data 2
				<input type="date" id="data2" class="inputPopupUpdateSap" onchange="if(this.value!='' && document.getElementById('docnum').value!='' && document.getElementById('data2').value!=''){document.getElementById('data3').disabled=false;}else{document.getElementById('data3').disabled=true;document.getElementById('data3').value='';document.getElementById('data3').disabled=true;}" disabled>
			</div>
			<div class="containerInputPopupUpdateSap">Data 3
				<input type="date" id="data3" class="inputPopupUpdateSap" disabled>
			</div>
			<div class="containerInputPopupUpdateSap">
				<input type="button" id="btnConfermaPopupUpdateSap" class="btnBlu" value="Conferma" onclick="modificaDateOrdine()" />
				<input type="button" id="btnCancellaPopupUpdateSap" class="btnBlu" value="Pulisci" onclick="cancellaInputSap()" />
				<div id="statoUpdateSap"></div>
			</div>
		</div>
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
		<div id="container" onmousedown="changeOpacity()" onclick="changeOpacity()">
			<div id="content">
				<div id="immagineLogo" class="immagineLogo" ></div>
				<div id="intestazioneCarichiDiLavoro">
					<input type="button" id="btnPuntoPunto" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();puntoPunto()" value="Carico punto punto" />
					<input type="button" id="btnGraficoPuntoPunto" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();setTimeout(function(){ graficoPuntoPunto(); }, 100);" value="Grafico punto punto" />
					<input type="button" id="btnVerniciatura" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();verniciatura()" value="Carico verniciatura" />
					<input type="button" id="btnGraficoVerniciatura" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();setTimeout(function(){ graficoVerniciaturaCabLac(); },100);" value="Grafico verniciatura" />
					<input type="button" id="btnMontaggio" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();montaggio()" value="Carico montaggio" />
					<input type="button" id="btnGraficoMontaggio" class="btnIntestazioneCarichiDiLavoro" onclick="resetStyle();setTimeout(function(){ graficoMontaggioMntAca(); }, 100);" value="Grafico montaggio" />
				</div>
				<div id="comandiTabelle">
					<input type="button" id="btnModificaDate" class="btnBlu" value="Modifica date" onclick="apriPopupUpdateSap();" />
					<input type="button" id="btnStampaCaricoDiLavoro" class="btnBlu" value="Stampa" onclick="stampa();" />
					<input type="button" id="btnExcelCaricoDiLavoro" class="btnBlu" value="Scarica" onclick="tableToExcel('myTableTabelleCarichiDiLavoro');" />
					<input type="button" id="btnAggiornaTabelle" class="btnBlu" value="Importa tabelle" onclick="document.getElementById('push2').style.height='0px';document.getElementById('containerProgressBar').style.display='table';document.getElementById('btnConfermaSettimane').click();resetStyle()" />
					<input type="button" id="btnModificaSettimane" class="btnBlu" value="Settimane" onclick="apriPopupModificaSettimane();" />
				</div>
				<div id="btnLeft" onclick="cambiaGrafico()"></div>
				<div id="tabelleCarichiDiLavoro"></div>
				<div id="btnRight" onclick="cambiaGrafico()"></div>
			</div>
		</div>
		<div id="push2"></div>
		<div id="footer" onclick="changeOpacity()">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>
<?php

	function getDocnumList($conn)
	{
		$query2="SELECT DISTINCT AUFTRAGINT AS docnum FROM [Oasis_Live].[dbo].[BEAS_FTHAUPT]";	
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
				echo '<option value="'.$row2['docnum'].'">';
			}
		}
	}

?>
