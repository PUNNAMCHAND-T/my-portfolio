<?php

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "contact_form_db"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $name = $_POST['name'];
    $phone_number = $_POST['country_code'] . $_POST['number'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $date = $_POST['date'];
    $country = $_POST['country'];
    $message = $_POST['message'];

    $sql = "INSERT INTO contact_form_data (name, phone_number, email, gender, date, country, message)
            VALUES ('$name', '$phone_number', '$email', '$gender', '$date', '$country', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $phone_number = $_POST['country_code'] . $_POST['number'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $date = $_POST['date'];
    $country = $_POST['country'];
    $message = $_POST['message'];

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO contact_form_data (name, phone_number, email, gender, date, country, message)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $name, $phone_number, $email, $gender, $date, $country, $message);

    // Execute the query
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
}

?>

