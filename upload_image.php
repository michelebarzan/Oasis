<?php
	$nImmagini=$_GET['nImmagini'];
	$stazione=$_REQUEST['stazione'];
	$ordine=$_REQUEST['ordine'];
	$stringEncodedList=$_REQUEST['stringEncodedList'];
	$fileNameList=$_REQUEST['fileNameList'];
	
	$stazione = preg_replace('/\s+/', '', $stazione);
	/*if(!is_dir('uploadedimages/'.$ordine))
		mkdir('uploadedimages/'.$ordine);
	if(!is_dir('uploadedimages/'.$ordine.'/'.$stazione))
		mkdir('uploadedimages/'.$ordine.'/'.$stazione);*/
	
	if(!is_dir('\\\\srv-01\\Produzione\\FotoProduzioneAndroid\\'.$ordine))
		mkdir('\\\\srv-01\\Produzione\\FotoProduzioneAndroid\\'.$ordine);
	if(!is_dir('\\\\srv-01\\Produzione\\FotoProduzioneAndroid\\'.$ordine.'/'.$stazione))
		mkdir('\\\\srv-01\\Produzione\\FotoProduzioneAndroid\\'.$ordine.'/'.$stazione);
	
	for ($k = 0 ; $k < $nImmagini; $k++)
	{
		// Get image string posted from Android App
		$base=$stringEncodedList[$k];
		// Get file name posted from Android App
		$filename=$fileNameList[$k];
		// Decode Image
		$binary=base64_decode($base);
		header('Content-Type: bitmap; charset=utf-8');
		// Images will be saved under 'www/imgupload/uplodedimages' folder
		$file = fopen('\\\\srv-01\\Produzione\\FotoProduzioneAndroid\\'.$ordine.'/'.$stazione.'/'.$filename, 'wb');
		// Create File
		fwrite($file, $binary);
		fclose($file);
	}
	echo 'ok';
?>