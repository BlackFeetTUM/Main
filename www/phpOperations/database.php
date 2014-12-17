<?php
    $host_name  = "db550747624.db.1and1.com";
    $database   = "db550747624";
    $user_name  = "dbo550747624";
    $password   = "lepassword";

    $connect = mysql_connect($host_name, $user_name, $password, $database);
	
	$db = mysql_select_db($database);
	
?>