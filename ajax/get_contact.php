<?php

$_POST["id_contact"];

$user = array("prenom" => "Machin", "nom" => "Bidule" , "id" => 1);

$nom = "Gauss le Beau Gauss";

$contact = array("email" => "gauss.le.bg@troll.fr", "tél" => "06 06 06 06 06");

echo json_encode(array("user" => $user, "nom" => $nom, "contact" => $contact, "error" => []));
