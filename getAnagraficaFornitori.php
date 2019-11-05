
<?php

include "Session.php";
include "connessione.php";

$fornitori=[];

$query2="SELECT * FROM anagrafica_fornitori ORDER BY nome_fornitore";	
$result2=sqlsrv_query($conn,$query2);
if($result2==TRUE)
{
    while($row2=sqlsrv_fetch_array($result2))
    {
        $fornitore["codice_fornitore"]=utf8_encode($row2['codice_fornitore']);
        $fornitore["nome_fornitore"]=utf8_encode($row2['nome_fornitore']);

        array_push($fornitori,$fornitore);
    }
}

echo json_encode($fornitori);
?>