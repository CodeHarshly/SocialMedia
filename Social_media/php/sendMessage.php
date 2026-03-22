<?php
ob_start();
session_start();
include('db.php');
header('Content-Type: application/json');

$senderId   = $_SESSION['user_id'];
$receiverId = $conn->real_escape_string($_POST['receiver_id'] ?? '');
$message    = $conn->real_escape_string($_POST['message'] ?? '');

if($senderId && $receiverId && $message) {
    $result = $conn->query("INSERT INTO messages (sender_id, receiver_id, message) VALUES ('{$senderId}','{$receiverId}','{$message}')");
    echo json_encode(['success' => (bool)$result]);
} else {
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
}
$conn->close();
?>
