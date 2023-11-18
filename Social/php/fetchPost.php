<?php
    session_start();
    include('db.php');
    header('Content-Type: application/json');
    
    // Assuming you have a user_id in session
    $userId = $_SESSION['user_id'];

    $sql = "SELECT userdetails.profileimage, userdetails.username, posts.imagepath, posts.caption, posts.time
            FROM userdetails
            LEFT JOIN posts ON userdetails.user_id = posts.user_id
            WHERE userdetails.user_id = '{$userId}'
            ORDER BY posts.time DESC";

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