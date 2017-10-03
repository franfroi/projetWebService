<?php
class User extends Model implements JsonSerializable {
    
    private $nom;
    private $prenom;
    private $admin;
    
    function setNom($nom) { $this->nom = $nom; }
    function getNom() { return $this->nom; }
    function setPrenom($prenom) { $this->prenom = $prenom; }
    function getPrenom() { return $this->prenom; }
    function setAdmin($admin) { $this->admin = $admin; }
    function getAdmin() { return $this->admin; }
    
  
    
    
    
     function  jsonSerialize(){
         return [
             "id"=>$this->id,
             "nom"=>$this->nom,
             "prenom"=>$this->prenom,
             "admin"=>$this->admin
           
         ];

     }

    

     
    }