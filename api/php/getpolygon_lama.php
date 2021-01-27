<?php

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://api.jakarta.go.id/v1/kelurahan/3171010002/?format=geojson');
$token = "v3pP0k7wzdvXvNYUrFBJ/vA+bvBaAUn70uwSivWVXwmr+HT8p5BZ7mO0O/G1dzxv";
$authorization = "Authorization: Bearer ".$token;
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization ));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$err =  curl_error($ch);
if($err)
{
 echo 'error';
}
else
{
    //header('content-type: application/json');
    print_r($response);
}

curl_close($ch);

;?>