<?php 
session_start();
include('db.php');

$userId = $_SESSION['user_id'];
$postId = isset($_POST['post_id']) ? $_POST['post_id'] : '';
$action = isset($_POST['action']) ? $_POST['action'] : '';

if($action == "getlike"){
    header('Content-Type: application/json');
    $sql = "SELECT id, likes, comments FROM posts";
    $result = $conn->query($sql);
    $data = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) $data[] = $row;
    }
    echo json_encode($data);

} else if(!$action && $postId){
    header('Content-Type: application/json');
    $result = $conn->query("INSERT INTO liked (post_id, user_id) VALUES ('{$postId}','{$userId}')");

    if ($result) {
        $conn->query("UPDATE posts SET likes=(SELECT COUNT(post_id) FROM liked WHERE post_id='{$postId}') WHERE id='{$postId}'");

        // Add notification to post owner
        $ownerResult = $conn->query("SELECT user_id FROM posts WHERE id='{$postId}'");
        if($ownerResult && $ownerResult->num_rows > 0) {
            $owner = $ownerResult->fetch_assoc();
            if($owner['user_id'] != $userId) {
                $conn->query("INSERT INTO notifications (user_id, from_user_id, type, post_id) VALUES ('{$owner['user_id']}','{$userId}','like','{$postId}')");
            }
        }
        echo json_encode(['success' => true, 'message' => 'Post liked successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error liking post']);
    }
    $conn->close();
}
?>
