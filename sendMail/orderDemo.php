<?php
if (!empty($_POST)){
	$jsonData = "";
	require './send.php';
	$mail->Body = "Запрос на создание сайта:\n";
	foreach ($_POST as $value){
        if (is_array($value)){
            foreach ($value as $item){
                if ($value != ""){
                    $mail->Body .= $item."\n";
                }
            }
        }elseif($value != ""){
            $mail->Body .= $value."\n";
        }
    }
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
