<?php
	include "Session.php";
	include "connessione.php";

	$pageName="Liste di carico";
?>
<html>
	<head>
		<title><?php echo $pageName; ?></title>
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
			<link rel="stylesheet" href="css/styleV34.css" />
			<link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text" rel="stylesheet">
			<script src="struttura.js"></script>
			<script>
				function stampa(divName) 
				{
					var printContents = document.getElementById(divName).innerHTML;
					var originalContents = document.body.innerHTML;

					document.body.innerHTML = printContents;

					window.print();

					document.body.innerHTML = originalContents;
				}
			</script>
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
	<body>
		<button onclick="topFunction()" id="btnGoTop" title="Go to top"></button>
		<script>
		// When the user scrolls down 20px from the top of the document, show the button
			window.onscroll = function() {scrollFunction()};

			function scrollFunction() 
			{
				if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) 
				{
					document.getElementById("btnGoTop").style.width = "48px";
					document.getElementById("btnGoTop").style.height = "48px";
					document.getElementById("btnGoTop").style.opacity = "1";
				} 
				else 
				{
					document.getElementById("btnGoTop").style.width = "0px";
					document.getElementById("btnGoTop").style.height = "0px";
					document.getElementById("btnGoTop").style.opacity = "0";
				}
			}

			// When the user clicks on the button, scroll to the top of the document
			function topFunction() 
			{
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			}
		</script>
		<?php include('struttura.php'); ?>
		<div id="container">
			<?php
			if(isset($_POST['data']))
				$data=$_POST['data'];
			else
				$data=date('Y-m-d', time());
			if(isset($_POST['data2']))
				$data2=$_POST['data2'];
			else
				$data2=date('Y-m-d', time());
			?>
			<div id="content">
				<div id="immagineLogo" class="immagineLogo" style="margin-bottom:30px;" ></div>
				<form name="gestionePickingF" id="gestionePickingF" class="gestionePickingF" action="gestionePicking.php" method="POST">
					<span style='font-family:arial;font-size:100%;color:gray;font-weight:bold;'>Liste di carico dal&nbsp</span>
					<input type="date" name="data" value="<?php echo $data; ?>" style="padding: 0.5% ;display: inline-block;border: 1px solid #CFD1DC;border-radius: 5px;box-sizing: border-box; color:#66B2FF;font-family:arial;font-size:90%;font-weight:bold;"/>
					<span style='font-family:arial;font-size:100%;color:gray;font-weight:bold;'>&nbspal&nbsp</span>
					<input type="date" name="data2" value="<?php echo $data2; ?>" style="padding: 0.5% ;display: inline-block;border: 1px solid #CFD1DC;border-radius: 5px;box-sizing: border-box; color:#66B2FF;font-family:arial;font-size:90%;font-weight:bold;"/>
					<input type="submit" value="">
				</form>
				<div id="gestionePicking" class="gestionePicking"><input type="submit" onClick="stampa('tabella')" value="Stampa"></div>
				<br>
				<div id="tabella" class="tabella" >
					<?php
					creaEriempiTabella($conn,$data,$data2);
					?>
				</div>
			</div>
		</div>
		<div id="push"></div>
		<div id="footer">
			<b>Oasis Group</b>  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>


<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->

<?php
function creaEriempiTabella($conn,$data,$data2)
{
	echo '<table id="myTable" style="border:2px solid #C6C6C6">';
	//echo "<br>";
	//echo '<tr style="border:1px solid white"><td></td><td></td><td></td><td></td></tr>';
	echo '<tr class="header" style="border-bottom:2px solid #C6C6C6">';
		creaHeader($conn);
	echo '</tr>';
		riempiTabella($conn,$data,$data2);
	echo '</table>';
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function creaHeader($conn)
{
	echo '<th style="color:#666f77;font-family:arial;font-size:90%;font-weight:bold;">N_Pick</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:90%;font-weight:bold;">N_Pick (Barcode)</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:90%;font-weight:bold;">Descrizione</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:90%;font-weight:bold;">DataPick</th>';
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function riempiTabella($conn,$data,$data2)
{
	//$dataQ = $data->format('Y-m-d');
	$queryRighe="SELECT DISTINCT Q_Picking_04.N_Pick, Q_Picking_04.DescrPick, Q_Picking_04.DataPick FROM Q_Picking_04 WHERE Q_Picking_04.dataConsegna>='$data' AND Q_Picking_04.dataConsegna<='$data2'";
	$resultRighe=sqlsrv_query($conn,$queryRighe);
	if($resultRighe==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$queryRighe."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($rowRighe=sqlsrv_fetch_array($resultRighe))
		{
			echo '<tr>';
				echo '<td>'.$rowRighe['N_Pick'].'</td>';
				echo '<td id="stampa2" class="stampa2">*'.$rowRighe['N_Pick'].'*</td>';
				echo '<td>'.$rowRighe['DescrPick'].'</td>';
				echo '<td>'.$rowRighe['DataPick']->format('d/m/Y').'</td>';
			echo '</tr>';
		}
	}
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------


?>

