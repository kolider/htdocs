<?php

//date_default_timezone_set('Etc/UTC');
date_default_timezone_set('Etc/GMT+2');

require './PHPMailerAutoload.php';


$errors = array();
$form_data = array();

if ($_POST['name'] == "")
    {
        $errors['name'] = 'Введите Ваше имя';
    }

if ($_POST['lastName'] == "")
{
    $errors['name'] = 'Фамилия не указана';
}

if (!empty($errors))
    {
        $form_data['success'] = false;
        $form_data['errors']  = $errors;
    }
else
    {
		//Create a new PHPMailer instance
		$mail = new PHPMailer;
		$mail->CharSet = 'UTF-8';
		//Tell PHPMailer to use SMTP
		$mail->isSMTP();

		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = 0;

		//Ask for HTML-friendly debug output
		//$mail->Debugoutput = 'html';

		//Set the hostname of the mail server
		$mail->Host = 'smtp.yandex.ru';
		// use
		// $mail->Host = gethostbyname('smtp.gmail.com');
		// if your network does not support SMTP over IPv6

		//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
		$mail->Port = 465;
		
		
		//Set the encryption system to use - ssl (deprecated) or tls
		//$mail->SMTPSecure = 'tls';
		$mail->SMTPSecure = 'ssl';

		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;

		//Username to use for SMTP authentication - use full email address for gmail
		$mail->Username = "no-reply@credolove.com";

		//Password to use for SMTP authentication
		$mail->Password = "FireWater1a2basd";

		//Set who the message is to be sent from
		$mail->setFrom('no-reply@credolove.com', 'CredoLove');
		

		//Set an alternative reply-to address
		//$mail->addReplyTo('info@credolove.com');

		//$mail->AddBCC('info@credolove.com');
		
		//Set who the message is to be sent to
		$mail->addAddress('olyashkaolka@gmail.com');

		//Set the subject line
		$mail->Subject = 'Новый гость на Вашу свадьбу';

		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		$mail->isHTML(false);
		$mail->Body = <<<EOT
На Вашу свадьбу подвердили присутствие
Имя: {$_POST['name']}
Фамилия: {$_POST['lastName']}
EOT;

		//Attach an image file
		//$mail->addAttachment('images/phpmailer_mini.png');

		//send the message, check for errors
		if (!$mail->send()) {
			$form_data['success'] = false;
			$form_data['errors'] = "Mailer Error: " . $mail->ErrorInfo;
		} else {
			$form_data['success'] = true;
			$form_data['posted'] = 'Мы приняли вашу заявку';
		}
    }
echo json_encode($form_data);





