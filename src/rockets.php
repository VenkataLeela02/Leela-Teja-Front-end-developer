<?php
header('Access-Control-Allow-Origin: *');
$api_url = 'https://api.spacexdata.com/v3/capsules';

// Read JSON file
$json_data = file_get_contents($api_url);

// Decode JSON data into PHP array
$response_data = json_decode($json_data);

// All user data exists in 'data' object
$capsules_data = $response_data->data;

// Cut long data into small & select only first 10 records
//$rockets_data = array_slice($rockets_data, 0, 9);

// Print data if need to debug
//print_r($user_data);
echo $response_data;
// Traverse array and display user data
// foreach ($rockets_data as $rocket) {
// 	echo "name: ".$rocket->employee_name;
// 	echo "<br />";
// }

?>

