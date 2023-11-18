<?php
    session_start();
    include('db.php');
    header('Content-Type: application/json');

    $userId = $_SESSION['user_id'];
    $username = $_SESSION['username'];
    
    $uploadPath = "upload";
    $folderPath = $uploadPath . "/" . $userId . "/profile";

    // Create the 'upload' directory if it doesn't exist
    if (!is_dir($uploadPath) && !mkdir($uploadPath, 0777, true)) {
        die('Failed to create "upload" directory...');
    }

    // Create the 'profile' directory if it doesn't exist
    if (!is_dir($folderPath) && !mkdir($folderPath, 0777, true)) {
        die("Failed to create 'profile' directory...");
    }
    $imagePath = $folderPath .'/'. time() . '_' . $_FILES['image']['name'];
    if(move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)){

        $insertImg = mysqli_query($conn, "UPDATE userdetails SET profileimage = '{$imagePath}'
        WHERE username = '{$username}' AND user_id = '{$userId}'");

        if($insertImg){
            $response = ['success' => true];
        } else {
            $response = ['success' => false, 'message' => 'Image path insertion failed.'];
        } 
        
    } else {
        $response = ['success' => false, 'message' => 'Image upload failed.'];
    }
    echo json_encode($response);
    mysqli_close($conn);
?>