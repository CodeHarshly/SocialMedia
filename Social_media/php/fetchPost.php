<?php
    session_start();
    include('db.php');
    header('Content-Type: application/json');
    
    // Assuming you have a user_id in session
    $userId = $_SESSION['user_id'];
    $action = $_POST['action'];
    $id = isset($_POST['id']) ? $_POST['id'] : '';

    if($id && $action == "search"){
        $sql = "SELECT userdetails.id, userdetails.user_id, userdetails.profileimage, userdetails.username, posts.id, posts.imagepath, posts.caption, posts.likes, posts.comments, posts.shares, posts.time
            FROM userdetails
            LEFT JOIN posts ON userdetails.user_id = posts.user_id
            WHERE userdetails.id = '{$id}'
            ORDER BY posts.time DESC";

        $result = $conn->query($sql);

        $data = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

    } else if($action == "user"){
        $sql = "SELECT userdetails.user_id, userdetails.profileimage, userdetails.username, posts.id, posts.imagepath, posts.caption, posts.likes, posts.comments, posts.shares, posts.time
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

    } else if($action == "follow"){

        // Main SQL query using the subquery to filter results for all following_ids
        $sql = "SELECT userdetails.user_id, userdetails.profileimage, userdetails.username, posts.id, posts.imagepath, posts.caption, posts.likes, posts.comments, posts.shares, posts.time
            FROM userdetails
            LEFT JOIN posts ON userdetails.user_id = posts.user_id
            WHERE userdetails.user_id IN (SELECT following_id FROM followers WHERE follower_id = '{$userId}') OR userdetails.user_id = '{$userId}'
            ORDER BY posts.time DESC";

        $result = $conn->query($sql);

        $data = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
    }
    /*

    // Subquery to get the following_ids of the specified user (follower_id)
    $subQuery = "SELECT following_id FROM followers WHERE follower_id = '{$userId}'";

    // Main SQL query using the subquery to filter results for all following_ids
    $sql = "SELECT userdetails.user_id, userdetails.profileimage, userdetails.username, posts.id, posts.imagepath, posts.caption, posts.likes, posts.comments, posts.shares, posts.time
            FROM userdetails
            LEFT JOIN posts ON userdetails.user_id = posts.user_id
            WHERE userdetails.user_id IN ({$subQuery})
            ORDER BY posts.time DESC";

    */
    // Close the connection
    $conn->close();

    // Return data as JSON
    echo json_encode($data);
?>