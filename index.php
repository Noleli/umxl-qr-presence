<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">
<head>
	<link rel="stylesheet" href="style.css" type="text/css" />
	<script src="jquery.js" type="text/javascript"></script>
	<script src="qr.js" type="text/javascript"></script>
</head>
<body>
	<h1>The Page</h1>
	<p>Enter your desired username for this session:</p>
	
	<form id="login" name="login">
		<input id="name" name="name">
		<input id="room" type="hidden" value="<? echo $_REQUEST["id"]; ?>">
		<input type="submit">
	</form>
	
	<div>
		<pre id="dump"></pre>
	</div>
</body>
</html>