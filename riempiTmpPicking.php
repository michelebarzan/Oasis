<?php

    include "connessione.php";

    $query2="EXEC riempiTmpPicking";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==TRUE)
		echo "error";
	else
		echo "ok";
    
?>