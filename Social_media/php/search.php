<?php
    include('db.php');
    // Get the search term from the query string
    $searchTerm = $_GET['query'];

    // Perform a simple search query (you might want to sanitize and validate the input)
    $query = "SELECT user_id, username, profileimage, fname FROM userdetails WHERE username LIKE '%$searchTerm%' ORDER BY LOCATE('$searchTerm', username)";
    $result = $conn->query($query);

    // Fetch results into an array
    $resultsArray = [];
    while ($row = $result->fetch_assoc()) {
        $resultsArray[] = $row;
    }

    // Return results as JSON
    header('Content-Type: application/json');
    echo json_encode($resultsArray);

    // Close the database connection
    $conn->close();
?>
