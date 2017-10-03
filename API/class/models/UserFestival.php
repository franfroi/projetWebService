<?php
class UserFestival extends Model implements JsonSerializable {
    
   
    private $idUser;
    private $idFestival;
    
    function setIdUser($idUser) { $this->idUser = $idUser; }
    function getIdUser() { return $this->idUser; }
    function setIdFestival($idFestival) { $this->idFestival = $idFestival; }
    function getIdFestival() { return $this->idFestival; }
    
    
    
    
     function  jsonSerialize(){
         return [
             "idUser"=>$this->idUser,
             "idFestival"=>$this->idFestival
             ];

     }

    

     
    }