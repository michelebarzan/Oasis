<?php

    include "connessione.php";
    include "Session.php";
    
    $sommari_archivi_utenti=[];

	$query2="SELECT dbo.sommari_archivi.sommario, dbo.sommari_archivi.nomeSommario
            FROM dbo.sommari_archivi_utenti INNER JOIN dbo.sommari_archivi ON dbo.sommari_archivi_utenti.sommario = dbo.sommari_archivi.id_sommario where utente=".$_SESSION['id_utente'];	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		die("error");
	}
	else
	{
		while($row2=sqlsrv_fetch_array($result2))
		{
            $sommario['sommario']=$row2['sommario'];
            $sommario['nomeSommario']=$row2['nomeSommario'];
            array_push($sommari_archivi_utenti,$sommario);
        }
        echo json_encode($sommari_archivi_utenti);
	}
	
?>