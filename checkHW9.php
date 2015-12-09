<?php

/*
echo 'dumping $_POST<br />'; // use single quote to prevent variables replacing strings

print_r($_POST);

echo 'dumping $_FILES<br />'; // use single quote to prevent variables replacing strings

print_r($_FILES);

die();
*/

/* step 1: checking arguments */
if(!isset($_POST['submit']))
	die('[ERROR] fatal: not coming from a form...');
if(!isset($_POST['detect-type']) || empty($_POST['detect-type']))
	die('[ERROR] fatal: didn\'t provide which detect type you use...');
if(!isset($_FILES['result']['name']) || empty($_FILES['result']['name']))
	die('[ERROR] fatal: no resulted image given...');
if(!isset($_POST['threshold']) || empty($_POST['threshold']))
	die('[ERROR] fatal: no threshold given...');
if(!is_numeric($_POST['threshold']))
	die('[ERROR] fatal: threshold entered is not a number...');

$time_string = time();
$target_dir = dirname(__FILE__) . "/uploads/";
$fileSizeLimit = 1048576; // = 1MB
$fileSizeLimitString = "1MB";
/* step 2: upload resulted image after checking */
$target_file = $target_dir . $time_string . $_POST['detect-type'] . $_POST['threshold'] . basename($_FILES['result']['name']);
// check file type
$check = getimagesize($_FILES['result']['tmp_name']);
if($check == False)
	die('[ERROR] wrong file format: the resulted image you selected is not an image...');
// check file size
if($_FILES['result']['size'] > $fileSizeLimit)
	die("[ERROR] resulted image file too large: file size limit = $fileSizeLimitString ($fileSizeLimit bytes)");
// upload
if(!move_uploaded_file($_FILES['result']['tmp_name'], $target_file))
	die('[ERROR] unknown error happened when uploading resulted image...');


/* step 3: execute python script */
// create flag for checkboxes
$exec_cmd = "python checkHW9.py " . $target_file . " " . $_POST['detect-type'] . " " . $_POST['threshold'];
$from = array('\\(', '(', '\\)', ')');
$to = array('\\(', '\\(', '\\)', '\\)');
$exec_cmd = str_replace($from, $to, $exec_cmd);
exec($exec_cmd, $output, $return_val);
// delete the uploaded file
unlink($target_file);

/*
echo "output: " . $output[0] . "<br />";
echo "return value: " . $return_val . "<br />";
*/
if($return_val == 0) {
	// success
	echo $output[0];
} else {
	// failure
	echo "[ERROR] weird exit status of python script...";
}

?>
