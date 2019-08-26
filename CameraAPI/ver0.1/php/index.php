<?php
const FILE = "file.txt";

$data = $_POST["data"];
if(!isset($data)) return;

touch(FILE);
file_put_contents(FILE, $data);
?>