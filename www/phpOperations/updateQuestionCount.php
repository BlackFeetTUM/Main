<?PHP
	include 'includor.php';

	$query = "UPDATE questionAlert SET active='0'
				WHERE lectureId = '".$_SESSION['lectureId']."' AND active='1' LIMIT 1";
	$result = mysql_query($query);
?>