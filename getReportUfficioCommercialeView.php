<?php

	include "Session.php";
	include "connessione.php";
	
	$data1=$_REQUEST["data1"];	
	$data2=$_REQUEST["data2"];
	
	$data1Array=[];
	$data1Array['day']=explode("-",$data1)[2];
	$data1Array['month']=explode("-",$data1)[1];
	$data1Array['year']=explode("-",$data1)[0];
	$data1Int=intval($data1Array['year'].$data1Array['month'].$data1Array['day']);
	
	$data2Array=[];
	$data2Array['day']=explode("-",$data2)[2];
	$data2Array['month']=explode("-",$data2)[1];
	$data2Array['year']=explode("-",$data2)[0];
	$data2Int=intval($data2Array['year'].$data2Array['month'].$data2Array['day']);
	
	$columns=[];
	$rows=[];
	
	$query1="SELECT * FROM Cecklist.INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'report_ufficio_vendite_view'";	
	$result1=sqlsrv_query($conn,$query1);
	if($result1==FALSE)
	{
		die("error");
	}
	else
	{
		while($row1=sqlsrv_fetch_array($result1))
		{
			array_push($columns,$row1["COLUMN_NAME"]);
		}
		$query2="SELECT * FROM report_ufficio_vendite_view WHERE annoMeseGiorno BETWEEN $data1Int AND $data2Int ORDER BY docnum";	
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			die("error");
		}
		else
		{
			while($row2=sqlsrv_fetch_array($result2))
			{
				$row=[];
				foreach ($columns as $column)
				{
					array_push($row,$row2[$column]);
				}
				array_push($rows,$row);
			}
		}
		$response=[];
		
		array_push($response,json_encode($columns));
		array_push($response,json_encode($rows));
		
		echo json_encode($response);
	}
	
?>