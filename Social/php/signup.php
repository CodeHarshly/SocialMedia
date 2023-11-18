<?php
session_start();
include('db.php');

$fname = $_POST['fname'];
$username = $_POST['username'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = md5($_POST['password']);
$cpassword = md5($_POST['cpassword']);
$role = 'user';
$verification = 'no';

if(!empty($fname) || !empty($username) || !empty($email) || !empty($phone) || !empty($password) || !empty($cpassword)){

    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
        //check email is not used
        $emailQuery = mysqli_query($conn, "SELECT email FROM userdetails WHERE email = '{$email}'");
        $UNQuery = mysqli_query($conn, "SELECT username FROM userdetails WHERE username = '{$username}'");
    
        if(mysqli_num_rows($emailQuery) > 0){
            echo "$email ~ Already exits :(";
        } else if(mysqli_num_rows($UNQuery) > 0){
            echo "$username ! Already used :(";
        } else{
            if($password == $cpassword){
                $random_id = rand(time(), 100000000);
                $otp = mt_rand(1111, 9999);

                //Insert
                $InsertData = mysqli_query($conn, "INSERT INTO userdetails (user_id, fname, username, email, phone, password, otp, verfication, role)
                VALUES ({$random_id},'{$fname}','{$username}','{$email}','{$phone}','{$password}','{$otp}','{$verification}','{$role}')");

                if($InsertData){
                    $checkData = mysqli_query($conn, "SELECT * FROM userdetails WHERE email = '{$email}'");
                    if(mysqli_num_rows($checkData) > 0){
                        $row = mysqli_fetch_assoc(($checkData));
                        $_SESSION['user_id'] = $row['user_id'];
                        $_SESSION['username'] = $row['username'];
                        $_SESSION['email'] = $row['email'];
                        $_SESSION['otp'] = $row['otp'];

                        if($otp){
                            $reciver = $email;
                            $subject = "From: $fname <$email>";
                            $body = "Name "."$fname \n Email "." $email \n "." $otp";
                            $sender ="From: harshdeepwebsite@gmail.com";

                            if(mail($reciver, $subject, $body, $sender)){
                                echo "success";
                            
                            } else{
                                echo "email problem". mysqli_error($conn);
                            }
                        }
                    }
                } else{
                    echo "something went wrong";
                }
            } else{
                echo " Password do not match";
            }
        }
        }
    } else{
    echo 'All input fields required';
}
mysqli_close($conn);
?>