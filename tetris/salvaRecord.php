<?php
	$servername = "db";
	$username = "root";
	$password = "MyBestPassword123";
	$dbname = "tetris";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection Error...");
	} 
	
	$nome = $_POST['nome'];
	$pontuacao = $_POST['pontuacao'];
	$nivel = $_POST['nivel'];
	
	$sql = "INSERT INTO ranking (nome, pontuacao, nivel) VALUES ('$nome', '$pontuacao', '$nivel')";
	
	if ($conn->query($sql) === TRUE) {
    echo "Novo Record Registrado!";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	$conn->close();
?>