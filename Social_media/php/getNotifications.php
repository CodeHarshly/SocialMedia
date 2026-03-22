<?php
session_start();
include('db.php');
header('Content-Type: application/json');

$userId = $_SESSION['user_id'];

$sql = "SELECT n.id, n.type, n.post_id, n.time, n.is_read,
        u.username, u.profileimage,
        p.imagepath
        FROM notifications n
        JOIN userdetails u ON u.user_id = n.from_user_id
        LEFT JOIN posts p ON p.id = n.post_id
        WHERE n.user_id = '{$userId}'
        ORDER BY n.time DESC LIMIT 30";

$result = $conn->query($sql);
$data = [];
if($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) $data[] = $row;
}

$countResult = $conn->query("SELECT COUNT(*) as unread FROM notifications WHERE user_id='{$userId}' AND is_read=0");
$unread = $countResult ? $countResult->fetch_assoc()['unread'] : 0;

$conn->query("UPDATE notifications SET is_read=1 WHERE user_id='{$userId}'");

$conn->close();
echo json_encode(['notifications' => $data, 'unread' => $unread]);
?>
