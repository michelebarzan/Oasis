<?php
    include "connessione.php";
    include "Session.php";

    $nTentativi=100;

    for($x = 0; $x < $nTentativi; $x++)
    {
        $queryRighe="SELECT * FROM tmpViewGestioneRichiesteEfaq".$x;
        $resultRighe=sqlsrv_query($conn,$queryRighe);
        if($resultRighe==FALSE)
        {
            break;
        }
    }

    $query2="CREATE VIEW tmpViewGestioneRichiesteEfaq".$x." AS SELECT dbo.richieste_e_faq.id_richiesta, dbo.richieste_e_faq.oggetto, dbo.richieste_e_faq.descrizione, dbo.richieste_e_faq.note, dbo.richieste_e_faq.macrocategoria, dbo.richieste_e_faq.categoria, dbo.richieste_e_faq.stato, 
            dbo.richieste_e_faq.data_creazione
            FROM dbo.richieste_e_faq LEFT OUTER JOIN
            dbo.utenti_incaricati_macrocategorie ON dbo.richieste_e_faq.macrocategoria = dbo.utenti_incaricati_macrocategorie.macrocategoria LEFT OUTER JOIN
            dbo.utenti_incaricati_richieste ON dbo.richieste_e_faq.id_richiesta = dbo.utenti_incaricati_richieste.richiesta
            WHERE (dbo.richieste_e_faq.stato <> 'Eliminata') AND (dbo.utenti_incaricati_macrocategorie.utente = ".$_SESSION['id_utente'].") OR
            (dbo.richieste_e_faq.stato <> 'Eliminata') AND (dbo.utenti_incaricati_richieste.utente = ".$_SESSION['id_utente'].")";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		die("error");
	}
	else
	{
		echo "tmpViewGestioneRichiesteEfaq".$x;
	}
?>