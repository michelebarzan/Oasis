<?php

	include "Session.php";
	include "connessione.php";
	
	$data1=$_REQUEST["data1"];	
	$data2=$_REQUEST["data2"];
	$orderBy=$_REQUEST["orderBy"];	
	$orderType=$_REQUEST["orderType"];
	$columns=json_decode($_REQUEST['JSONcolumns']);
	
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
	
	//$columns=['data_creazione','numero_documento','data_scadenza','codice_cliente_fornitore','nome_cliente_fornitore','causale','linea_business','collezione','standard_fuori_standard','note','area_manager','ragg_stat','slp_name','finitura','doc_total'];
	$rows=[];
	
	$query2="SELECT * FROM report_ufficio_vendite_view WHERE annoMeseGiorno BETWEEN $data1Int AND $data2Int ORDER BY $orderBy $orderType";	
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
				array_push($row,utf8_encode($row2[$column]));
			}
			array_push($rows,$row);
			
		}
	}
	//$response=[];
	
	//array_push($response,json_encode($columns));
	//array_push($response,json_encode($rows));

	//echo json_encode($response);

	echo json_encode($rows);
	
?>