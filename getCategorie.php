
<?php

include "Session.php";
include "connessione.php";

$categorie=[];

$query2="SELECT * FROM categorie_richieste  WHERE eliminata='false'";	
$result2=sqlsrv_query($conn,$query2);
if($result2==TRUE)
{
    while($row2=sqlsrv_fetch_array($result2))
    {
        $categoria["id_categoria"]=$row2['id_categoria'];
        $categoria["nome"]=$row2['nome'];
        $categoria["descrizione"]=$row2['descrizione'];

        array_push($categorie,$categoria);
    }
}

echo json_encode($categorie);
?>