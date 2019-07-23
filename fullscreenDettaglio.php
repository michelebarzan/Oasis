<?php
	include "Session.php";
	include "connessione.php";
	
?>
<html>
	<head>
		<title>Dettaglio carico di lavoro</title>
			<link rel="stylesheet" href="css/styleV28.css" />
			<script>
				//var parameters=window.my_special_setting;
				var stazioneG;
				var weekG;
				var tipoG;
				
				function getDettaglioPtoPto(stazione,week) 
				{ 
					//document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							week2= week.substring(0, 4);
							week3= week.substring(4, 6);
							document.getElementById('container').innerHTML= "<div style='height:50px;font-size:120%;background:#434343;color:white;font-weight:bold;width:100%;margin-bottom:20px;line-height:50px;font-family:Montserrat,sans-serif;'>Dettaglio stazione "+stazione+" settimana "+week3+" del "+week2+"</div>"+this.responseText;
							fixTables();
						}
					};
					xmlhttp.open("POST", "getDettaglioPtoPto.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioVer(stazione,week) 
				{
					//document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							week2= week.substring(0, 4);
							week3= week.substring(4, 6);
							document.getElementById('container').innerHTML= "<div style='height:50px;font-size:120%;background:#434343;color:white;font-weight:bold;width:100%;margin-bottom:20px;line-height:50px;font-family:Montserrat,sans-serif;'>Dettaglio stazione "+stazione+" settimana "+week3+" del "+week2+"</div>"+this.responseText;
							fixTables();
						}
					};
					xmlhttp.open("POST", "getDettaglioVer.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioMon(stazione,week) 
				{
					//document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							week2= week.substring(0, 4);
							week3= week.substring(4, 6);
							document.getElementById('container').innerHTML= "<div style='height:50px;font-size:120%;background:#434343;color:white;font-weight:bold;width:100%;margin-bottom:20px;line-height:50px;font-family:Montserrat,sans-serif;'>Dettaglio stazione "+stazione+" settimana "+week3+" del "+week2+"</div>"+this.responseText;
							fixTables();
						}
					};
					xmlhttp.open("POST", "getDettaglioMon.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function fixTables()
				{
					document.getElementById('myTableDettaglio').style.width="100%";
					document.getElementById('myTableDettaglio').style.color="gray";
					document.getElementById('myTableDettaglio').style.fontSize="110%";
					document.getElementById('myTableDettaglio2').style.width="100%";
					document.getElementById('myTableDettaglio2').style.color="gray";
					document.getElementById('myTableDettaglio2').style.fontSize="110%";
					document.getElementById('myTableDettaglio2').style.marginTop="50px";
					document.getElementById('myTableDettaglio2').style.marginLeft="0px";
					document.getElementById('myTableDettaglio2').style.marginRight="0px";
					document.getElementById('myTableDettaglio').style.marginLeft="0px";
					document.getElementById('myTableDettaglio').style.marginRight="0px";
				}
				function getDettaglioPtoPtoResiduo(stazione,week) 
				{ 
					//document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							week2= week.substring(0, 4);
							week3= week.substring(4, 6);
							document.getElementById('container').innerHTML= "<div style='height:50px;font-size:120%;background:#434343;color:white;font-weight:bold;width:100%;margin-bottom:20px;line-height:50px;font-family:Montserrat,sans-serif;'>Dettaglio residuo stazione "+stazione+" precedente alla settimana "+week3+" del "+week2+"</div>"+this.responseText;
							fixTables();
						}
					};
					xmlhttp.open("POST", "getDettaglioPtoPtoResiduo.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioVerResiduo(stazione,week) 
				{
					//document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							week2= week.substring(0, 4);
							week3= week.substring(4, 6);
							document.getElementById('container').innerHTML= "<div style='height:50px;font-size:120%;background:#434343;color:white;font-weight:bold;width:100%;margin-bottom:20px;line-height:50px;font-family:Montserrat,sans-serif;'>Dettaglio stazione "+stazione+" precedente alla settimana "+week3+" del "+week2+"</div>"+this.responseText;
							fixTables();
						}
					};
					xmlhttp.open("POST", "getDettaglioVerResiduo.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglioMonResiduo(stazione,week) 
				{
					//document.getElementById('titoloDettaglio').innerHTML="Dettaglio stazione "+stazione+" settimana "+week2[1]+" del "+week2[0];
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() 
					{
						if (this.readyState == 4 && this.status == 200) 
						{
							week2= week.substring(0, 4);
							week3= week.substring(4, 6);
							document.getElementById('container').innerHTML= "<div style='height:50px;font-size:120%;background:#434343;color:white;font-weight:bold;width:100%;margin-bottom:20px;line-height:50px;font-family:Montserrat,sans-serif;'>Dettaglio stazione "+stazione+" precedente alla settimana "+week3+" del "+week2+"</div>"+this.responseText;
							fixTables();
						}
					};
					xmlhttp.open("POST", "getDettaglioMonResiduo.php?stazione="+stazione+"&week="+week, true);
					xmlhttp.send();
				}
				function getDettaglio()
				{
					tipoG=document.getElementById('tipoH').value;
					if(tipoG=="residuo")
					{
						stazioneG=document.getElementById('stazioneH').value;
						stazioneG=stazioneG.replace(/ /g,'');
						stazioneG=stazioneG.replace(/\s/g,'');
						weekG=document.getElementById('weekH').value;
						if(stazioneG=="PTO_PTO")
							getDettaglioPtoPtoResiduo(stazioneG,weekG);
						if(stazioneG=="CAB_ACR" || stazioneG=="CAB_LAC")
							getDettaglioVerResiduo(stazioneG,weekG);
						if(stazioneG=="MNT_ACA" || stazioneG=="MNT_HOME" || stazioneG=="MNT_LUT" || stazioneG=="MNT_MAST")
							getDettaglioMonResiduo(stazioneG,weekG);
					}
					else
					{
						stazioneG=document.getElementById('stazioneH').value;
						stazioneG=stazioneG.replace(/ /g,'');
						stazioneG=stazioneG.replace(/\s/g,'');
						weekG=document.getElementById('weekH').value;
						if(stazioneG=="PTO_PTO")
							getDettaglioPtoPto(stazioneG,weekG);
						if(stazioneG=="CAB_ACR" || stazioneG=="CAB_LAC")
							getDettaglioVer(stazioneG,weekG);
						if(stazioneG=="MNT_ACA" || stazioneG=="MNT_HOME" || stazioneG=="MNT_LUT" || stazioneG=="MNT_MAST")
							getDettaglioMon(stazioneG,weekG);
					}
				}
			</script>
			<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
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
	</head>
	<body onload="getDettaglio();" style="width:96%;margin-left:2%;margin-right:2%">
		<input type="hidden" name="tipoH" id="tipoH" value="<?php echo $_POST['tipoH']; ?>" />
		<input type="hidden" name="stazioneH" id="stazioneH" value="<?php echo $_POST['stazioneH']; ?>" />
		<input type="hidden" name="weekH" id="weekH"  value="<?php echo $_POST['weekH']; ?>" />
		<div id="container" style="width:96%;margin-left:2%;margin-right:2%"></div>
	</body>
</html>

