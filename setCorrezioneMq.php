
<?php
	include "connessione.php";
	include "Session.php";

	$ItemCode=explode(".",$_REQUEST['ItemCode'])[0];
	$oldValue=$_REQUEST['oldValue'];
	$newValue=$_REQUEST['newValue'];
	
	$q="INSERT INTO [dbo].[correzione_mq] ([ItemCode],[oldValue],[newValue],[utente],[data]) VALUES ('$ItemCode',$oldValue,$newValue,".getIdUtente($conn,$_SESSION['Username']).",getdate())";
	$r=sqlsrv_query($conn,$q);
	if($r==FALSE)
	{
		die("error");
	}
	else
	{
		echo "ok";
	}
	
	
	function getIdUtente($conn,$username) 
	{
		$q="SELECT id_utente FROM utenti WHERE username='$username'";
		$r=sqlsrv_query($conn,$q);
		if($r==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$q."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($r))
			{
				return $row['id_utente'];
			}
		}
	}
?>