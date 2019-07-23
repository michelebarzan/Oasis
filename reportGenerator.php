<?php

	include "connessione.php";
	
	//EXCEL---------------------------------------------------------------------------------

	require 'php_libraries/php_office/vendor/autoload.php';
	
	require 'php_libraries/php_mailer/Exception.php';
	require 'php_libraries/php_mailer/PHPMailer.php';
	require 'php_libraries/php_mailer/SMTP.php';

	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	
	$reportList=[];
	$reportPkList=[];
	$subjectList=[];
	$messageList=[];
	
	$queryR="SELECT * FROM report_list WHERE active='true'";
	$resultR=sqlsrv_query($conn,$queryR);
	if($resultR==FALSE)
	{
		echo "<br><br>Errore esecuzione query<br>Query: ".$queryR."<br>Errore: ";
		die(print_r(sqlsrv_errors(),TRUE));
	}
	else
	{
		while($rowR=sqlsrv_fetch_array($resultR))
		{
			array_push($reportList,$rowR['report']);
			$subjectList[$rowR['report']]=$rowR['oggetto'];
			$messageList[$rowR['report']]=$rowR['testo'];
			$reportPkList[$rowR['report']]=$rowR['id_report'];
		}
	}
	
	//$reportList=['report_stato_consegne_parziale'];
	$lettersArray=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI'];
	
	foreach($reportList as $view)
	{
		createExcel($conn,$view,$lettersArray);
		sendMail($view,$conn,$subjectList,$messageList,$reportPkList);
	}
	
	function createExcel($conn,$view,$lettersArray)
	{
		$columns=[];
		$dataTypes=[];
		$spreadsheet = new Spreadsheet();
		$sheet = $spreadsheet->getActiveSheet();
		
		getColumnsAndDataTypes($conn,$view,$columns,$dataTypes);
		
		$colNum=0;
		foreach($columns as $column)
		{
			$sheet->setCellValue($lettersArray[$colNum]."1", $column);
			$colNum++;
		}
		
		$queryRighe="SELECT * FROM $view";
		$resultRighe=sqlsrv_query($conn,$queryRighe);
		if($resultRighe==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$queryRighe."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			$rowNum=2;
			while($rowRighe=sqlsrv_fetch_array($resultRighe))
			{
				$colNum=0;
				foreach($columns as $column)
				{
					$sheet->setCellValue($lettersArray[$colNum].$rowNum, $rowRighe[$column]);
					$colNum++;
				}
				$rowNum++;
			}
		}
		
		$writer = new Xlsx($spreadsheet);
		$writer->save("excelReport\\$view.xlsx");
	}
	function sendMail($view,$conn,$subjectList,$messageList,$reportPkList)
	{
		$mail = new PHPMailer;
		$mail->isSMTP();
		$mail->Host = 'smtp.office365.com';
		$mail->Port = 587;
		$mail->SMTPSecure = 'tls';
		$mail->SMTPAuth = true;
		$mail->Username = "michele@servizioglobale.it";
		$mail->Password = "Maddalena123";
		
		//From
		$mail->setFrom('michele@servizioglobale.it', 'Michele Barzan');
		//To
		$query3="SELECT * FROM destinatari_report WHERE report=".$reportPkList[$view];	
		$result3=sqlsrv_query($conn,$query3);
		if($result3==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query3."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row3=sqlsrv_fetch_array($result3))
			{
				$mail->addAddress(getMailDestinatario($conn,$row3['utente']), getNomeDestinatario($conn,$row3['utente']));
				//echo "<br>";
				//echo "Mail destinatario: ".getMailDestinatario($conn,$row3['utente']);
				//echo "<br>";
				//echo "Nome destinatario: ".getNomeDestinatario($conn,$row3['utente']);
			}
		}
		//$mail->addAddress('michele@servizioglobale.it', 'Michele Barzan');
		//$mail->Subject = 'Test mail excel ';
		$mail->Subject = $subjectList[$view];
		//echo "<br>";
		//echo "Oggetto: ".$subjectList[$view];
		$mail->addAttachment("excelReport\\$view.xlsx");
		//$mail->Body = "Report excel generato automaticamente";
		$mail->Body = $messageList[$view];
		//echo "<br>";
		//echo "Testo: ".$messageList[$view];
		
		$mail->SMTPOptions = array('ssl' => array('verify_peer' => false,'verify_peer_name' => false,'allow_self_signed' => true));

		$result="";

		if (!$mail->send())
		{
			//echo "Mailer Error: " . $mail->ErrorInfo;
			$result="error";
		}
		else
		{
			//echo "Message sent!";
			$result="ok";
		}
		$query2="INSERT INTO [dbo].[log_reportGenerator] ([data],[esito],[report]) VALUES (getdate(),'$result','$view')";	
		$result2=sqlsrv_query($conn,$query2);
		if($result2==FALSE)
		{
			echo "log error | ";
		}
		echo $result;
	}
	
	function getMailDestinatario($conn,$id_utente)
	{
		$query1="SELECT mail FROM utenti WHERE id_utente=$id_utente";	
		$result1=sqlsrv_query($conn,$query1);
		if($result1==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query1."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result1))
			{
				return $row["mail"];
			}
		}
	}
	function getNomeDestinatario($conn,$id_utente)
	{
		$query1="SELECT nome,cognome FROM utenti WHERE id_utente=$id_utente";	
		$result1=sqlsrv_query($conn,$query1);
		if($result1==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query1."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result1))
			{
				return $row["nome"]." ".$row["cognome"];
			}
		}
	}
	function getColumnsAndDataTypes($conn,$view,&$columns,&$dataTypes)
	{
		$query1="SELECT *
				FROM Cecklist.INFORMATION_SCHEMA.COLUMNS
				WHERE TABLE_NAME = N'$view'";	
		$result1=sqlsrv_query($conn,$query1);
		if($result1==FALSE)
		{
			echo "<br><br>Errore esecuzione query<br>Query: ".$query1."<br>Errore: ";
			die(print_r(sqlsrv_errors(),TRUE));
		}
		else
		{
			while($row=sqlsrv_fetch_array($result1))
			{
				array_push($columns,$row["COLUMN_NAME"]);
				$dataTypes[$row["COLUMN_NAME"]]=$row["DATA_TYPE"];
			}
		}
	}
	
	//MAIL------------------------------------------------------------------------------------
	
	/*require 'php_libraries/php_mailer/Exception.php';
	require 'php_libraries/php_mailer/PHPMailer.php';
	require 'php_libraries/php_mailer/SMTP.php';

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	$mail = new PHPMailer;
	$mail->isSMTP();
	$mail->Host = 'smtp.office365.com';
	$mail->Port = 587;
	$mail->SMTPSecure = 'tls';
	$mail->SMTPAuth = true;
	$mail->Username = "michele@servizioglobale.it";
	$mail->Password = "Maddalena123";
	
	//From
	$mail->setFrom('michele@servizioglobale.it', 'Michele Barzan');
	//To
	$mail->addAddress('michele@servizioglobale.it', 'Michele Barzan');
	$mail->Subject = 'Test mail excel ';
	$mail->addAttachment('excelReport\test.xlsx');
	$mail->Body = "Report excel generato automaticamente";
	
	$mail->SMTPOptions = array('ssl' => array('verify_peer' => false,'verify_peer_name' => false,'allow_self_signed' => true));

	$result="";

	if (!$mail->send())
	{
		//echo "Mailer Error: " . $mail->ErrorInfo;
		$result="error";
	}
	else
	{
		//echo "Message sent!";
		$result="ok";
	}
	$query2="INSERT INTO [dbo].[log_reportGenerator] ([data],[esito]) VALUES (getdate(),'$result')";	
	$result2=sqlsrv_query($conn,$query2);
	if($result2==FALSE)
	{
		echo "log error | ";
	}
	echo "report $result";*/
?>