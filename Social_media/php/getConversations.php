<?php
session_start();
include('db.php');
header('Content-Type: application/json');

$userId = $_SESSION['user_id'];

$sql = "SELECT u.user_id as other_user_id, u.username, u.profileimage, u.fname,
        m.message as last_message, m.time as last_time,
        (SELECT COUNT(*) FROM messages WHERE receiver_id='{$userId}' AND sender_id=u.user_id AND is_read=0) as unread
        FROM (
            SELECT CASE WHEN sender_id='{$userId}' THEN receiver_id ELSE sender_id END as other_id,
                   MAX(id) as max_id
            FROM messages
            WHERE sender_id='{$userId}' OR receiver_id='{$userId}'
            GROUP BY other_id
        ) latest
        JOIN messages m ON m.id = latest.max_id
        JOIN userdetails u ON u.user_id = latest.other_id
        ORDER BY m.time DESC";

$result = $conn->query($sql);
$data = [];
if($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) $data[] = $row;
}
$conn->close();
echo json_encode($data);
?>
