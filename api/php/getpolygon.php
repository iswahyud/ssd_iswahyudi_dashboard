
<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client;
$req = $client->request(
    'GET', 'http://api.jakarta.go.id/v1/kelurahan/3171010002/?format=geojson',
    [
        'headers' => [
            // 'Content-Type' => 'application/x-www-form-urlencoded',
            'Authorization' => 'v3pP0k7wzdvXvNYUrFBJ/vA+bvBaAUn70uwSivWVXwmr+HT8p5BZ7mO0O/G1dzxv'
        ],
    ]
);
echo $body = $req->getBody();
// $response = json_decode($body);



// $curl = curl_init();

// curl_setopt_array($curl, array(
//     CURLOPT_URL => 'http://api.jakarta.go.id/v1/kelurahan/3171010002/?format=geojson',
//     CURLOPT_RETURNTRANSFER => 1,
//     // CURLOPT_ENCODING => 'UTF-8',
//     // CURLOPT_MAXREDIRS => 10,
//     // CURLOPT_TIMEOUT => 0,
//     // CURLOPT_FOLLOWLOCATION => 1,
//     // CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//     CURLOPT_CUSTOMREQUEST => 'POST',
//     CURLOPT_HTTPHEADER => array(
//         'Authorization: v3pP0k7wzdvXvNYUrFBJ/vA+bvBaAUn70uwSivWVXwmr+HT8p5BZ7mO0O/G1dzxv',
//     ),
// ));

// $response = curl_exec($curl);

// curl_close($curl);
// echo $response;
