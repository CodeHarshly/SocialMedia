<?php 
    session_start();
    include('db.php');

    $userId = $_SESSION['user_id'];
    $postId = $_POST['post_id'];
    $action = $_POST['action'];

    if($action == "saved"){
        $insertSaved = "INSERT INTO saved (post_id, user_id)
            VALUES ('{$postId}','{$userId}')";
            $result = $conn->query($insertSaved);
    
        if ($result) {
                echo json_encode(['success' => false, 'message' => 'Post saved successfully ']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error saving post']);
        }
        
        $conn->close();

    } else if($action == "unsaved" && $postId){
        $deleteSaved = "DELETE FROM saved WHERE post_id = '$postId' AND user_id = '$userId'";
        $result = $conn->query($deleteSaved);

        if ($result) {
            echo json_encode(['success' => false, 'message' => 'Post saved successfully ']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error saving post']);
        }
    
        $conn->close();

    }

?>