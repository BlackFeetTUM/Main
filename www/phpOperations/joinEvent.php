<?PHP
	include 'includor.php';

	$_SESSION['lectureId'] = '';
	
	
	$query = "SELECT lectureId, name FROM lectures WHERE password = '".mysql_real_escape_string($_POST['event_password'])."'";
	$result = mysql_query($query);
	while($line = mysql_fetch_array($result))
	{
		$_SESSION['lectureId'] = $line['lectureId'];
		$_SESSION['lectureName'] = $line['name'];
	}
	
	if($_SESSION['lectureId'] != "")
	{
		$query = "INSERT INTO session (userId, lectureId, role) VALUES('".$_SESSION['userId']."','".$_SESSION['lectureId']."','0')";
		$result = mysql_query($query);
		header("Location: ../".LECTURELOGINSUCCESS);
		die();
	}
	else
	{
		header("Location: ../".LECTURELOGINFAIL);
		die();
	}
	
?>