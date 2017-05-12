<?php
if (!empty($_POST)){
	$jsonData = "";
	require './send.php';
	$mail->Body = <<<EOT
Обратная связь из сайта:

Имя: {$_POST['feedbackName']}
Связь: {$_POST['feedbackContact']}
Сообщение: {$_POST['feedbackMessage']}

EOT;
	if (!$mail->send()) {
			$jsonData = false;
		} else {
			$jsonData = true;
		}
	if (empty($jsonData)){
		$jsonData = false;
	}
	echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);	
}
