<?php
	include "session.php";
	include "connessione.php";
		
	if(set_time_limit(120))
	{
		$output2 = shell_exec("net use \\\\srv-cont\\K1OasisCatalogo\\Ordini\\Produzione /delete 2>&1");
		$output2 = shell_exec("net use \\\\srv-cont\\K1OasisCatalogo\\Ordini\\Produzione Toiurech01. /user:quaia-oasis\loris 2>&1");
		$output3 = shell_exec("robocopy \\\\srv-cont\\K1OasisCatalogo\\Ordini\\Produzione C:\\xampp\\htdocs\\OasisPdfOrdini\\pdf_ordini *.pdf /z 2>&1");
		$output4 = shell_exec("robocopy \\\\srv-cont\\K1OasisCatalogo\\Ordini C:\\xampp\\htdocs\\OasisPdfOrdini\\ordini_acquisto *.pdf /z 2>&1");
		
		//echo $output3;
		
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>impossibile copiare i pdf. Contattare l' amministratore";
	
?>