<?php

	$dbtype = "MySQL";

	$conn=mysqli_connect("localhost","root","","jsc_iswahyudi");

	// Check connection
	if (mysqli_connect_errno())
	{
	    echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
?>