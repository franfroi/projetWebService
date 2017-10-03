<?php 
abstract class Repository{

   // protected $connexion;
// function __construct($connection){
//     $this->connection=$connection;
// }

function __construct(){
    $this->connection=Connection::getConnection();
}
}