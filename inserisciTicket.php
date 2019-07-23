<?php

	include "Session.php";
	include "connessione.php";
	
	$titolo=$_REQUEST['titolo'];
	$descrizione=$_REQUEST['descrizione'];
	$note=$_REQUEST['note'];
	
	$query2="INSERT INTO [dbo].[ticket]
           ([titolo]
           ,[descrizione]
           ,[note]
           ,[creatore]
           ,[stato]
           ,[dataOraCreazione],
		   [eliminato])
     VALUES
           ('$titolo'
           ,'$descrizione'
           ,'$note'
           ,".getIdUtente($conn,$_SESSION['Username'])."
           ,'Aperto'
           ,getDate(),
		   'false')";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		$id_ticket=getIdTicket($conn,$_SESSION['Username']);
		$query3="INSERT INTO partecipanti_ticket (ticket,partecipante,dataOra) SELECT $id_ticket, utenti.id_utente,getDate() FROM utenti WHERE username='".$_SESSION['Username']."'";	
		$result3=sqlsrv_query($conn,$query3);
		if($result3==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "ok";
		}
	}
	
	function getIdUtente($conn,$username)
	{
		$query2="SELECT id_utente FROM utenti WHERE username='$username'";	
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
				return $row2['id_utente'];
			}
		}
	}
	
	function getIdTicket($conn,$username)
	{
		$query2="SELECT MAX(id_ticket) AS id_ticket FROM ticket WHERE creatore=".getIdUtente($conn,$username);	
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
				return $row2['id_ticket'];
			}
		}
	}
	
?>