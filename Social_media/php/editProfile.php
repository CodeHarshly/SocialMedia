<?php
ob_start();
session_start();
include('db.php');
header('Content-Type: application/json');

$userId = $_SESSION['user_id'];
$fname    = $conn->real_escape_string($_POST['fname'] ?? '');
$bio      = $conn->real_escape_string($_POST['bio'] ?? '');
$username = $conn->real_escape_string($_POST['username'] ?? '');

if(empty($username)) {
    echo json_encode(['success' => false, 'message' => 'Username required']);
    exit;
}

$check = $conn->query("SELECT user_id FROM userdetails WHERE username = '{$username}' AND user_id != '{$userId}'");
if($check && $check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username already taken']);
    exit;
}

$result = $conn->query("UPDATE userdetails SET fname='{$fname}', bio='{$bio}', username='{$username}' WHERE user_id='{$userId}'");

if($result) {
    $_SESSION['username'] = $username;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Update failed']);
}
$conn->close();
?>
