<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: account");
    exit(); 
} else{      //Add here logic for detecting link to redirect to specgic page
    //$page = isset($_GET['page']) ? $_GET['page'] : '';

    // Add logic to include the appropriate content based on the value of $page
    //if ($page) {
        // Assuming all content is in index.html
    include("index.html");
        //exit();
    //}
}
?>