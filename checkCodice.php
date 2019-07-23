<?php
include "Session.php";
include "connessione.php";
?>
<html>
	<head>
		<title>Picking</title>
			<link rel="stylesheet" href="css/stylePicking.css" />
			<script type="text/javascript">
				function FocusOnInput()
				{
					document.getElementById("codice3").focus();
				}
				function checkCodice()
				{
					var codice= document.getElementById("codicePOST").value;
					if(codice>10000000 && codice<99999999 && !isNaN(codice))
					{
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange = function() 
						{
							if (this.readyState == 4 && this.status == 200) 
							{
								//window.alert(this.responseText);
								document.getElementById("tabella").innerHTML = this.responseText;
							}
						};
						xmlhttp.open("POST", "getDocnumInfo.php?docnum=" + codice, true);
						xmlhttp.send();
					}
					if(codice>9 && codice<9999 && !isNaN(codice))
					{
						document.getElementById("codice1").value=codice;
						document.getElementById("formPicking").submit();
					}
				}
			</script>
			<style>
				@import "compass/css3";
				.flash 
				{
					font-size:200%;
					font-family:arial;
					animation-name: flash;
					animation-duration: 0.6s;
					animation-timing-function: linear;
					animation-iteration-count: infinite;
					animation-direction: alternate;
					animation-play-state: running;
				}
				@keyframes flash 
				{
					from {color:red;}
					to {color: black;}
				}
			 </style>
	</head>
	<body onload="FocusOnInput();checkCodice()">
		<div id="container">
			<div id="header">
				<div id="user">
				<?php
					include "connessione.php";
					$N_Pick=NULL;
					$docLineNum=NULL;
					$bancale=NULL;
					
					echo $_SESSION['Username'];
					
					$codice=$_POST['codice3'];
					echo '<input type="hidden" id="codicePOST" value="'.$codice.'"/>';
				?>
				</div>
				<div id="logout" class="logout">
					<form method="POST" action="logout.php">
						<input type="submit" value="logout">
					</form>
				</div>
			</div>
			<div id="content">
				<div id="riga1">
					<div id="codice" class="codice">
						<form action="checkCodice.php" method="POST">
							<input type="text" id="codice3" name="codice3" placeholder="Spara un codice pick" required/>
						</form>
						<form action="picking2.php" method="POST" id="formPicking" style="display:none;">
							<input type="text" id="codice1" name="codice1" placeholder="Spara un codice pick" required/>
						</form>
					</div>
					<div id="immagine">
					</div>
				</div>
				<div id="tabella" class="tabella"></div>
			</div>
		</div>
		<div id="footer">
			Oasis Group  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->






























