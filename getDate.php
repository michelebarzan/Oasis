<?php

	include "connessioneSap.php";
	include "Session.php";

	if(!$conn)
	{
		echo "Impossibile connettersi al database SAP";
		die();
	}
	
	$docnum=$_REQUEST['docnum'];
	
	if(!checkDocNum($conn,$docnum))
	{
		echo "Errore: docnum inesistente";
		die();
	}
	else
	{
		$query2="SELECT UDF1, UDF2, UDF3 FROM [Oasis_Live].[dbo].[BEAS_FTHAUPT] WHERE AUFTRAGINT=$docnum";
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query2."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row2=sqlsrv_fetch_array($result2))
			{
				if($row2['UDF1']=='' || $row2['UDF1']==null)
					$data1='';
				else
				{
					$data1 = convertiData($row2['UDF1']);
					//$data1=strtotime($row2['UDF1']);
					//$data1=date('Y-m-d',$data1);
				}
				if($row2['UDF2']=='' || $row2['UDF2']==null)
					$data2='';
				else
				{
					$data2 = convertiData($row2['UDF2']);
					//$data2=strtotime($row2['UDF2']);
					//$data2=date('Y-m-d',$data2);
				}
				if($row2['UDF3']=='' || $row2['UDF3']==null)
					$data3='';
				else
				{
					$data3 = convertiData($row2['UDF3']);
					//$data3=strtotime($row2['UDF3']);
					//$data3=date('Y-m-d',$data3);
				}
				
				echo $data1."|".$data2."|".$data3;
			}
		}
	}
		
	function convertiData($data)
	{
		$esplosa=explode("/",$data);
		return $esplosa[2]."-".$esplosa[1]."-".$esplosa[0];
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