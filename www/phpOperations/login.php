<?PHP
	include 'includor.php';

	$_SESSION['userId'] = '';
	
	$hashedPassword = md5($_POST['login_password']);
	
	$query = "SELECT userId, username FROM user WHERE username = '".mysql_real_escape_string($_POST['username'])."' AND password = '".mysql_real_escape_string($hashedPassword)."'";
	$result = mysql_query($query);
	while($line = mysql_fetch_array($result))
	{
		$_SESSION['userId'] = $line['userId'];
		$_SESSION['username'] = $line['username'];
	}
	
	if($_SESSION['userId'] != "")
	{
		header("Location: ../".LOGINSUCCESSPAGE);
		die();
	}
	else
	{
		header("Location: ../".LOGINFAILPAGE);
		die();
	}
	
?>