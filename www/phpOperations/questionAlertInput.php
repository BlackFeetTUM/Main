<?PHP
	include 'includor.php';
	
	$query = "INSERT INTO questionAlert (active, timestamp, userId, lectureId) VALUES('1','".date("Y-m-d H:i:s")."','".$_SESSION['userId']."','".$_SESSION['lectureId']."')";
	$result = mysql_query($query);
	
?>