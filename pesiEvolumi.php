<?php
include "Session.php";
?>
<html>
	<head>
		<title>Picking</title>
			<link rel="stylesheet" href="css/stylePicking.css" />
			<script type="text/javascript">
			function cambiaLu(n)
			{
				valore = document.getElementById("lungS"+n);
				valore=valore.value;
				document.getElementById("lung"+n).value=valore;
			}
			function cambiaLa(n)
			{
				valore = document.getElementById("largS"+n);
				valore=valore.value;
				document.getElementById("larg"+n).value=valore;
			}
			function cancellaPeso(id_bancale)
			{
				document.getElementById("outputDiv").innerHTML = '<form method="POST" action="cancella.php" name="cancellaPesoF"><input type="hidden" name="id_bancale" value='+id_bancale+'><input type="hidden" name="cancellaPeso" value="si">';
				try 
				{
					document.cancellaPesoF.submit();
				}
				catch(err)
				{
					window.alert(err);
				}
				document.getElementById("outputDiv2").innerHTML = '</form>';
			}
			function cancellaLunghezza(id_bancale)
			{
				document.getElementById("outputDiv3").innerHTML = '<form method="POST" action="cancella.php" name="cancellaLunghezzaF"><input type="hidden" name="id_bancale" value='+id_bancale+'><input type="hidden" name="cancellaLunghezza" value="si">';
				try 
				{
					document.cancellaLunghezzaF.submit();
				}
				catch(err)
				{
					window.alert(err);
				}
				document.getElementById("outputDiv4").innerHTML = '</form>';
			}
			function cancellaLarghezza(id_bancale)
			{
				document.getElementById("outputDiv5").innerHTML = '<form method="POST" action="cancella.php" name="cancellaLarghezzaF"><input type="hidden" name="id_bancale" value='+id_bancale+'><input type="hidden" name="cancellaLarghezza" value="si">';
				try 
				{
					document.cancellaLarghezzaF.submit();
				}
				catch(err)
				{
					window.alert(err);
				}
				document.getElementById("outputDiv6").innerHTML = '</form>';
			}
			function cancellaAltezza(id_bancale)
			{
				document.getElementById("outputDiv7").innerHTML = '<form method="POST" action="cancella.php" name="cancellaAltezzaF"><input type="hidden" name="id_bancale" value='+id_bancale+'><input type="hidden" name="cancellaAltezza" value="si">';
				try 
				{
					document.cancellaAltezzaF.submit();
				}
				catch(err)
				{
					window.alert(err);
				}
				document.getElementById("outputDiv8").innerHTML = '</form>';
			}
			function cancellaNote(id_bancale)
			{
				document.getElementById("outputDiv9").innerHTML = '<form method="POST" action="cancella.php" name="cancellaNoteF"><input type="hidden" name="id_bancale" value='+id_bancale+'><input type="hidden" name="cancellaNote" value="si">';
				try 
				{
					document.cancellaNoteF.submit();
				}
				catch(err)
				{
					window.alert(err);
				}
				document.getElementById("outputDiv10").innerHTML = '</form>';
			}
			function gotopath(path)
			{
				window.location = path;
			}
			function cambiaNome(id_bancale,numero,N_Pick,i)
			{
				var tipo=document.getElementById("nome"+i).value;
				var nome=tipo+N_Pick+"."+numero;
				//window.alert(nome);
				
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() 
				{
					if (this.readyState == 4 && this.status == 200) 
					{
						location.reload();
					}
				};
				xmlhttp.open("POST", "cambiaNomeBancale.php?id_bancale=" + id_bancale + "&nome=" + nome, true);
				xmlhttp.send();
				//window.alert(N_Pick+",id_bancale:"+id_bancale+",numero:"+numero+",i:"+i);
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
	<body><!-- onLoad="cambiaLu();cambiaLa()"-->
		<div id="container">
			<div id="header">
				<div id="user">
				<?php
					include "connessione.php";
					
					if($conn)
					{
						echo $_SESSION['Username'];
					}
					else
					{
						echo "Connessione fallita";
						die(print_r(sqlsrv_errors(),TRUE));
					}
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
					<div id="codice2" class="codice2">
						Compila la tabella
					</div>
					<div id="immagine">
					</div>
				</div>
				
				<div id="tabella" class="tabella"><br><br>
					<div >
						<!--<form method="POST" action="picking.php">-->
							<a href="picking.php" id="finito" class="finito" >Modifiche completate</a>
							<!--<input type="button" value="Modifiche completate" id="finito" class="finito" onclick="gotopath('picking.php')" >
						</form>-->
					</div><br>
					<br>
				
				<?php
					creaEriempiTabella($conn)
				?>
				</div>
			</div>
		</div>
		<div id="footer">
			Oasis Group  |  Via Favola 19 33070 San Giovanni PN  |  Tel. +39 0434654752
		</div>
	</body>
</html>

<!--------------------------------------------------------------------------------------------------------------------------------------------------------------->

<?php
function creaEriempiTabella($conn)
{
	echo '<table id="myTable">';
	echo '<tr class="header">';
		creaHeader($conn);
	echo '</tr>';
		riempiTabella($conn);
	echo '</table>';
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function creaHeader($conn)
{
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Numero</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Nome</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">N_Pick</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Peso</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Lunghezza</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Larghezza</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Altezza</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;">Note</th>';
	echo '<th style="color:#666f77;font-family:arial;font-size:100%;font-weight:bold;"></th>';
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function riempiTabella($conn)
{
	$N_Pick=$_SESSION['N_Pick'];
	$queryRighe="SELECT DISTINCT bancali.*  FROM bancali,T_Picking_01 WHERE T_Picking_01.bancale=bancali.id_bancale AND  bancali.n_pick=$N_Pick ORDER BY numero ASC";
	$resultRighe=sqlsrv_query($conn,$queryRighe);
	if($resultRighe==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$queryRighe."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$i=0;
		while($rowRighe=sqlsrv_fetch_array($resultRighe))
		{
			$id_bancale=$rowRighe['id_bancale'];
			echo "<form action='pesiEvolumi2.php' method='POST'>";
			echo "<input type='hidden' name='id_bancale' value=$id_bancale>";
			echo '<tr>';
				echo '<td>'.$rowRighe['numero'].'</td>';
				
				echo '<td>';
					echo $rowRighe['nome'];
					?>&nbsp&nbsp<select name="nome" id="nome<?php echo $i; ?>" onChange="cambiaNome('<?php echo $rowRighe['id_bancale']."','".$rowRighe['numero']."','".$rowRighe['n_Pick']."','".$i; ?>');" style="outline:none;padding: 8px ;border: 1px solid #CFD1DC;border-radius: 4px;box-sizing: border-box; color:#666f77;font-family:arial;font-size:80%;font-weight:bold;" /><?php
					echo "<option value='' disabled selected>Cambia tipo</option>";
					echo "<option value='BANCALE'>BANCALE</option>";
					echo "<option value='CASSA'>CASSA</option>";
					echo "<option value='SCATOLA'>SCATOLA</option>";
					echo "</select>";
				echo '</td>';
				
				echo '<td>'.$rowRighe['n_Pick'].'</td>';
				//-------------------------------------------------------------------------------------------------
				if($rowRighe['peso']!=NULL)
				{
					echo "<div id='outputDiv' class='outputDiv'></div>";
					echo '<td>';
					echo "<input type='hidden' name='peso' value=".$rowRighe['peso'].">";
					echo "<div id='cancella' class='cancella' style='display:inline-block;'><input type='button' value='X' onclick='cancellaPeso(".$id_bancale.")' style='cursor:pointer;background: #ECECEC;border:1px solid #a7a7a7;text-align: center;font-weight:bold;color:gray;font-size:11px;'></div>";
					echo "&nbsp&nbsp".$rowRighe['peso'].'</td>';
					echo "<div id='outputDiv2' class='outputDiv2'></div>";
				}
				else
					echo '<td><input type="number" step=0.01 name="peso" placeholder="Peso"></td>';
				//-------------------------------------------------------------------------------------------------
				if($rowRighe['lunghezza']!=NULL)
				{
					echo "<div id='outputDiv3' class='outputDiv3'></div>";
					echo '<td>';
					echo "<input type='hidden' name='lunghezza' value=".$rowRighe['lunghezza'].">";
					echo "<div id='cancella' class='cancella' style='display:inline-block'><input type='button' value='X' onclick='cancellaLunghezza(".$id_bancale.")' style='cursor:pointer;background: #ECECEC;border:1px solid #a7a7a7;text-align: center;font-weight:bold;color:gray;font-size:11px;'></div>";
					echo "&nbsp&nbsp".$rowRighe['lunghezza'].'</td>';
					echo "<div id='outputDiv4' class='outputDiv4'></div>";
				}
				else
				{
					echo '<td>';
					echo '<select name="lunghezzaS" id="lungS'.$i.'" onChange="cambiaLu('.$i.');" style="width:70px;padding: 0.6% ;border: 1px solid #CFD1DC;border-radius: 4px;box-sizing: border-box; color:#666f77;font-family:arial;font-size:90%;font-weight:bold;" />';
					echo "<option value='120'>120</option>";
					echo "<option value='130'>130</option>";
					echo "<option value='160'>160</option>";
					echo "<option value='190'>190</option>";
					echo "</select>&nbsp O &nbsp";
					echo '<input type="number" step=0.01 name="lunghezza" id="lung'.$i.'" value="120" style="width:70px;" ></td>';
				}
				//-------------------------------------------------------------------------------------------------
				if($rowRighe['larghezza']!=NULL)
				{
					echo "<div id='outputDiv5' class='outputDiv5'></div>";
					echo '<td>';
					echo "<input type='hidden' name='larghezza' value=".$rowRighe['larghezza'].">";
					echo "<div id='cancella' class='cancella' style='display:inline-block'><input type='button' value='X' onclick='cancellaLarghezza(".$id_bancale.")' style='cursor:pointer;background: #ECECEC;border:1px solid #a7a7a7;text-align: center;font-weight:bold;color:gray;font-size:11px;'></div>";
					echo "&nbsp&nbsp".$rowRighe['larghezza'].'</td>';
					echo "<div id='outputDiv6' class='outputDiv6'></div>";
				}
				else
				{
					echo '<td>';
					echo '<select name="larghezzaS" id="largS'.$i.'"  onChange="cambiaLa('.$i.')" style="width:70px;padding: 0.6% ;border: 1px solid #CFD1DC;border-radius: 4px;box-sizing: border-box; color:#666f77;font-family:arial;font-size:90%;font-weight:bold;" />';
					echo "<option value='80'>80</option>";
					echo "<option value='100'>100</option>";
					echo "</select>&nbsp O &nbsp";
					echo '<input type="number" step=0.01 name="larghezza" id="larg'.$i.'"  value="80" style="width:70px;" ></td>';
				}
				//-------------------------------------------------------------------------------------------------
				if($rowRighe['altezza']!=NULL)
				{
					echo "<div id='outputDiv7' class='outputDiv7'></div>";
					echo '<td>';
					echo "<input type='hidden' name='altezza' value=".$rowRighe['altezza'].">";
					echo "<div id='cancella' class='cancella' style='display:inline-block'><input type='button' value='X' onclick='cancellaAltezza(".$id_bancale.")' style='cursor:pointer;background: #ECECEC;border:1px solid #a7a7a7;text-align: center;font-weight:bold;color:gray;font-size:11px;'></div>";
					echo "&nbsp&nbsp".$rowRighe['altezza'].'</td>';
					echo "<div id='outputDiv8' class='outputDiv8'></div>";
				}
				else
					echo '<td><input type="number" step=0.01 name="altezza" placeholder="Altezza"></td>';
				//-------------------------------------------------------------------------------------------------
				if($rowRighe['note']!=NULL)
				{
					echo "<div id='outputDiv9' class='outputDiv9'></div>";
					echo "<td>";
					echo "<input type='hidden' name='note' value=".$rowRighe['note'].">";
					echo "<div id='cancella' class='cancella' style='display:inline-block'><input type='button' value='X' onclick='cancellaNote(".$id_bancale.")' style='cursor:pointer;background: #ECECEC;border:1px solid #a7a7a7;text-align: center;font-weight:bold;color:gray;font-size:11px;'></div>";
					echo "&nbsp&nbsp<div style='overflow-x:scroll;max-width:120px;'>".$rowRighe['note'].'</div></td>';
					echo "<div id='outputDiv10' class='outputDiv10'></div>";
				}
				else
					echo '<td><input type="text" name="note" placeholder="Note" ></td>';
				echo '<td ><input type="submit" value="Conferma"></td>';
			echo '</tr>';
			echo "</form>";
			$i++;
		}
	}
}

?>




























