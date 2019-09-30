<?php
    include "connessione.php";
    include "Session.php";

    $nTentativi=100;

    for($x = 0; $x < $nTentativi; $x++)
    {
        $queryRighe="SELECT * FROM tmpViewRichiesteEfaq".$x;
        $resultRighe=sqlsrv_query($conn,$queryRighe);
        if($resultRighe==FALSE)
        {
            break;
        }
    }

	$query2="CREATE VIEW tmpViewRichiesteEfaq".$x." AS SELECT id_richiesta, oggetto, descrizione, note, macrocategoria, categoria, stato, data_creazione
    FROM dbo.richieste_e_faq
    WHERE (utente_creazione = ".$_SESSION['id_utente'].") AND stato<>'Eliminata'";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		die("error");
	}
	else
	{
		echo "tmpViewRichiesteEfaq".$x;
	}
?>