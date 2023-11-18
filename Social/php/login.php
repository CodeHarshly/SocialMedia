<?php
    session_start();
    include('db.php');
    
    $Lusername = $_POST['Lusername'];
    $Lpassword = md5($_POST['Lpassword']);

    if(!empty($Lpassword)) {
        if(!empty($Lusername)){
            $sql = mysqli_query($conn, "SELECT user_id, username, email, password FROM userdetails WHERE email = '{$Lusername}' OR username = '{$Lusername}'");
            if(mysqli_num_rows($sql) > 0){
                $row = mysqli_fetch_assoc($sql);
                if($row){
                    if(($Lusername == $row['username'] || $Lusername == $row['email']) && $Lpassword == $row['password']){
                        $_SESSION['username'] = $row['username'];
                        $_SESSION['email'] = $row['email'];
                        $_SESSION['user_id'] = $row['user_id'];
                        echo "success";
                    } else {
                        echo "Enter correct details :(";
                    }
                }
            }
        } else {
            echo "Enter Username or Email :)";
        }
    } else {
        if(empty($Lusername)){
            echo "Enter details :(";
        } else{
            echo "Enter Password :)";
        }
    }
    mysqli_close($conn);
?>