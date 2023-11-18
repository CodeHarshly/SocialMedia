<?php
$conn = new mysqli("localhost", "root", "", "planner");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>