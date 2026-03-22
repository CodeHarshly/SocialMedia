<?php
session_start();
include('db.php');

$userId = $_SESSION['user_id'];
$postIds = json_decode($_POST['postIds'], true);

$validPostIds = [];

foreach ($postIds as $postId) {
    $isLiked = mysqli_query($conn, "SELECT * FROM liked 
        WHERE post_id = '{$postId}' AND user_id = '{$userId}'");

    if (mysqli_num_rows($isLiked) > 0) {
        // If the post has been liked by the user, consider it valid
        $validPostIds[] = $postId;
    }
}
$savePostIds = [];

foreach ($postIds as $postId) {
    $isSaved = mysqli_query($conn, "SELECT * FROM saved 
        WHERE post_id = '{$postId}' AND user_id = '{$userId}'");

    if (mysqli_num_rows($isSaved) > 0) {
        // If the post has been liked by the user, consider it valid
        $savePostIds[] = $postId;
    }
}

// Return the result
echo json_encode(['success' => true, 'validPostIds' => $validPostIds, 'savePostIds' => $savePostIds]);

$conn->close();
?>
