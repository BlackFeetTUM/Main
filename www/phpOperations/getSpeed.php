<?PHP
	include 'includor.php';

	$query = "SELECT value FROM paceControl WHERE lectureId = '".$_SESSION['lectureId'])."' AND paceId IN (
				SELECT MAX(paceId) FROM paceControl GROUP BY userId
			)";
			
	$result = mysql_query($query);
	
	$i = 0;
	
	while($line = mysql_fetch_array($result))
	{
		$values[i] = $line['value'];
	}

	$arrResult[0] = $arrResult[1] = $arrResult[2] = $arrResult[3] = $arrResult[4] = 0;

	for($values as $key)
	{
		$arrResult[$key]++;
	}

		
	$result = json_encode($arrResult);
?>