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

	$sql = "SELECT * FROM ranking ORDER BY pontuacao DESC LIMIT 5";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			echo $row["nome"]. ";" . $row["pontuacao"]. ";Nivel: " . $row["nivel"]. ";";
		}
	} else {
		echo "NENHUM RESULTADO";
	}
	$conn->close();
?>