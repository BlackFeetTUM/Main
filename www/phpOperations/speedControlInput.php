<?PHP
	$query = "INSERT INTO paceId (value, timestamp, userId, lectureId) VALUES('".$_POST['speedValue']."','".time()."','".$_SESSION['userId']."','".$_SESSION['lectureId']."')";
	$result = mysql_query($query);
?>