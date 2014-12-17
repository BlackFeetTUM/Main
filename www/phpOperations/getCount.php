<?PHP
	include 'includor.php';

	$query = "SELECT COUNT(*) FROM session WHERE lectureId = '".$_SESSION['lectureId']."' AND role = '0'";
			
	$result = mysql_query($query);
	
	$line = mysql_fetch_array($result);
	$count = $line[0];
		
	echo $count;
?>