<?php 
    session_start();
    include('db.php');

    $userId = $_SESSION['user_id'];
    $postId = $_POST['post_id'];

    if($postId){
        $deleteLiked = "DELETE FROM liked WHERE post_id = '$postId' AND user_id = '$userId'";
        $result = $conn->query($deleteLiked);

        if ($result) {
            $updateQuery = "UPDATE posts
            SET likes = (
                SELECT COUNT(post_id) 
                FROM liked 
                WHERE post_id = '{$postId}'
            )
            WHERE id = '{$postId}'";

            $updateResult = $conn->query($updateQuery);

            if ($updateResult) {
                echo json_encode(['success' => true, 'message' => 'Post unliked successfully and removed liked in posts']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Post unliked successfully but failed to add total']);
            }
            //echo json_encode(['success' => true, 'message' => 'Post unliked successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error unliking post']);
        }
    
        $conn->close();
    }

?>