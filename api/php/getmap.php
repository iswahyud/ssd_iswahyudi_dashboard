<?php

include '../php/config.php';

header('Content-Type: application/json');
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

$query_map="SELECT * FROM jsc_faskes";

$result = array();
    $rs = mysqli_query($conn, $query_map);
    while($row = mysqli_fetch_object($rs)){
        array_push($result, $row);  
    }
    echo json_encode($result);

// echo json_encode($json);
?>




