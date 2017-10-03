<?php
class Connection{

    static $connection=null;


    static function getConnection(){

        if (empty(self::$connection)){
          self::$connection=new PDO("mysql:host=localhost;dbname=Projetwebservice;charset=UTF8",'root','');

        }
       return self::$connection;
      
    }


    private function __construct()
    {
            
    }



}