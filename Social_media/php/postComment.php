<?php 
session_start();
include('db.php');
header('Content-Type: application/json');

$userId  = $_SESSION['user_id'];
$postId  = $_POST['post_id'];
$comment = $conn->real_escape_string($_POST['comment']);

if($postId && $comment){
    $result = $conn->query("INSERT INTO comments (post_id, user_id, comment) VALUES ('{$postId}','{$userId}','{$comment}')");

    if ($result) {
        $commentId = $conn->insert_id;
        $conn->query("UPDATE posts SET comments=(SELECT COUNT(post_id) FROM comments WHERE post_id='{$postId}') WHERE id='{$postId}'");

        // Add notification to post owner
        $ownerResult = $conn->query("SELECT user_id FROM posts WHERE id='{$postId}'");
        if($ownerResult && $ownerResult->num_rows > 0) {
            $owner = $ownerResult->fetch_assoc();
            if($owner['user_id'] != $userId) {
                $conn->query("INSERT INTO notifications (user_id, from_user_id, type, post_id) VALUES ('{$owner['user_id']}','{$userId}','comment','{$postId}')");
            }
        }
        echo json_encode(['success' => true, 'message' => 'Comment added', 'commentId' => $commentId]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add comment']);
    }
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid post ID or comment']);
}
?>
