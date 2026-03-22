<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
ob_start();
session_start();
include('db.php');

$fname = $_POST['fname'];
$username = $_POST['username'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = md5($_POST['password']);
$cpassword = md5($_POST['cpassword']);

if(!empty($fname) && !empty($username) && !empty($email) && !empty($password) && !empty($cpassword)){
    if($password != $cpassword){
        ob_end_clean();
        header("Location: ../login.html?error=Passwords+do+not+match");
        exit;
    }
    $emailQuery = mysqli_query($conn, "SELECT email FROM userdetails WHERE email = '{$email}'");
    $UNQuery = mysqli_query($conn, "SELECT username FROM userdetails WHERE username = '{$username}'");

    if(mysqli_num_rows($emailQuery) > 0){
        ob_end_clean();
        header("Location: ../login.html?error=Email+already+registered");
        exit;
    } else if(mysqli_num_rows($UNQuery) > 0){
        ob_end_clean();
        header("Location: ../login.html?error=Username+already+taken");
        exit;
    } else {
        $random_id = rand(100000000, 999999999);
        $InsertData = mysqli_query($conn, "INSERT INTO userdetails (user_id, fname, username, email, phone, password, otp, verfication, role)
        VALUES ({$random_id},'{$fname}','{$username}','{$email}','{$phone}','{$password}','0','Verified','user')");

        if($InsertData){
            $_SESSION['user_id'] = $random_id;
            $_SESSION['username'] = $username;
            $_SESSION['email'] = $email;
            mysqli_close($conn);
            ob_end_clean();
            header("Location: ../Planner.php");
            exit;
        } else {
            ob_end_clean();
            header("Location: ../login.html?error=Something+went+wrong");
            exit;
        }
    }
} else {
    ob_end_clean();
    header("Location: ../login.html?error=All+fields+required");
    exit;
}
?>