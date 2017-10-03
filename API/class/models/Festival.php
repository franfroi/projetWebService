<?php
class Festival extends Model implements JsonSerializable {
    
   
   
    private $title;
    private $lat;
    private $lng;
    private $dateDeb;
    private $dateFin;
    private $url;
    private $typeMusic;
    
    
    function setTitle($title) { $this->title = $title; }
    function getTitle() { return $this->title; }
    function setLat($lat) { $this->lat = $lat; }
    function getLat() { return $this->lat; }
    function setLng($lng) { $this->lng = $lng; }
    function getLng() { return $this->lng; }
    function setDateDeb($dateDeb) { $this->dateDeb = $dateDeb; }
    function getDateDeb() { return $this->dateDeb; }
    function setDateFin($dateFin) { $this->dateFin = $dateFin; }
    function getDateFin() { return $this->dateFin; }
    function setUrl($url) { $this->url = $url; }
    function getUrl() { return $this->url; }
    function setTypeMusic($typeMusic) { $this->typeMusic = $typeMusic; }
    function getTypeMusic() { return $this->typeMusic; }
    
    
    
     function  jsonSerialize(){
         return [
             "id"=>$this->id,
             "title"=>$this->title,
             "lat"=>$this->lat,
             "lng"=>$this->lng,
             "url"=>$this->url,
             "typeMusic"=>$this->typeMusic,
             "dateDeb"=>$this->dateDeb,
             "dateFin"=>$this->dateFin
         ];

     }

    

     
    }