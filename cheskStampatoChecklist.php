
<?php

include "Session.php";
include "connessione.php";

$n_Pick=$_REQUEST["n_Pick"];

$query2="SELECT distinct stampato FROM T_Picking_01 WHERE n_Pick=$n_Pick";	
$result2=sqlsrv_query($conn,$query2);
if($result2==TRUE)
{
    while($row2=sqlsrv_fetch_array($result2))
    {
        echo $row2['stampato'];
    }
}
else
    die("error");
?>