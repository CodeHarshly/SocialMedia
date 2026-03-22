<?php
session_start();
include('db.php');
header('Content-Type: application/json');

if(!isset($_SESSION['user_id'])) { echo json_encode([]); exit; }

$sql = "SELECT userdetails.user_id, userdetails.profileimage, userdetails.username,
        posts.id, posts.imagepath, posts.caption, posts.likes, posts.comments, posts.time
        FROM userdetails
        INNER JOIN posts ON userdetails.user_id = posts.user_id
        ORDER BY posts.time DESC LIMIT 60";

$result = $conn->query($sql);
$data = [];
if($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) $data[] = $row;
}
$conn->close();
echo json_encode($data);
?>
