<?php

class UserService
{
    private $params;
    private $error;
    private $user;

    function setParams($params) { $this->params = $params; }
    function getParams() { return $this->params; }
    function setError($error) { $this->error = $error; }
    function getError() { return $this->error; }
    function setUser($user) { $this->user = $user; }
    function getUser() { return $this->user; }

    public function launchControls(){

        
     
        if(strlen($this->params['nom'])<3){
            $this->error['nom']='Min 3 caracteres';
        }

        if(strlen($this->params['prenom'])<3){
            $this->error['prenom']='champ obligatoire';
        }
      


            
        if(empty($this->error)==false){
            return $this->error;
        }
      
     }   
     
     public function launchControlsInscri(){
        
                
             
                if(strlen($this->params['Inscrinom'])<3){
                    $this->error['Inscrinom']='Min 3 caracteres';
                }
        
                if(strlen($this->params['Inscriprenom'])<3){
                    $this->error['Inscriprenom']='champ obligatoire';
                }
              
        
        
                    
                if(empty($this->error)==false){
                    return $this->error;
                }
              
             }   

        
    



}