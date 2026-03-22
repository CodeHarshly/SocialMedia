<?php
ob_start();
session_start();
include('db.php');

$Lusername = $_POST['Lusername'];
$Lpassword = md5($_POST['Lpassword']);

if(!empty($Lusername) && !empty($Lpassword)) {
    $sql = mysqli_query($conn, "SELECT user_id, username, email, password FROM userdetails WHERE email = '{$Lusername}' OR username = '{$Lusername}'");
    if(mysqli_num_rows($sql) > 0){
        $row = mysqli_fetch_assoc($sql);
        if(($Lusername == $row['username'] || $Lusername == $row['email']) && $Lpassword == $row['password']){
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];
            $_SESSION['user_id'] = $row['user_id'];
            mysqli_close($conn);
            ob_end_clean();
            header("Location: ../Planner.php");
            exit;
        } else {
            ob_end_clean();
            header("Location: ../login.html?error=" . urlencode("Incorrect username or password"));
            exit;
        }
    } else {
        ob_end_clean();
        header("Location: ../login.html?error=" . urlencode("No account found with those details"));
        exit;
    }
} else {
    ob_end_clean();
    header("Location: ../login.html?error=" . urlencode("Please enter your username and password"));
    exit;
}
mysqli_close($conn);
?>
