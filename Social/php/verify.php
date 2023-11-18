<?php
    session_start();
    include('db.php');
    
    $otp1 = $_POST['otp1'];
    $otp2 = $_POST['otp2'];
    $otp3 = $_POST['otp3'];
    $otp4 = $_POST['otp4'];
    $user_id = $_SESSION['user_id'];
    $email = $_SESSION['email'];
    $session_otp = $_SESSION['otp'];
    $otp = $otp1.$otp2.$otp3.$otp4;

    if(!empty($otp)){
        if($otp == $session_otp){
            $sql = mysqli_query($conn, "SELECT * FROM userdetails WHERE email = '{$email}' AND otp = '{$otp}'");
            if(mysqli_num_rows($sql) > 0){
                $null_otp = 0;
                $sql2 = mysqli_query($conn, "UPDATE userdetails SET verfication = 'Verified', otp = '{$null_otp}' WHERE email = '{$email}' AND user_id = '{$user_id}'");
                if($sql2){
                    $row = mysqli_fetch_assoc($sql);
                    if($row){
                        $_SESSION['user_id'] = $row['user_id'];
                        $_SESSION['verfication'] = $row['verfication'];
                        echo "success";
                    }
                }
            }
        } else {
            echo "Wrong OTP :(";
        }
    } else {
        echo "Enter OTP :)";
    }
    mysqli_close($conn);
?>