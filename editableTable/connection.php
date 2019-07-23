<?php
$serverName = '192.168.69.7';
$connectionInfo=array("Database"=>"Cecklist", "UID"=>"sa", "PWD"=>"Oasis2015");

$conn = sqlsrv_connect($serverName,$connectionInfo);

if(!$conn)
{
	echo "<b style='color:red'>Connection with the database failed</b><br><br>";
	die(print_r(sqlsrv_errors(),TRUE));
}

?>