<?php
	include "session.php";
	include "connessione.php";
		
	$q="SELECT username FROM tmpGestione";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$rows = sqlsrv_has_rows( $r );  
		if ($rows === true)  
		{		
			while($row=sqlsrv_fetch_array($r))
			{
				echo "<b style='color:red'>L' accesso alla pagina e' bloccato dall' utente [".$row['username']."]</b>".'<input type="button" style="margin-left:20px;width:100px;height:30px;" class="btnBlu" value="Riprova" onclick="location.reload()" ><input type="button" id="btnForzaDisconnessione" value="Forza la disconnessione di ['.$row['username'].']" onclick="forzaDisconnessione('. htmlspecialchars(json_encode($row['username'])) .');" >';
			}
		}
		else
		{
			$q2="INSERT INTO tmpGestione (username) VALUES ('".$_SESSION['Username']."')";
			$r2=sqlsrv_query($conn,$q2);
			if($r2==FALSE)
			{
				echo "<br><br>Errore esecuzione query<br>Query: ".$q2."<br>Errore: ";
				die(print_r(sqlsrv_errors(),TRUE));
			}
			else
				echo "ok";
		}
	}
?>