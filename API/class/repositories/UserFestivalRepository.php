<?php
class UserFestivalRepository extends Repository{

     function insert(UserFestival $userFestival){
      
            $query="INSERT INTO userfestival SET idUser=:idUser , idFestival=:idFestival";
            $result=$this->connection->prepare($query);
            $result->execute(array(
                "idUser"=>$userFestival->getIdUser(),
                "idFestival"=>$userFestival->getIdFestival(),
              
              
                ));
           return $this->connection->lastInsertId();
        
        }
    
        function getfestivalbyUser(User $user){

            
            $query="SELECT userfestival.idFestival FROM userfestival WHERE userfestival.idUser=:idUser ";
            $result=$this->connection->prepare($query);
            $result->execute(array(

                "idUser"=>$user->getId(),
               
              
              
              
                ));
                $result=$result->fetchall(PDO::FETCH_ASSOC);
                if($result){
                    return $result;
                }
                
        }
}