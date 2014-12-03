<?php

header('Content-type: text/plain');

$user = array("prenom" => "Machin", "nom" => "Bidule" , "id" => 1);

$msg = array(["Machin", "coucou",             "17h30"],
             ["Bidule", "yop",                "17h31"],
             ["Machin", "ca va?",             "17h32"],
             ["Bidule", "oui",                "17h33"],
             ["Bidule", "et toi?",            "17h34"],
             ["Machin", "bien bien",          "17h35"],
             ["Bidule", "tu sais quoi faire", "17h36"],
             ["Machin", "lol",                "17h37"]);

echo json_encode(array("user" => $user,"list" => $list, "msg" => $msg, "error" => []), JSON_PRETTY_PRINT);
