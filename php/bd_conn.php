<?php
$conn = mysql_connect('localhost:3306', 'ubdd_geophone', 'H3bzDE7y');
if (isset ($conn)) $db = mysql_select_db("bdd_geophone", $conn);
        
if ( phpversion() >= '5.0.7' )
	mysql_set_charset('utf8',$conn);
else
	mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $conn);
?>