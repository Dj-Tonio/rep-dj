<?php

$user = array("prenom" => "Machin", "nom" => "Bidule" , "id" => 1);

$contacts = array(3 => "Machin Bidule", 12 => "Jacobi Le Bauf", 33 => "Gauss Le Beau Gosse");

echo json_encode(array("user" => $user,"contact_list" => $contacts, "error" => []));
