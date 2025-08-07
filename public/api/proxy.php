<?php
function perform_request($url) {
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$resp = curl_exec($ch);
	$result = [
		"status" => curl_getinfo($ch, CURLINFO_HTTP_CODE),
		"body" => $resp,
		"error" => curl_error($ch),
	];
	curl_close($ch);
	return $result;
}

function sanitize_host($raw_host) {
	$result = preg_match("/^(?:https?:\/\/)?((?:[\p{L}0-9-]{2,})(?:\.[\p{L}0-9-]+)+)/ui", $raw_host, $matches);
	if ($result === 1 && $matches[1] && $matches[1] !== "127.0.0.1") {
		return $matches[1];
	}
	return null;
}

function die_with_error($err_code, $err_msg) {
	http_response_code($err_code);
	die($err_msg);
}

// Set headers
header('Cache-Control: public, max-age=300, must-revalidate');

// Set CORS header for development
if (isset($_SERVER['HTTP_ORIGIN']) && preg_match("/^https?:\/\/(?:localhost|127.0.0.1)(?::[0-9]{1,6})$/i", $_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

// Prepare data for requests
$host = sanitize_host($_GET['host']);
if($host === null) die_with_error(400, "Invalid host");

$urls = [
	"https://{$host}/.well-known/fursona",
	"https://{$host}/.well-known/fursona.json",
	"http://{$host}/.well-known/fursona",
	"http://{$host}/.well-known/fursona.json",
];
$results = [];

// Perform requests & exit if successful
foreach ($urls as $url) {
	$result = perform_request($url);

	if ($result["status"] === 404) {
		continue;
	} elseif($result["status"] === 200) {
		http_response_code($result["status"]);
		die($result["body"]);
	} else {
		array_push($results, $result);
	}
}

// If unsuccessful, throw any non-404 response from the server
if (count($results) > 0) {
	$result = $results[0];
	http_response_code($result["status"] !== 0 ? $result["status"] : 500);
	die($result["status"] !== 0 ? $result["body"] : $result["error"]);
}

// Fall back to 404
http_response_code(404);
die("Not found");