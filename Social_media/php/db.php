<?php
$conn = new mysqli("sql101.infinityfree.com", "if0_41449887", "Singh9906", "if0_41449887_Social_media");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>