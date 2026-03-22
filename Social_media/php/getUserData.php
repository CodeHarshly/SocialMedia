<?php
    session_start();
    include('db.php');
    header('Content-Type: application/json');
    $userId = $_SESSION['user_id'];
    $username = $_SESSION['username'];
    $id = isset($_POST['id']) ? $_POST['id'] : '';

    if($id){
        $sql = "SELECT id, user_id, profileimage, fname, username, bio, followers, following, posts FROM userdetails
            WHERE user_id = '{$id}'";
        $result = $conn->query($sql);

        $data = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
    } else {
        $sql = "SELECT profileimage, fname, username, bio, followers, following, posts FROM userdetails
            WHERE user_id = '{$userId}' AND username = '{$username}'";
        $result = $conn->query($sql);

        $data = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
    }

    // Close the connection
    $conn->close();

    // Return data as JSON
    echo json_encode($data);

?>
