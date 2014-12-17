<?PHP
	include 'includor.php';

	$_SESSION['lectureId'] = '';
	
	
	$passwordFound = false;
	
	$length = 10;
	
	while($passwordFound == false)
	{
		$key = time()+rand(0, 10000000);
		$password=md5($key);
		$password = substr($password, 5, 10);
		$query = "SELECT password FROM lectures WHERE password = '".mysql_real_escape_string($password)."'";
		$result = mysql_query($query);
		
		if(@mysql_num_fields($result) < 0)
			$passwordFound = true;
			$passwordFound = true;
	}
	
	$query = "INSERT INTO lectures (name, startDate, active, password) VALUES('".mysql_real_escape_string($_POST['name'])."','".mysql_real_escape_string(date("Y-m-d H:i:s"))."','1','".mysql_real_escape_string($password)."')";
	$result = mysql_query($query);
	
	
	$query = "SELECT lectureId, password FROM lectures WHERE password = '".mysql_real_escape_string($password)."'";
	$result = mysql_query($query);
	while($row = mysql_fetch_array($result))
	{
		$_SESSION['lectureId'] = $row['lectureId'];
	}
	
	$_SESSION['lecturePw'] = $password;
	
	$query = "INSERT INTO session (userId, lectureId, role) VALUES('".$_SESSION['userId']."','".$_SESSION['lectureId']."','1')";
	$result = mysql_query($query);
	
	if($result)
		header("Location: ../".LECTURECREATIONSUCCESS);
	else
		header("Location: ../".LECTURECREATIONFAIL);
	
?>