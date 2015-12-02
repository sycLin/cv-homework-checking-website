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
if(!isset($_FILES['src']['name']) || empty($_FILES['src']['name']))
	die('[ERROR] fatal: no src image (noisy image) given...');
if($_FILES['processed']['error'][0] == "4")
	die('[ERROR] fatal: no processed images (de-noised images) given...');

$time_string = time();
$target_dir = dirname(__FILE__) . "/uploads/";
$fileSizeLimit = 1048576; // = 1MB
$fileSizeLimitString = "1MB";
$filesArray = array(); // store all of the file names for execution
/* step 2: upload src image after checking */
$target_file = $target_dir . $time_string . basename($_FILES['src']['name']);
// check file type
$check = getimagesize($_FILES['src']['tmp_name']);
if($check == False)
	die('[ERROR] wrong file format: src is not an image...');
// check file size
if($_FILES['src']['size'] > $fileSizeLimit)
	die("[ERROR] src file too large: file size limit = $fileSizeLimitString ($fileSizeLimit bytes)");
// upload
if(!move_uploaded_file($_FILES['src']['tmp_name'], $target_file))
	die('[ERROR] unknown error happened when uploading src image...');
// record in the _filesArray_
array_push($filesArray, $target_file);

/* step 3: upload processed images after checking */
for($i = 0; $i < count($_FILES['processed']['name']); $i = $i + 1) {
	$target_file = $target_dir . $time_string . basename($_FILES['processed']['name'][$i]);
	// check file type
	if(!getimagesize($_FILES['processed']['tmp_name'][$i]))
		die('[ERROR] wrong file format: not an image: ' . basename($_FILES['processed']['name'][$i]));
	// check file size
	if($_FILES['processed']['size'][$i] > $fileSizeLimit)
		die('[ERROR] file too large: ' . basename($_FILES['processed']['name'][$i]) . '(file size limit = ' . $fileSizeLimitString . ')');
	// upload
	if(!move_uploaded_file($_FILES['processed']['tmp_name'][$i], $target_file))
		die('[ERROR] unknown error happend when uploading ' . basename($_FILES['processed']['name'][$i]));
	// record it in the _filesArray_
	array_push($filesArray, $target_file);
}

/* step 4: execute python script */
// create flag for checkboxes
$flag = 0;
if(isset($_POST['box3']))
	$flag = $flag | 1;
if(isset($_POST['box5']))
	$flag = $flag | 2;
if(isset($_POST['med3']))
	$flag = $flag | 4;
if(isset($_POST['med5']))
	$flag = $flag | 8;
if(isset($_POST['otc']))
	$flag = $flag | 16;
if(isset($_POST['cto']))
	$flag = $flag | 32;
$exec_cmd = "python checkHW8.py" . " " . $flag;
for($i = 0; $i < count($filesArray); $i = $i + 1)
	$exec_cmd = $exec_cmd . " " . $filesArray[$i];
$from = array('\\(', '(', '\\)', ')');
$to = array('\\(', '\\(', '\\)', '\\)');
$exec_cmd = str_replace($from, $to, $exec_cmd);
exec($exec_cmd, $output, $return_val);
// delete all the uploaded files
foreach($filesArray as $file) {
	unlink($file);
}
/*
echo "output: " . $output[0] . "<br />";
echo "return value: " . $return_val . "<br />";
*/
if($return_val == 0) {
	// success
	echo $output[0];
} else {
	// failure
	echo "Error.";
}
?>
