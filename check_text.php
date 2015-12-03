<?php

if(!isset($_POST['benchmarkPath']) || empty($_POST['benchmarkPath'])) {
	die('ERROR: didn\'t provide benchmark...');
}

if(!isset($_POST['your_text_answer']) || empty($_POST['your_text_answer'])) {
	die('ERROR: didn\'t provide answer...');
}

$target_dir = dirname(__FILE__) . "/uploads/";
$target_file = $target_dir . time() . ".txt";
file_put_contents($target_file, $_POST['your_text_answer']);

echo "your answer has been saved as: " . $target_file . "<br />";

// create command for comparison execution
$exec_cmd = "./check_equal_text.py " . $_POST['benchmarkPath'] . " " . $target_file;
$from = array('\\(', '(', '\\)', ')');
$to = array('\\(', '\\(', '\\)', '\\)');
$exec_cmd = str_replace($from, $to, $exec_cmd);

// execute
exec($exec_cmd, $output, $return_val);
echo "output: " . $output[0] . "<br />";
echo "return value: " . $return_val . "<br />";

// remove the uploaded file
unlink($target_file);

?>
