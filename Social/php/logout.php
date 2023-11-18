<?php
session_start();

if (isset($_SESSION['user_id'])) {
    session_unset();
    session_destroy();

    header("Location: /Social/account");
    exit();
} else {
    // Redirect to the login page if the user is not logged in
    header("Location: /Social/account");
    exit();
}
?>
