<?php 
class FestivalRepository extends Repository{

function getAll(){
    $query="SELECT * FROM festival ";

    $result=$this->connection->query($query);
    $result=$result->fetchAll(PDO::FETCH_ASSOC);
    $festival=[];
    foreach($result as $data){
        //on push un nouvel objet dans le tab notes 
        $festival[]= new Festival($data);
    }
    return $festival;
}
 function getFestival(Festival $festival){
    $query="SELECT * FROM festival WHERE id=:id";
    $result=$this->connection->prepare($query);
    $result->execute(array(
        "id"=>$festival->getId()
      
        ));
    $festival=$result->fetch(PDO::FETCH_ASSOC);
    if(empty($festival)){
        return false;
    }
    else{
    return new Festival($festival);
    }
} 

function save(Festival $festival){
    if (empty($festival->getId())){
       return $this->insert($festival);
    }
    else{
       return  $this->update($festival);
    }
    
}

private function insert(Festival $festival){

    $query="INSERT INTO festival SET title=:title , lat=:lat,lng=:lng,
    url=:url,typeMusic=:typeMusic,dateDeb=:dateDeb,dateFin=:dateFin ";
    $result=$this->connection->prepare($query);
    $result->execute(array(
        "title"=>$festival->getTitle(),
        "lat"=>$festival->getLat(),
        "lng"=>$festival->getLng(),
        "url"=>$festival->getUrl(),
        "typeMusic"=>json_encode($festival->getTypeMusic()),
        "dateDeb"=>$festival->getDateDeb(),
        "dateFin"=>$festival->getDateFin()
      
        ));
   return $this->connection->lastInsertId();

}

function getFestivalId( $festival){
    $query="SELECT * FROM festival WHERE id=:id";
    $result=$this->connection->prepare($query);
    $result->execute(array(
        "id"=>$festival
      
        ));
    $festival=$result->fetch(PDO::FETCH_ASSOC);
    if(empty($festival)){
        return false;
    }
    else{
    return new Festival($festival);
    }
} 

}