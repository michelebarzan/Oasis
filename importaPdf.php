<?php
	include "session.php";
	include "connessione.php";
		
	if(set_time_limit(120))
	{
		$output3 = shell_exec("robocopy \\\\srv-cont\\K1OasisCatalogo\\Ordini\\Produzione C:\\xampp\\htdocs\\OasisPrdOrdini\\pdf_ordini H1*.pdf /z 2>&1");
		
		//echo $output3;
		
		echo "ok";
	}
	else
		echo "<b style='color:red'>Errore di sistema: </b>impossibile copiare i pdf. Contattare l' amministratore";
	
?>