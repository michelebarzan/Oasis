<?php
include "Session.php";
include "connessione.php";

	set_time_limit(3000);
?>
<html>
	<head>
		<title>Impagina stampa checklist</title>
		<link rel="stylesheet" href="css/stylePrintV2.css" />
		<script>
		function stampaOrizzontale()
		{
			document.getElementById("stampaPalletB").style.display="none";
			window.print();
			document.getElementById("stampaPalletB").style.display="block";
		}
		function stampaVerticale()
		{
			/*window.location = 'anteprimaDiStampaVerticale.php';*/
			window.alert("Work in progress");
		}
		(function() 
		{
			var beforePrint = function() {
				//window.alert('Functionality to run before printing.');
				document.getElementById("btnStampaOrizzontale").click;
				document.getElementById("stampaPalletB").style.display="none";
			};
			var afterPrint = function() {
				/*window.alert('Functionality to run after printing');*/
				document.getElementById("stampaPalletB").style.display="block";
			};

			if (window.matchMedia) {
				var mediaQueryList = window.matchMedia('print');
				mediaQueryList.addListener(function(mql) {
					if (mql.matches) {
						beforePrint();
					} else {
						afterPrint();
					}
				});
			}

			window.onbeforeprint = beforePrint;
			window.onafterprint = afterPrint;
		}());
		</script>
	</head>
	<body>
		<div id="centra" class="centra">
			<span id="stampaPalletB" class="stampaPalletB" >
				<br>
				<input type="submit" onClick="window.close();" value="Chiudi">
				<input type="submit" id="btnStampaOrizzontale" onClick="stampaOrizzontale()" value="Stampa">
				<!--<input type="submit" onClick="stampaVerticale()" value="Stampa verticale">-->
				<br>
			</span>
			<br><div id="immagineStampa" class="immagineStampa"></div>
			<br><div id="intestazione" class="intestazione" contenteditable><br>
			PACKING LIST<br>
			CUSTOMER: <br>
			ORDER N. <br>
			INVOICE N. 
			<br><br></div>
			<br>
			<div>
				<?php
				creaTabellaStampabile($conn);
				?>
			</div>
		</div>
	</body>
</html>

<?php

function creaTabellaStampabile($conn)
{
	echo "<div id='header' class='header'>";
		echo "<div id='colonna1' class='colonna1' contenteditable>ORDER<br>CUSTOMER</div>";
		echo "<div id='colonna2' class='colonna2' contenteditable>ITEM CODE</div>";
		echo "<div id='colonna3' class='colonna3' contenteditable>DESCRIPTION</div>";
		echo "<div id='colonna4' class='colonna4' contenteditable>QUANTITY</div>";
		echo "<div id='colonna5' class='colonna5' contenteditable>NET W.</div>";
		echo "<div id='colonna6' class='colonna6' contenteditable>GROSS W.</div>";
		echo "<div id='colonna7' class='colonna7' contenteditable>COD. DOG.</div>";
		echo "<div id='colonna8' class='colonna8'>MEASURES</div>";
		echo "<div id='colonna9' class='colonna9' style='border-right:none;'>GROUP</div>";
	echo "</div>";

	
		$resultRighe=riempiTabellaStampabile($conn);
		$i=0;
		while($rowRighe=sqlsrv_fetch_array($resultRighe))
		{
			if($rowRighe['group']!=NULL)
			{
				if($i==6 || $i==19 || $i==32 || $i==45 || $i==58 || $i==71 || $i==84 || $i==97 || $i==110 || $i==123 || $i==136 || $i==149)
					echo "<div id='riga' class='riga' style='border-bottom:1px solid #ddd;'>";
				else
					echo "<div id='riga' class='riga'>";
						echo '<div id="tcolonna1" class="tcolonna1" contenteditable>'.$rowRighe['order'].'<br>'.$rowRighe['cliente'].'</div>';
						if($rowRighe['itemCodePadre']==$rowRighe['itemCode'] || strpos($rowRighe['itemCodePadre'], $rowRighe['itemCode']) !== false)
						{
							echo '<div id="tcolonna2" class="tcolonna2" contenteditable>'.$rowRighe['itemCode'].'</div>';
							echo '<div id="tcolonna3" class="tcolonna3" contenteditable>'.$rowRighe['description'].'</div>';
						}
						else
						{
							echo '<div id="tcolonna2" class="tcolonna2" contenteditable>'.$rowRighe['itemCodePadre'].'<br>'.$rowRighe['itemCode'].'</div>';
							echo '<div id="tcolonna3" class="tcolonna3" contenteditable>'.$rowRighe['descrizionePadre'].'<br>'.$rowRighe['description'].'</div>';
						}
						echo '<div id="tcolonna4" class="tcolonna4" contenteditable>'.$rowRighe['quantity'].'</div>';
						echo '<div id="tcolonna5" class="tcolonna5" contenteditable>'.$rowRighe['netWeight'].'</div>';
						echo '<div id="tcolonna6" class="tcolonna6" contenteditable>'.$rowRighe['grossWeight'].'</div>';
						echo '<div id="tcolonna7" class="tcolonna7" contenteditable>'.$rowRighe['codDog'].'</div>';
						$misure=$rowRighe['misure'];
						$L=substr($misure,0,strrpos($misure,'H'));
						$misure=strstr($misure, 'H');
						$H=substr($misure,0,strrpos($misure,'P'));
						$misure=strstr($misure, 'P');
						$P=$misure;
						echo '<div id="tcolonna8" class="tcolonna8" style="line-height:140%;" contenteditable>'.$L.'<br>'.$H.'<br>'.$P.'</div>';
						echo '<div id="tcolonna9" class="tcolonna9" contenteditable style="border-right:none;">'.$rowRighe['group'].'</div>';
					echo "</div>";
			}
			else
			{
				echo "<div id='riga' class='riga' style='border-bottom:2px solid black;'>";
					echo '<div id="tcolonna1" class="tcolonna1" contenteditable>'.$rowRighe['order'].'</div>';
					echo '<div id="tcolonna2" class="tcolonna2" style="background-color:#CFD1DC;font-weight:bold;color:black" contenteditable>'.$rowRighe['itemCode'].'</div>';
					$words = explode('|', $rowRighe['description']);
					echo '<div id="tcolonna3" class="tcolonna3" style="background-color:#F9EF62;font-weight:bold;color:black;width:25%;" contenteditable>'.$words[0].'<br>'.$words[1].'<br>'.$words[2].'</div>';
					echo '<div id="tcolonna4" class="tcolonna4" style="font-weight:bold;color:black" contenteditable>'.$rowRighe['quantity'].'</div>';
					echo '<div id="tcolonna5" class="tcolonna5" style="font-weight:bold;color:red" contenteditable>'.$rowRighe['netWeight'].'</div>';
					echo '<div id="tcolonna6" class="tcolonna6" style="font-weight:bold;color:red" contenteditable>'.$rowRighe['grossWeight'].'</div>';
					echo '<div id="tcolonna7" class="tcolonna7" style="font-weight:bold;color:red" contenteditable>'.$rowRighe['codDog'].'</div>';
					echo '<div id="tcolonna8" class="tcolonna8" style="font-weight:bold;color:red" contenteditable>'.$rowRighe['misure'].'</div>';
					echo '<div id="tcolonna9" class="tcolonna9" contenteditable style="border-right:none;outline:none">'.$rowRighe['group'].'</div>';
				echo "</div>";
			}
			
			$i++;
			if($i==7 || $i==20 || $i==33 || $i==46 || $i==59 || $i==72 || $i==85 || $i==98 || $i==111 || $i==124 || $i==137 || $i==150)
			{
				echo "<hr size='1' style='border-color:gray;margin-left:90px;margin-right:90px'>"; 
				echo "<span contenteditable>Oasis Group  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752</span><br><br>"; 
			}
		}
		echo "<hr size='1' style='border-color:gray;margin-left:90px;margin-right:90px'>"; 
		echo "<span contenteditable>Oasis Group  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752</span><br><br>"; 
}
function riempiTabellaStampabile($conn)
{
	$queryRighe="SELECT stampaPalletTemp.* FROM stampaPalletTemp";
	$resultRighe=sqlsrv_query($conn,$queryRighe);
	if($resultRighe==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$queryRighe."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		return $resultRighe;
	}
}
?>