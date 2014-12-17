<?PHP
	include 'includor.php';

	$hashedPassword = md5($_POST['password']);
	
	$query = "SELECT username FROM user WHERE username = '".mysql_real_escape_string($_POST['username'])."'";
	$result = mysql_query($query);
	
	if(mysql_num_rows($result) > 0)
	{
		header("Location: ../".REGISNAMETAKEN);
		die();
		// report error, because the username is already taken
	}
		
		
	$query = "SELECT email FROM user WHERE email = '".mysql_real_escape_string($_POST['email'])."'";
	$result = mysql_query($query);
	
	if(mysql_num_rows($result) > 0)
	{
		header("Location: ../".REGISMAILTAKEN);
		die();
		// report error, because the email is already taken
	}

	echo $query = "INSERT INTO user (prename, surname, email, username, password) VALUES('".mysql_real_escape_string($_POST['prename'])."','".mysql_real_escape_string($_POST['surname'])."','".mysql_real_escape_string($_POST['email'])."','".$_POST['username']."','".mysql_real_escape_string($hashedPassword)."')";
	$result = mysql_query($query) 
                or die("Error: ".mysql_error()); 
	
	header("Location: ../".REGISSUCCESS);
?>