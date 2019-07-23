<?php

	include "connessioneSap.php";
	include "Session.php";

	if(!$conn)
	{
		echo "Impossibile connettersi al database SAP";
		die();
	}
	
	$docnum=$_REQUEST['docnum'];
	$data1=$_REQUEST['data1'];
	$data2=$_REQUEST['data2'];
	$data3=$_REQUEST['data3'];
	
	if($data1=='' || $data1==null)
		$UDF1='NULL';
	else
	{
		$data1=strtotime($data1);
		$UDF1="'".date('d/m/Y',$data1)."'";
	}
	
	if($data2=='' || $data2==null)
		$UDF2='NULL';
	else
	{
		$data2=strtotime($data2);
		$UDF2="'".date('d/m/Y',$data2)."'";
	}
	
	if($data3=='' || $data3==null)
		$UDF3='NULL';
	else
	{
		$data3=strtotime($data3);
		$UDF3="'".date('d/m/Y',$data3)."'";
	}
	
	if(!checkDocNum($conn,$docnum))
	{
		echo "Docnum inesistente";
		die();
	}
	else
	{
		$query2="UPDATE [Oasis_Live].[dbo].[BEAS_FTHAUPT] SET UDF1=$UDF1, UDF2=$UDF2, UDF3=$UDF3 WHERE AUFTRAGINT=$docnum";
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			echo "ok";
		}
	}
		
	function checkDocNum($conn,$docnum)
	{
		$query2="SELECT * FROM [Oasis_Live].[dbo].[BEAS_FTHAUPT] WHERE AUFTRAGINT=$docnum";	
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rows = sqlsrv_has_rows( $result2 );
			if ($rows === true)
			{
				return true;
			}
			else
				return false;
		}
	}
	
?>