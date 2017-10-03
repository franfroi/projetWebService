<?php
//echo "bbbbb";
class FestivalService
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

        
     
        if(strlen($this->params['title'])<3){
            $this->error['title']='Min 3 caracteres';
        }

        if(strlen($this->params['lat'])<1){
            $this->error['lat']='champ obligatoire';
        }
        if(strlen($this->params['lng'])<1){
            $this->error['lng']='champ obligatoire';
        }
        if(strlen($this->params['dateDeb'])<1){
            $this->error['dateDeb']='champ obligatoire';
        }
        if(strlen($this->params['dateFin'])<1){
            $this->error['dateFin']='champ obligatoire';
        }
        if(strlen($this->params['url'])<1){
            $this->error['url']='champ obligatoire';
        }
        // if(strlen($this->params['typeMusic'])<1){
        //     $this->error['typeMusic']='champ obligatoire';
        // }


            
        if(empty($this->error)==false){
            return $this->error;
        }
      
     }    

        
    



}