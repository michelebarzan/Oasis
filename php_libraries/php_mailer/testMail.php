<?php

	//https://github.com/PHPMailer/PHPMailer/blob/master/examples/gmail.phps

	require 'php_libraries/php_mailer/Exception.php';
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
	$mail->Subject = 'Test mail php ';
	//$mail->addAttachment('fileDiProva.xlsx');
	$mail->Body = "Sembra funzionare ";
	
	//Bugfix (https://stackoverflow.com/questions/3477766/phpmailer-smtp-error-could-not-connect-to-smtp-host)
	$mail->SMTPOptions = array('ssl' => array('verify_peer' => false,'verify_peer_name' => false,'allow_self_signed' => true));

	if (!$mail->send())
	{
		//echo "Mailer Error: " . $mail->ErrorInfo;
		die("error");
	}
	else
	{
		//echo "Message sent!";
		echo "ok";
	}

?>