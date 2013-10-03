<?php
session_start();

include ('bd_conn.php');

$data_array = array();
$user_ = $_POST['user'];
$ahora_ = date("Y-m-d H:i:s", time());

$latitude_js = $user_['latitude'];
$longitude_js = $user_['longitude'];
$altitude_js = $user_['altitude'];
$accuracy_js = $user_['accuracy'];
$altitudeAccuracy_js = $user_['altitudeAccuracy'];
$heading_js = $user_['heading'];
$speed_js = $user_['speed'];
$timestamp_js = $user_['timestamp'];

$env = $user_['env'];
$env_appName = $user_['env']['appName'];
$env_resolution = $user_['env']['resolution'];
$env_userAgent = $user_['env']['userAgent'];
$env_jsscreen = $user_['env']['screen'];	
$env_browser_name = (isset($user_['env']['browser']['name']))? $user_['env']['browser']['name'] : '';
$env_browser_version = (isset($user_['env']['browser']['version']))? $user_['env']['browser']['version'] : '';
$env_jsnav = trim($env_browser_name.' '.$env_browser_version);	
$env_engine_name = (isset($user_['env']['engine']['name']))? $user_['env']['engine']['name'] : '';
$env_engine_version = (isset($user_['env']['engine']['version']))? $user_['env']['engine']['version'] : '';
$env_jsengine = trim($env_engine_name.' '.$env_engine_version);		
$env_os_name = (isset($user_['env']['os']['name']))? $user_['env']['os']['name'] : '';
$env_os_version = (isset($user_['env']['os']['version']))? $user_['env']['os']['version'] : '';
$env_jsso = trim($env_os_name.' '.$env_os_version);	
$env_device_model = (isset($user_['env']['device']['model']))? $user_['env']['device']['model'] : '';
$env_device_vendor = (isset($user_['env']['device']['vendor']))? $user_['env']['device']['vendor'] : '';
$env_device_type = (isset($user_['env']['device']['type']))? $user_['env']['device']['type'] : '';
$env_jsdevice = trim($env_device_model.' '.$env_device_vendor.' '.$env_device_type);	
$env_jscpu = (isset($user_['env']['cpu']['architecture']))? $user_['env']['cpu']['architecture'] : '';

$ip = $_SERVER['REMOTE_ADDR'];
$session = session_id();

$sql_fields_reg = 'session,'; $sql_values_reg = "'".$session."',";
$sql_fields_reg .= 'fecha,'; $sql_values_reg .= "'".$ahora_."',";
$sql_fields_reg .= 'ip,'; $sql_values_reg .= "'".$ip."',";
$sql_fields_reg .= 'jsnav,'; $sql_values_reg .= "'".$env_jsnav."',";
$sql_fields_reg .= 'jsscreen,'; $sql_values_reg .= "'".$env_jsscreen."',";
$sql_fields_reg .= 'jsso,'; $sql_values_reg .= "'".$env_jsso."',";
$sql_fields_reg .= 'jsresolution,'; $sql_values_reg .= "'".$env_resolution."',";
$sql_fields_reg .= 'jsuserAgent,'; $sql_values_reg .= "'".addslashes($env_userAgent)."',";
$sql_fields_reg .= 'jsappName,'; $sql_values_reg .= "'".$env_appName."',";
$sql_fields_reg .= 'jsengine,'; $sql_values_reg .= "'".$env_jsengine."',";
$sql_fields_reg .= 'jsdevice,'; $sql_values_reg .= "'".$env_jsdevice."',";
$sql_fields_reg .= 'jscpu,'; $sql_values_reg .= "'".$env_jscpu."',";
$sql_fields_reg .= 'latitude_js,'; $sql_values_reg .= "'".$latitude_js."',";
$sql_fields_reg .= 'longitude_js,'; $sql_values_reg .= "'".$longitude_js."',";
$sql_fields_reg .= 'altitude_js,'; $sql_values_reg .= "'".$altitude_js."',";
$sql_fields_reg .= 'accuracy_js,'; $sql_values_reg .= "'".$accuracy_js."',";
$sql_fields_reg .= 'altitude_accuracy_js,'; $sql_values_reg .= "'".$altitudeAccuracy_js."',";
$sql_fields_reg .= 'heading_js,'; $sql_values_reg .= "'".$heading_js."',";
$sql_fields_reg .= 'speed_js,'; $sql_values_reg .= "'".$speed_js."',";
$sql_fields_reg .= 'timestamp_js'; $sql_values_reg .= "'".$timestamp_js."'";

$sql = "INSERT INTO _trace_geolocation (".$sql_fields_reg.") VALUES (".$sql_values_reg.");";
$result = mysql_query($sql, $conn);
$data_array['status'] = 'saved';
if (!$result) $data_array['status'] = 'failed';

$buffer = ob_get_clean();
unset($buffer);

unset($latitude_js,$longitude_js,$altitude_js,$accuracy_js,$altitudeAccuracy_js,$heading_js,$speed_js,$timestamp_js);
unset($env,$env_appName,$env_resolution,$env_userAgent,$env_jsscreen,$env_browser_name,$env_browser_version,$env_jsnav,$env_engine_name,$env_engine_version);
unset($env_jsengine,$env_os_name,$env_os_version,$env_jsso,$env_device_model,$env_device_vendor,$env_device_type,$env_jsdevice,$env_jscpu);
unset($sql,$result,$sql_fields_reg,$sql_values_reg);

include ('bd_desconn.php');

echo json_encode($data_array);
unset($data_array);


?>