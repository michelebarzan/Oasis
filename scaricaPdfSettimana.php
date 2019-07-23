<?php

	$week=$_POST['scaricaPdfSettimanaFormSettimana'];
	$stazione=$_POST['scaricaPdfSettimanaFormStazione'];
	
	$settimanaTmp=substr($week, 0, 4)."-".substr($week, 4, 6);
	
	$file="C:\\xampp\\htdocs\\oasis\\files\\stampe_settimane\\".$stazione."_".$settimanaTmp.".pdf";
	
	if (file_exists($file)) 
	{
		echo "ok1";
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename="'.basename($file).'"');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($file));
		readfile($file);
		//Cancello file pdf
		exec('del "C:\\xampp\\htdocs\\oasis\\files\\stampe_settimane\\'.$stazione.'_'.$settimanaTmp.'.pdf"');
		exit;
	}
	else
		echo "filenotfound";
	
?>