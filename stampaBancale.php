<?php
	include "Session.php";
?>
<html>
	<head>
		<link rel="stylesheet" href="css/stylePicking.css" />
		<link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text" rel="stylesheet">
		<script>
		function stampa() 
		{
			//document.getElementById('btnStampa').style.display="none";
			window.print();
			document.getElementById("chiudi").focus();
		}			
		</script>
	</head>
	<body onload="stampa()">
		<?php
		$nuovoBancale=$_POST['nuovoBancale'];
		echo "<div style='height:100px;width:700px'";
			echo "<div id='stampa' class='stampa'>";
				echo "*".$nuovoBancale."*";
			echo "</div><br><br><br><br><br><br><br><br>";
			echo "<div id='immagineStampaBancale' class='immagineStampaBancale'>";
			echo "</div>";
		echo "</div>";
		?>
		<form name="chiudiF" action="picking2.php" method="POST"><br><br><br><br><br><br><br><br><br><br><br>
			<input type="hidden" name="codice1" value=<?php echo $_SESSION['N_Pick']; ?>>
			<input type="text" id="chiudi" style="border:none;float:left;height:1px;width:1px;outline:none;color:white">
			<!--<input type="submit" value="chiudi" />-->
		</form>
		
	</body>
</html>