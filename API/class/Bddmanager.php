<?php
//bddmanager va contenir les instances repository

class Bddmanager{
    private $FestivalRepository;
    private $UserRepository;
    private $UserFestivalRepository;

    function __construct(){
        $this->FestivalRepository=new FestivalRepository();
        $this->UserRepository=new UserRepository();
        $this->UserFestivalRepository=new UserFestivalRepository();

    }

    function getFestivalRepository(){
        return $this->FestivalRepository;
    }
    function getUserRepository(){
        return $this->UserRepository;
    }
    function getUserFestivalRepository(){
        return $this->UserFestivalRepository;
    }
}