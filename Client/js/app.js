
class App{
   
        constructor(){
    
            //dom elements
            this.$form_festival=$("#form_festival");
            this.$name=$("#name");
            this.$date_deb=$("#date_deb");
            this.$date_fin=$("#date_fin");
            this.$Userdate_deb=$("#Userdate_deb");
            this.$Userdate_fin=$("#Userdate_fin");
            this.$type_music=$("#type_music");
            this.$flex_checkbox=$("#flex_checkbox");
            this.$music=$('#music');

            this.$form_login=$("#form_login");
            this.$LoginName=$("#LoginName");
            this.$LoginPrenom=$("#LoginPrenom");

            this.$form_inscrip=$("#form_inscrip");
            this.$InscriName=$("#InscriName");
            this.$InscriPrenom=$("#InscriPrenom");

            this.login= $("#login");
            this.localisateur=$("#localisateur");
            this.inscri=$("#inscri"); 

            this.pos=null;
            this.mark=null;


           
            this.$clicmap=$("#clicmap");
            this.$errorname = $("#errorname");
            this.$errorlatlong = $("#errorlatlong");
            this.$errordate_deb = $("#errordate_deb");
            this.$errordate_fin = $("#errordate_fin");
            this.$errortype_music = $("#errortype_music");

            this.$errorLoginName=$("#errorLoginName");
            this.$errorLoginPrenom=$("#errorLoginPrenom");

            this.$errorInscriName=$("#errorInscriName");
            this.$errorInscriPrenom=$("#errorInscriPrenom");
           
            this.thereWasError = false;

            this.valeurs = [];
            this.clic=null;
            this.showError();
          
            this.tabmarqueurs=[];

            this.initPickers();
            this.initPickers2();
            //-----------map
            this.$map=$('#map');
            this.map=null;
         
            this.partic=[];

          


            this.check=null;

            
            this.$select1=$("#select1");

             //function
            this.main=null;

            this.userinfo="";
           

           
        }

        //----------------------error
       
        checkError(){
            this.check=false;

                     //check name festival
                     if (this.pos==null){
                        var msg =  "Cliquer à l'endroit ou vous voulez creer le marqueur";
                        this.showError(msg, this.$clicmap);
                        this.check=true;
                    }
           
                     //check name festival
                    if (this.$name.val().length < 3){
                        var msg = "Nom du festival obligatoire (3 min)";
                        this.showError(msg, this.$name);
                        this.check=true;
                    }
                  

                     //Check date

                     if (!this.$date_deb.datepicker("getDate"))
                       {
                            var msg = "Date de debut obligatoire ";
                                    this.showError(msg, this.$date_deb);
                                    this.check=true;
                        }

                     if (this.$date_fin.datepicker("getDate")<this.$date_deb.datepicker("getDate"))
                     
                        {
                            var msg = "Date de fin ne peut etre inférieure à date de debut ";
                                    this.showError(msg, this.$date_fin);
                                    this.check=true;
                        }
                       
                       
                        if  (!$('input[name=type_music]').is(':checked') )
                        
                          {
                               var msg = "Type de music obligatoire";
                                      this.showError(msg, this.$flex_checkbox);
                                       this.check=true;
                           }
                                    
                     return this.check;                     
               


        }

        showError(errorMsg, $target){
            switch ( $target)
            {
                case this.$clicmap:
                this.$clicmap.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
                $target.addClass("redborder");
               
                this.thereWasError = true;
                break;  

                case this.$name:
                this.$errorname.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
                $target.addClass("redborder");
               
                this.thereWasError = true;
                break;  
                case this.$flex_checkbox:
                this.$errortype_music.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
               
                $target.addClass("redborder");
               
                this.thereWasError = true;
                break; 

                case this.$date_deb:
                this.$errordate_deb.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
                $target.addClass("redborder");
               
                this.thereWasError = true;
                break; 

                case this.$date_fin:
                this.$errordate_fin.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
                $target.addClass("redborder");
               
                this.thereWasError = true;
                break; 
                
                        
            }
             
        }

       
        cleanErrors(){
            this.$errorname.html(""); //Vide le html
            this.$errorlatlong.html(""); //Vide le html
            this.$errordate_deb.html(""); //Vide le html
            this.$errordate_fin.html(""); //Vide le html
            this.$errortype_music.html(""); //Vide le html
            this.$clicmap.html(""); //Vide le html
            this.$form_festival.find("input, select").removeClass("redborder"); //Retire la classe d'erreur
            this.thereWasError = false;
        }



       
    
    
//-----------------------------------
//date pickers

//fonction init date picker
initPickers(){
    
            var Langue_fr=
            {
              dayNames:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],
              dayNamesMin:["Di","Lu","Ma","Me","Je","Ve","Sa"],
              monthNamesShort:["Jan","Fév","Mar","Avr","Mai","Jui","Jui","Aou","Sep","Oct","Nov","Déc"],
              monthNames:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"],
              firstDay:1, //depart calendrier
              minDate : new Date (),
              maxDate : new Date (2018,11,31),
             // beforeShowDay : $.datepicker.noWeekends, // fonction interne no weekends
              //beforeShowDay : this.closeDay,
              beforeShowDay :$.proxy(this.closeDay,this),// pour ne pas perdre le this
              dateFormat: "dd/mm/yy",
             //showWeek: true
            };
            this.$date_deb.datepicker(Langue_fr);
            this.$date_fin.datepicker(Langue_fr);
    

    }

    

//---------------------------------map

    initMap() {
            this.map = new google.maps.Map(this.$map[0], {
            center: {lat: -34.397, lng: 150.644},
            zoom:7, mapTypeId: 'hybrid'
            
        });
        
     
             
    this.readFestival();
    this.main();//utiliser en fonction de script principale une fois que map est charge
  
  }

    CenterOnGeolocation(){
    
            var that=this;
            // recuperer le gps et appel un call back qui contient la position
                navigator.geolocation.getCurrentPosition(function(position){
                    var pos ={
                        lat: position.coords.latitude  ,
                        lng: position.coords.longitude 
                    };
    
                    that.map.setCenter(pos);
                    

    
                });
    }

    addimg($url){
      
       var image = {
        url:$url,
        
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(30,40),
       
    };

    return image;
    }

   
    content(title,date_deb,date_fin,music){
        var musics=music;
        var test=musics.replace(new RegExp("[^(a-zA-Z)\s \,]", "g"), '');
       
        var content="<div>";
        content+= "<h2>"+title+"</h2>";
        content+= "<h4>Du "+date_deb+" au "+date_fin+"</h4>";
        content+= "<h4>"+test+"</h4>";
        content+= "</div>";
        return content;
    }

    addMarker(pos,title,image,music,date_deb,date_fin){
        
        var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            title: title,
            icon: image,
          
          });


 
          marker.music=music;
          marker.date_deb=date_deb;
          marker.date_deb=date_fin;
         
         
          return marker;
    }
   
    addMarker2(pos,title){
        
        var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            title: title,
            
          
          });
    
         
          return marker;
    }

    addinfos(content,marker){
        var info=new google.maps.InfoWindow({
            content:content
        });
        
        var that=this;
        marker.addListener('click', function() {
                 info.open(that.map, marker);
              });
            return info;
              
    }

    reinit(){
        this.$name.val("");
        this.$date_deb.val("");
        this.$date_fin.val("");
        $('input[name=type_music]').each(function() {
            $(this).prop('checked', false);
     
        });
        
       
    }
    
   

    addFestival(festival){
       var test= this.tabmarqueurs.push( festival);
       // console.log(test)
    }

    saveFestival(festival){
        console.log(festival)
        var that = this;
        $.ajax({
            url : "http://localhost/1-projetwebservice/API/festival",
            method : "POST",
            data : {
               
                title : festival.title,
                lat : festival.lat,
                lng : festival.lng,
                url : festival.url,
                typeMusic : festival.typeMusic,
                dateDeb : festival.dateDeb,
                dateFin : festival.dateFin

            },
            dataType : "json",
            success : function( data ){
                //console.log(data);
                if( data.success == true ){
                    festival.id = festival.id;
                    //that.content();
                    that.addFestival( festival );
                    
                    that.readFestival();
                }
                else {
                    alert( "Une erreur est survenue lors de l'enregistrement !" );
                }

            },
            error : function( error ){
                console.log( error );
            }
        })
     
    }
    
    readFestival(){
    
            var that = this;
            var pos=null;
            $.ajax({
                url : "http://localhost/1-projetwebservice/API/festival",
                method : "get",
                dataType : "json",
                success : function( data ){
                   // console.log(data);
                    for( var data_festival of data ){
                        var festival = new Festival(
                            data_festival.title,
                            data_festival.lat,
                            data_festival.lng,
                            data_festival.url,
                            data_festival.typeMusic,
                            data_festival.dateDeb,
                            data_festival.dateFin,
                           

                         );
                          pos={
                             lat :parseFloat( data_festival.lat),
                             lng:parseFloat( data_festival.lng)
                         };
                        
                        // console.log(  data_festival.typeMusic,);
                          var image =that.addimg (data_festival.url);
                        
                        //  //-1---------------creation marqueur
                         // var marker=that.addMarker(pos,data_festival.title,image);
                         var marker=app.addMarker(pos,data_festival.title,image,JSON.parse(data_festival.typeMusic), data_festival.dateDeb, data_festival.dateFin);
                        //   //-2----------------creation contenu
                        
                          var content=that.content(data_festival.title, data_festival.dateDeb,data_festival.dateFin, data_festival.typeMusic);
                          var info=that.addinfos(content,marker);
                        
                        festival.id = data_festival.id;
                        festival.marker=marker;
                        festival.content=info;

                       
                       // console.log(festival.marker)
                       // festival.content.setContent(festival.id)
                        
                       that.addFestival(festival);
                     // console.log(that.tabmarqueurs);
                        // avoir
                       
                      
                       
                      
                      
                    }
    
                },
                error : function( error ){
                    console.log( error );
                }
            });
        }
    
          
                
               
            pushMarkers(marker){
                this.markers.push(marker);
              // console.log( this.markers)
             }
//----------2eme exo

//fonction init date picker
initPickers2(){
    
            var Langue_fr=
            {
              dayNames:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],
              dayNamesMin:["Di","Lu","Ma","Me","Je","Ve","Sa"],
              monthNamesShort:["Jan","Fév","Mar","Avr","Mai","Jui","Jui","Aou","Sep","Oct","Nov","Déc"],
              monthNames:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"],
              firstDay:1, //depart calendrier
              minDate : new Date (2017,0,1),
              maxDate : new Date (2018,11,31),
             // beforeShowDay : $.datepicker.noWeekends, // fonction interne no weekends
              //beforeShowDay : this.closeDay,
              beforeShowDay :$.proxy(this.closeDay,this),// pour ne pas perdre le this
              dateFormat: "dd/mm/yy",
             //showWeek: true
            };
            this.$Userdate_deb.datepicker(Langue_fr);
            this.$Userdate_fin.datepicker(Langue_fr);
           
    

    }



checkErrorlogin(){
    this.check=false;

             
             //check LoginName
            if (this.$LoginName.val().length < 3){
                var msg = "Nom obligatoire (3 min)";
                this.showErrorLogin(msg, this.$LoginName);
                this.check=true;
            }
          
            //check LoginName
            if (this.$LoginPrenom.val().length < 3){
                var msg = "Prénom obligatoire (3 min)";
                this.showErrorLogin(msg, this.$LoginPrenom);
                this.check=true;
            }
           
             return this.check;                     
       


}

showErrorLogin(errorMsg, $target){
    switch ( $target)
    {
       
        case this.$LoginName:
        this.$errorLoginName.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
        $target.addClass("redborder");
       
        this.thereWasError = true;
        break;  
       
        case this.$LoginPrenom:
        this.$errorLoginPrenom.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
        $target.addClass("redborder");
       
        this.thereWasError = true;
        break;  
        
                
    }
     
}


cleanErrorsLogin(){
    this.$errorLoginName.html(""); //Vide le html
    this.$errorLoginPrenom.html(""); //Vide le html
   this.$form_login.find("input, select").removeClass("redborder"); //Retire la classe d'erreur
    this.thereWasError = false;
}



checkErrorInscription(){
    this.check=false;

             
             //check LoginName
            if (this.$InscriName.val().length < 3){
                var msg = "Nom obligatoire (3 min)";
                this.showErrorInscription(msg, this.$InscriName);
                this.check=true;
            }
          
            //check LoginName
            if (this.$InscriPrenom.val().length < 3){
                var msg = "Prénom obligatoire (3 min)";
                this.showErrorInscription(msg, this.$InscriPrenom);
                this.check=true;
            }
           
             return this.check;                     
       


}

showErrorInscription(errorMsg, $target){
    switch ( $target)
    {
       
        case this.$InscriName:
        this.$errorInscriName.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
        $target.addClass("redborder");
       
        this.thereWasError = true;
        break;  
       
        case this.$InscriPrenom:
        this.$errorInscriPrenom.append("<p>"+errorMsg+"</p>"); //Ajouter du texte/html a la suite
        $target.addClass("redborder");
       
        this.thereWasError = true;
        break;  
        
                
    }
     
}


cleanErrorsInscription(){
    this.$errorInscriName.html(""); //Vide le html
    this.$errorInscriPrenom.html(""); //Vide le html
   this.$form_inscrip.find("input, select").removeClass("redborder"); //Retire la classe d'erreur
    this.thereWasError = false;
}


saveUser(user){
  //  console.log(user)
    var that = this;
    $.ajax({
        url : "http://localhost/1-projetwebservice/API/user",
        method : "POST",
        data : {
           
            nom : user.nom,
            prenom : user.prenom,
            admin: user.admin
           
        },
        dataType : "json",
        success : function( data ){
           // console.log(data);
            if( data.success == true ){
                user.id = user.id;
                user.nom = user.nom;
                user.prenom = user.prenom;
                user.admin = user.admin;
               
                $("#deconnexion").show();
                $("#connexion").hide();
                $("#login").hide();
                 $("#inscription").hide();
                 that.inscri.hide();
                 that.localisateur.show();
               
            }
            else {
                alert( "Une erreur est survenue lors de l'enregistrement !" );
            }

        },
        error : function( error ){
            alert( "Utisateur  existant" );
        }
  })
 
}
userfestival(){
var user=this.userinfo;
var marker=this.tabmarqueurs;
console.log(marker);
for(var item of marker){
    var content="<div>";
    content+= "<h2>"+item.title+"</h2>";
    content+= "<h4>Du "+item.dateDeb+" au "+item.dateFin+"</h4>";
    content+= "<h4>"+JSON.parse(item.typeMusic)+"</h4>";
          
    content+= "<Button  class='participation' value="+item.id+" = >Je participe</button>";

    content+= "</div>";
 item.content.setContent(content);
}


}
userfestivalexistant(idmarker){
    var user=this.userinfo;
    var marker=this.tabmarqueurs;
  //  console.log(marker);
    for(var item of marker){
        if (idmarker==item.id){
            var content="<div>";
            content+= "<h2>"+item.title+"</h2>";
            content+= "<h4>Du "+item.dateDeb+" au "+item.dateFin+"</h4>";
            content+= "<h4>"+JSON.parse(item.typeMusic)+"</h4>";
                  
            content+= "<h4 style='color:#069'>"+user.nom+" participe</h4>";
        
            content+= "</div>";
         item.content.setContent(content); 
        }
    }
}

userfesivalexist(user){
//console.log(user);


    var that = this;
    $.ajax({
        url : "http://localhost/1-projetwebservice/API/user/festivalid",
        method : "POST",
        data : {
           
             user:user,
            
        },
        dataType : "json",
        success : function( data ){
           // console.log(data);
           if (data.success==true){
            for(var item of data){
              that.userfestivalexistant(item.idFestival);
              that.partic.push(item.idFestival);
            }}
          
        },
        error : function( error ){
           // console.log( error );
         
        }
   });


}



GetUser(user){
   // console.log(user)
    var that = this;
    $.ajax({
        url : "http://localhost/1-projetwebservice/API/user/getuser",
        method : "POST",
        data : {
           
            nom : user.nom,
            prenom : user.prenom,
            admin: user.admin
           
           
        },
        dataType : "json",
        success : function( data ){
           
            if( data.success == true ){
                user.id = user.id;
                user.nom = user.nom;
                user.prenom = user.prenom;
                user.admin = user.admin;
               // console.log(data)
               
                if (data.admin=="true"){
                  
                    that.inscri.hide();
                    $("#infos").show();
                    $("#deconnexion").show();
                  
                  
                    
                }
               else {
                   that.inscri.hide();
                 that.localisateur.show();
                 $("#deconnexion").show();
                 $(".partic").show();
                 that.userfestival();
                
            }

           
               $("#connexion").hide();
              $("#login").hide();
               $("#inscription").hide();
               //tableau user recoit les data
                that.userinfo=data;

                // on regarde si le user a participer a festivals
                that.userfesivalexist(data.id);

                // bouton pour participer
               

               
            }
            else {
                alert( "Utisateur non existant" );
            }

        },
        error : function( error ){
           // console.log( error );
            alert( "Utisateur non existant" );
        }
   })
 return user;
}

adduserFestival(festivalid){
 //console.log(this.userinfo.id);
// console.log(festivalid)
 var that = this;
        $.ajax({
            url : "http://localhost/1-projetwebservice/API/user/festival",
            method : "POST",
            data : {
                userid:that.userinfo.id,
                festivalid:festivalid
                    },
            dataType : "json",
            success : function( data ){
                // console.log(data);

                 that.partic.push(festivalid);

            },
            error : function( error ){
                console.log( error );
                
            }
        });


}




}