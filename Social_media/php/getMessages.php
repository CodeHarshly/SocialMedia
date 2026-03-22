<?php
session_start();
include('db.php');
header('Content-Type: application/json');

$userId  = $_SESSION['user_id'];
$otherId = $conn->real_escape_string($_POST['other_id'] ?? '');

if(!$otherId) { echo json_encode([]); exit; }

$sql = "SELECT m.id, m.sender_id, m.message, m.time, u.username, u.profileimage
        FROM messages m
        JOIN userdetails u ON u.user_id = m.sender_id
        WHERE (m.sender_id='{$userId}' AND m.receiver_id='{$otherId}')
           OR (m.sender_id='{$otherId}' AND m.receiver_id='{$userId}')
        ORDER BY m.time ASC";

$result = $conn->query($sql);
$data = [];
if($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) $data[] = $row;
}

$conn->query("UPDATE messages SET is_read=1 WHERE receiver_id='{$userId}' AND sender_id='{$otherId}'");
$conn->close();
echo json_encode($data);
?>
