<?php
header('Content-Type: application/json');

// Assuming you have a user_id in session
$userId = $_SESSION['PostId_user'];
$postId = $_SESSION['post_id'];

$data = array("postId" => $postId, "userId" => $userId); // Adjust the data structure as needed
echo json_encode($data);
?>