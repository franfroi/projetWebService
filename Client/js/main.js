var app= new App();



//Changement de l'image 
var current = 0; 
// function change(value) 
function change(value) 
{ 
//document.getElementById("show").src = "img/"+value; 
document.getElementById("show").src = value; 

} 

app.$form_festival.submit(function(event){ //On soumet/envoi le formulaire
  
         event.preventDefault(); //Empeche le rechargement de la page !
      
         app.cleanErrors();
         if( app.checkError()==false){
            //recup title
            var title=app.$name.val();
            //recup position
            pos=app.pos;
            var position={
              lat:parseFloat(pos.lat),
              lng:parseFloat(pos.lng)
              }
             
            //recup des checbox
           
            $('input:checked[name=type_music]').each(function() {
              var valeurs=app.valeurs.push($(this).val());});

            var music=app.valeurs
            console.log(music);
            //recup image
            var $url=app.$select1.val();
           
              
            //recup date
            var date_deb=app.$date_deb.datepicker({ dateFormat: 'dd-mm-yy' }).val();
            var date_fin=app.$date_fin.datepicker({ dateFormat: 'dd-mm-yy' }).val();

           

           
          //important                          
            var festival = new Festival(title,position.lat,position.lng,$url,music,date_deb,date_fin);
           // console.log(festival);
            app.saveFestival(festival);
            app.reinit();
       } 
});
//map

  app.main=function(){
    app.CenterOnGeolocation();
      
     var marker=null;
    //sur clic du map
    app.map.addListener('click', function(e) {
        // recup des positions
        var posfull=e.latLng;

        var pos={
          lat:parseFloat(posfull.lat()),
          lng:parseFloat(posfull.lng())
          }

          //decimmale
          var numposlat = new Number(pos.lat);
          var poslat = numposlat.toPrecision(5);
          var numposlng = new Number(pos.lng);
          var poslong= numposlng.toPrecision(5);

          var title="Position : "+ poslat+" , "+poslong;
      
      
        //-1---------------creation marqueur
       
         if(marker){ //on vérifie si le marqueur existe
          marker.setPosition(pos); //on change sa position
          
          }
        else{
        marker=app.addMarker2(pos,title);//on créé le marqueur
        }
      app.pos=pos;
    
     
      }); 

    
    $(document).on("click",(".participation"),function(){
      var userId=app.userinfo.id;
      var nomUser=app.userinfo.nom;
      var festivalid=$(this).val();
         
      //on change le contenu
      app.userfestivalexistant(festivalid);
     
      // on ajoute dans la base
       app.adduserFestival(festivalid);
      
     
              });
      
  
} 

     
     
  
 $('input[type=checkbox][name=music]').click(function(){
  
 var checked=$('input[type=checkbox][name=music]:checked');

 
    for (var marker of app.tabmarqueurs){
      //console.log(app.tabmarqueurs);
   
      if (checked[0]==null){
        marker.marker.setVisible(true);
       }
       else marker.marker.setVisible(false);
       checked.each(function(){
        console.log($(this).val());
         
       
         for (var i=0;i<marker.marker.music.length;i++){
         console.log(marker.marker.music[i]);
            if (marker.marker.music[i]==$(this).val() ){
            
              marker.marker.setVisible(true);
            } 
          }
        });
      }
      
});
     //initpickers user
      //recup date

      app.$Userdate_deb.click(function(){
        app.$Userdate_deb.val("");
        app.$Userdate_fin.val("");
        for (var marker of app.tabmarqueurs){
         
                       marker.marker.setVisible(true);
                      }
      });

      app.$Userdate_fin.click(function(){
        app.$Userdate_fin.val("");
        app.$Userdate_deb.val("");
        for (var marker of app.tabmarqueurs){
         
                       marker.marker.setVisible(true);
                      }
      });
      app.$Userdate_deb.change(function(){
        
        var checked=app.$Userdate_deb.datepicker({ dateFormat: 'dd-mm-yy' }).val();
        //console.log(checked);
        for (var marker of app.tabmarqueurs){

             marker.marker.setVisible(false);
        // console.log(marker.dateDeb)
              if (   marker.dateDeb==checked){
             // console.log(marker);
              marker.marker.setVisible(true);
                    
                }
              }
           
      });

 //initpickers user
      //recup date

      app.$Userdate_fin.change(function(){
        
        var checked=app.$Userdate_fin.datepicker({ dateFormat: 'dd-mm-yy' }).val();
       // console.log(app.markers);
       for (var marker of app.tabmarqueurs){
        
                     marker.marker.setVisible(false);
                // console.log(marker.dateDeb)
                      if (   marker.dateFin==checked){
                     // console.log(marker);
                      marker.marker.setVisible(true);
                            
                        }
                      }
           
      });

 //mes participations
   
      $(".partic").click(function(){
      
        var partic=app.partic;
       
       // console.log(partic);
       for (var marker of app.tabmarqueurs){
                marker.marker.setVisible(false);
               
                for(var item of partic){
                      if ( item==marker.id){
                      
                       marker.marker.setVisible(true);
                            
                         }
                      }
                    }      
      });
 
$("#connexion").click(function(){
$("#localisateur").hide();
$("#login").show();

});
$("#inscription").click(function(){
  $("#localisateur").hide();
  $("#login").hide();
  $("#inscri").show(); 
});  

$("#accueil").click(function(){
  $("#localisateur").show();
  $("#login").hide();
  $("#inscri").hide(); 
  $("#infos").hide(); 
}); 
$("#setForm").click(function(){
  $("#localisateur").hide();
  $("#login").hide();
  $("#inscri").hide(); 
  $("#infos").show(); 
}); 

app.$form_login.submit(function(event){ //On soumet/envoi le formulaire
  
         event.preventDefault(); 
         app.cleanErrorsLogin();
         if( app.checkErrorlogin()==false){
         var loginName=app.$LoginName.val();
         var loginPrenom=app.$LoginPrenom.val();
         var user = new User(loginName,loginPrenom);
         
         var test=app.GetUser(user);
         // console.log(test)
         }
});
app.$form_inscrip.submit(function(event){ //On soumet/envoi le formulaire
  
         event.preventDefault(); 
         app.cleanErrorsInscription();
         if( app.checkErrorInscription()==false){
         var inscriName=app.$InscriName.val();
         var inscriPrenom=app.$InscriPrenom.val();

        // console.log(inscriName,inscriPrenom);
         var user = new User(inscriName,inscriPrenom);
         
         app.saveUser(user);
         }
});

$("#deconnexion").click(function(){
  location.reload();
});

