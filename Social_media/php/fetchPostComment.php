<?php
    session_start();
    include('db.php');
    header('Content-Type: application/json');
    
    // Assuming you have a user_id in session
    $userId = $_SESSION['user_id'];
    //$postUserId = $_POST['PostId_user'];
    $postId = $_POST['post_id'];
    
    $sql = "SELECT userdetails.user_id, userdetails.profileimage, userdetails.username,comments.id, comments.post_id, comments.comment, comments.time
                FROM userdetails
                INNER JOIN comments ON userdetails.user_id = comments.user_id
                WHERE comments.post_id = '{$postId}'
                ORDER BY comments.time DESC";

    $result = $conn->query($sql);

    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;

        }
        
    }

    // Close the connection
    $conn->close();

    // Return data as JSON
    echo json_encode($data);
?>