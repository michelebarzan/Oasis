<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Redirect</title>
    <script src="js/redirect.js"></script>
</head>
<body onload="checkMobile()">
    <?php

    $page=$_GET["page"];
    echo '<input value="'.$page.'" type="hidden" id="page">';

    ?>
</body>
</html>