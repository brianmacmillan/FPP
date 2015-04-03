<?php
	$USERNAME='admin';
	$DBNAME='pgg';
	$PASSWORD="admin";
	$HOST='localhost';
	$SYSTEM_ID='1';

	$LOCALHOST=true;

	#login return codes
	$LOGIN_SUCCESS = "Login success.";
	$LOGIN_SUCCESS_CODE = "0";
	$LOGIN_ERROR_MISSING_ARGUMENTS = "Login failure: username and password arguments are missing.";
	$LOGIN_ERROR_MISSING_ARGUMENTS_CODE = "1";
	$LOGIN_ERROR_NO_DATABASE_CONNECTION = "Login failure: no database connectivity.";
	$LOGIN_ERROR_NO_DATABASE_CONNECTION_CODE = "2";
	$LOGIN_ERROR_INVALID_USERNAME_PASSWORD = "Login failure: invalid username and/or password.";
	$LOGIN_ERROR_INVALID_USERNAME_PASSWORD_CODE = "3";
	$LOGIN_ERROR_USER_NAME_ALREADY_EXISTS = "Login failure: user name already exists.";
	$LOGIN_ERROR_USER_NAME_ALREADY_EXISTS_CODE = "4";
?>
