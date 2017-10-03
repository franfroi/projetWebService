<?php
header ("Access-Control-Allow-Origin: * ");
//Autorise certains site (ic tous) a faire des requetes cross domaines
require "flight/Flight.php";
require "autoload.php";



//lire toutes les festivals
Flight::route("GET /festival",function(){
    $bdd=new Bddmanager();
    $repo=$bdd->getFestivalRepository();
    $festivals=$repo->getAll();
  
    echo json_encode($festivals);

    
    
});

//recuperer le festival
Flight::route("GET /festival/@id",function($id){
   
    $festival=new Festival();
    $festival->setId($id);
    $bdd=new Bddmanager;
    $repo=$bdd->getFestivalRepository();
    $festival=$repo->getFestival($festival);
    $statut=[
        "success"=>false,
        "festival"=>false
    ];

    if ($festival!=false){
        $statut["success"]=true;
        $statut["festival"]=$festival;
    }
    echo json_encode($statut);
    
   });

//creer le festival
Flight::route("POST /festival",function(){
   
    $request = Flight::request();
    $title= $request->data["title"];
    $lat= $request->data["lat"];
    $lng= $request->data["lng"];
    $url= $request->data["url"];
    $TypeMusic= $request->data["typeMusic"];

   
    $dateDeb= $request->data["dateDeb"];
    $dateFin= $request->data["dateFin"];
  
    $params =
    [
        'title' =>$title,
        'lat' =>$lat,
        'lng' =>$lng,
        'url' =>$url,
        'TypeMusic' =>$TypeMusic,
        'dateDeb' =>$dateDeb,
        'dateFin' =>$dateFin
    ];

    // ECHO json_encode( $nameFestival);
$statut=[
    "success"=>false,
    "id"=>0];
 
//test error

$test=new FestivalService();


$test->setParams($params);


//si pas error 
if (($test->launchControls())==null)
{
  
    $festival=new Festival();
    $festival->setTitle($title);
    $festival->setLat($lat);
    $festival->setLng($lng);
    $festival->setUrl($url);
    $festival->setTypeMusic($TypeMusic);
    $festival->setDateDeb($dateDeb);
    $festival->setDateFin($dateFin);

    $bdd=new Bddmanager;
    $repo=$bdd->getFestivalRepository();
    $id=$repo->save($festival);
   
    if ($id!=0){
        $statut["success"]=true;
        $statut["id"]=$id;
    }
   
}
echo json_encode($statut);
   
   });


//creation user
Flight::route("POST /user",function(){
    $request = Flight::request();
    $nom= $request->data["nom"];
    $prenom= $request->data["prenom"];
    $admin= $request->data["admin"];
    // ECHO json_encode( $admin);
   
    $params =
    [
        'nom' =>$nom,
        'prenom' =>$prenom
    ];

    // ECHO json_encode( $params);
$statut=[
    "success"=>false,
    "id"=>0];
 
//test error

$test=new UserService();


$test->setParams($params);


//si pas error 
if (($test->launchControls())==null)
{
  //on regarde si il existe deja
  $bdd=new Bddmanager;
  $repo=$bdd->getUserRepository();
  $control=$repo->controlUser($nom,$prenom);
  if ($control==true){
 //si ok on fait

    $user=new User();
    $user->setNom($nom);
    $user->setPrenom($prenom);
    $user->setAdmin($admin);
   

    //$bdd=new Bddmanager;
    $repo=$bdd->getUserRepository();
    $id=$repo->save($user);
  
    if ($id!=0){
        $statut["success"]=true;
        $statut["id"]=$id;
        $statut["id"]=$user->getId();
        $statut["nom"]=$user->getNom();
        $statut["prenom"]=$user->getPrenom();
        $statut["admin"]=$user->getAdmin();
    }
}
else alert ("cet user existe deja");
}
echo json_encode($statut);
   

});

//recuperer un user 
Flight::route("POST /user/getuser",function(){
  
        $request = Flight::request();
        $nom= $request->data["nom"];
        $prenom= $request->data["prenom"];
        $admin= $request->data["admin"];

        // ECHO json_encode( $admin);
       
        $params =
        [
            'Inscrinom' =>$nom,
            'Inscriprenom' =>$prenom
        ];
    
        // ECHO json_encode( $params);
    $statut=[
        "success"=>false,
        "id"=>0];
     
    //test error
    
    $test=new UserService();
    
    
    $test->setParams($params);
    
  
    //si pas error 
    if (($test->launchControlsInscri())==null)
    {
      
        $user=new User();
        $user->setNom($nom);
        $user->setPrenom($prenom);
        $user->setAdmin($admin);
       
    
        $bdd=new Bddmanager;
        $repo=$bdd->getUserRepository();
        $user=$repo->getUser($user);
      
        if ( $user->getId()!=0){
            $statut["success"]=true;
            $statut["id"]=$user->getId();
            $statut["nom"]=$user->getNom();
            $statut["prenom"]=$user->getPrenom();
            $statut["admin"]=$user->getAdmin();
            //tout rapatrier
        }
       
     }
     else {echo ("pas bien");}
     echo json_encode($statut);
    });

 //recuperer festival id par user

 Flight::route("POST /user/festival",function(){
    $request = Flight::request();
    $userid= $request->data["userid"];
    $festivalid= $request->data["festivalid"];
  
    $statut=[
        "success"=>false,
        "id"=>0];

    $userFestival=new UserFestival();
    $userFestival->setIdUser($userid);
    $userFestival->setIdFestival($festivalid);
    
    
    $bdd=new Bddmanager;
    $repo=$bdd->getUserFestivalRepository();
   $id=$repo->insert($userFestival);

     if ($id!=0){
        $statut["success"]=true;
        $statut["id"]=$userFestival->getId();
        $statut["idUser"]=$userFestival->getIdUser();
        $statut["idFestival"]=$userFestival->getIdFestival();
              //tout rapatrier
    }
    echo json_encode($statut);
 });
 Flight::route("POST /user/festivalid",function(){
    $request = Flight::request();
    $userid= $request->data["user"];
    $statut=[
        "success"=>false,
        "festival"=>null];
    $bdd=new Bddmanager;
//recupere mon user
    $repo=$bdd->getUserRepository();
    $user=$repo->getUserbyid($userid);
//recupere les id festival par user
    $repo=$bdd->getUserFestivalRepository();
    $festival=$repo->getfestivalbyUser($user);

//reupere les festival by id
if ($festival!=0){
    $statut["success"]=true;
    $statut["festival"]=$festival;
   
          //tout rapatrier
}
 else{
    $statut["success"]=false;
 }  

    echo json_encode($statut);
 });

Flight::start();