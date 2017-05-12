<?php
error_reporting(0);

define ("MAX_SIZE","2000"); // максимальный размер 2MB

function getExtension($str){
	$i = strrpos($str,".");
	if (!$i) { return ""; }
	$l = strlen($str) - $i;
	$ext = substr($str,$i+1,$l);
	return $ext;
}

$jsonData = array();
// валидация форматов изобржений
$valid_formats = array("odt", "doc", "docx", "txt", "pdf");
if($_SERVER['REQUEST_METHOD'] == "POST"){
	$uploaddir = "../files/tmp/"; //Image upload directory
	if (!empty($_FILES['doc']['name'])){
		$filename = stripslashes($_FILES['doc']['name']);
		$size = filesize($_FILES['doc']['tmp_name']);
		// конвертация расширения изображений к нижнему регистру
		$ext = getExtension($filename);
		$ext = strtolower($ext);
		// проверка расширения
		if(in_array($ext,$valid_formats)){
			// проверка размера файла
			if ($size < (MAX_SIZE*1024)){
				//$image_name=time().$filename;
				//echo "<img src='".$uploaddir.$image_name."' class='imgList'>";
				$newname=$uploaddir.$filename;				
				// перемещение файла в папку uploads
				move_uploaded_file($_FILES['doc']['tmp_name'], $newname) ? :
				$jsonData['error'] = "Ваш файл не принят";
				
				
			}else{
				$jsonData['error'] = "Большой размер файла";
			}
		}else{
			$jsonData['error'] = "Принимаются только документы. Повторите отправку корректно";;
		}
	}
	if ((!empty($_POST['tel']) or !empty($_POST['email'])) and !isset($jsonData['error'])){
		require './send.php';
		$mail->Body = <<<EOT
Новый заказ из главного сайта:

Шаблон: {$_POST['design']}
Имя: {$_POST['name']}
Телефон: {$_POST['tel']}
E-mail: {$_POST['email']}
Тип оплаты: {$_POST['pay']}
Комментарии к заказу: {$_POST['message']}

EOT;

		//Attach an image file
		if (!empty($_FILES['doc']['name'])){
			$mail->addAttachment($newname);
		}

		//send the message, check for errors
		if (!$mail->send()) {
			$jsonData['error'] = "Mailer Error: " . $mail->ErrorInfo;
		} else {
			if (isset($newname)) unlink($newname);
			$jsonData['success'] = "Заказ отправлен";
		}
	}elseif(empty($jsonData['error'])){
		$jsonData['error'] = "Заполните все поля и/или воспользуйтесь новым броузером";
	}

}
if (empty($jsonData)){
	$jsonData['error'] = "no data";
}
echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);
	//echo json_encode($jsonData);
	//print_r ($jsonData);


