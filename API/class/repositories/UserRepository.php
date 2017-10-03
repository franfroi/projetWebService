<?php 
class UserRepository extends Repository{

    function save(User $user){
        if (empty($user->getId())){
           return $this->insert($user);
        }
        else{
           return  $this->update($user);
        }
        
    }

    private function insert(User $user){
        
            $query="INSERT INTO user SET nom=:nom , prenom=:prenom,admin=:admin";
            $result=$this->connection->prepare($query);
            $result->execute(array(
                "nom"=>$user->getNom(),
                "prenom"=>$user->getPrenom(),
                "admin"=>$user->getAdmin()
              
                ));
           return $this->connection->lastInsertId();
        
        }
        function getUser(User $user){

            $query="SELECT * FROM user WHERE nom=:nom AND prenom=:prenom";
            $result=$this->connection->prepare($query);
            $result->execute(array(
                "nom"=>$user->getNom(),
                "prenom"=>$user->getPrenom()
               
                ));
            $user=$result->fetch(PDO::FETCH_ASSOC);
           
            if(empty($user)){
                return false;
            }
            else{
            return new User($user);
            }
        } 

        function getUserbyid( $user){
            
                        $query="SELECT * FROM user WHERE id=:id ";
                        $result=$this->connection->prepare($query);
                        $result->execute(array(
                            "id"=>$user
                           
                           
                            ));
                        $user=$result->fetch(PDO::FETCH_ASSOC);
                       
                        if(empty($user)){
                            return false;
                        }
                        else{
                        return new User($user);
                        }
                    } 

                    function controlUser($nom,$prenom){
                        $query="SELECT * FROM user WHERE nom=:nom and prenom=:prenom ";
                        $result=$this->connection->prepare($query);
                        $result->execute(array(
                            "nom"=>$nom,
                            "prenom"=>$prenom
                           
                           
                            ));
                        $control=$result->fetch(PDO::FETCH_ASSOC); 

                        if (empty($control)){
                            return true;
                        }
                       
                    }
}