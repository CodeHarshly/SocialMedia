<?php
session_start();
include('db.php');
header('Content-Type: application/json');

$followId = $_POST['profile_id'];
$action   = $_POST['action'];
$userId   = $_SESSION['user_id'];

if($action == "add" || $action == "del"){
    if($followId && $userId){
        if($action == "add"){
            $result = $conn->query("INSERT INTO followers (follower_id, following_id) VALUES ('{$userId}','{$followId}')");
        } else {
            $result = $conn->query("DELETE FROM followers WHERE follower_id='$userId' AND following_id='$followId'");
        }
        if($result){
            $conn->query("UPDATE userdetails SET followers=(SELECT COUNT(user_id) FROM followers WHERE following_id='{$followId}') WHERE user_id='{$followId}'");
            $conn->query("UPDATE userdetails SET following=(SELECT COUNT(user_id) FROM followers WHERE follower_id='{$userId}') WHERE user_id='{$userId}'");

            // Add follow notification
            if($action == "add" && $followId != $userId) {
                $conn->query("INSERT INTO notifications (user_id, from_user_id, type) VALUES ('{$followId}','{$userId}','follow')");
            }
        }
        echo json_encode(['success' => (bool)$result]);
    }
} else if($action == "check"){
    $result = $conn->query("SELECT follower_id FROM followers WHERE follower_id='$userId' AND following_id='$followId'");
    echo json_encode($result && $result->num_rows > 0 ? ['success'] : ['fail']);
}
?>
