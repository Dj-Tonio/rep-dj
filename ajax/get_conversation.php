<?php

header('Content-type: text/plain');

$user = array("prenom" => "Machin", "nom" => "Bidule" , "id" => 1);

$list = array([13, "Machin Bidule",       0],
              [21, "Gauss le Beau Gosse", 3],
              [2,  "Trop Lol",            0],
              [5,  "Trilili Tralala",     1]);

$msg = array(["Macin", "coucou", "17h30"]);

echo json_encode(array("user" => $user,"list" => $list, "msg" => $msg, "error" => []), JSON_PRETTY_PRINT);
