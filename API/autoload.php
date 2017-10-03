<?php
function load( $classname ) {
    $folders = [
         "class/",
        "class/models/",
        "class/service/",
        "class/repositories/"


        
    ];
    foreach( $folders as $folder ){
        $file = $folder . $classname . ".php";
        if( file_exists( $file ) ){
            require $file;
            return;
        }
    }
}
spl_autoload_register( "load" );