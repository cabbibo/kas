  function Fish( dom , level, mesh , id ){
    
    this.dom  = dom;
    this.level = level;
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();

    // API
    //this.timeToChange = 1000;
    //this.springForce = .1;


    var fID = 1;
    if( id ){
      fID = id;
    }

    this.sibRepelPow = 1;
    this.sibRepelDiv = 100;
    this.sibRepelDist = .5* ( 1+.1 * fID);;

    this.subAttractPow = 1;
    this.subAttractDiv = 15 * ( 1+.1 * fID);
    this.subAttractDist = .01;

    this.connected = true;

    this.sub = [];

    var newMesh = mesh.clone();
   
    this.body = mesh.clone();
    this.body.position = this.position;

    if( this.dom.sub ){
      this.dom.sub.push( this );
    }

    this.counter = 0;

    this.body.scale.multiplyScalar( level );
  }


  Fish.prototype.update = function(){

    this.speed = this.velocity.length();
    
    this.counter ++;
   
    /*
    
       If attached to bait
    */

    if( !this.dom ){

      console.log( 'WTF' );
      console.log( this );

    }
    
    if( !this.dom.sub ){
      //console.log( this.dom.position );
      //console.log( this.position );

      this.velocity.set( 0 , 0 , 0 );

      var dif = this.dom.position.clone().sub( this.position );

      var dis = dif.length();
      var dir = dif.normalize();

     // console.log( dis );

      this.velocity.add( dir.multiplyScalar( .03));

      this.position.add( this.velocity );

      this.velocity.multiplyScalar( .5 );
    
      this.body.lookAt( this.position.clone().add( this.velocity ));

      this.body.position.copy( this.position );

    }

    for( var i = 0; i < this.sub.length; i++ ){

      var c1 = this.sub[i];

      c1.velocity.set( 0 , 0 , 0 );

      for( var j = 0; j < this.sub.length; j++ ){

        if( i != j ){
          var c2 = this.sub[j];
          var dif = c1.position.clone().sub( c2.position );

          var l = dif.length();

          var c = (l-this.sibRepelDist);

          var sign = c >= 0 ? 1 : -1;
          var x = sign * Math.abs(Math.pow( Math.abs(c) , this.sibRepelPow ))/ this.sibRepelDiv;

          c1.velocity.sub( dif.normalize().multiplyScalar( x ) );

        }

      }



      var dif = this.position.clone().sub( c1.position );

      if( isNaN( this.position.x ) ){
        console.log( 'posNAN' );
        debugger
      }
    
      var dL = dif.length();
      var dN = dif.normalize();

      var dist = dL - this.subAttractDist;
      var sign = dist >= 0 ? 1 : -1;

      if( isNaN( sign ) ){
        console.log( 'signNAN' );
      }

      var pow = Math.pow( Math.abs( dist ) , this.subAttractPow );

      if( isNaN( pow ) ){
        console.log( 'powNAN');
      }


      c1.velocity.add( dif.multiplyScalar( pow * sign / this.subAttractDiv ) ); 

      if( c1.velocity.length() >2 ){

        c1.velocity.normalize().multiplyScalar(2 );

      }


      c1.position.add( c1.velocity );
      
      var d1 = c1.velocity.clone().normalize();
      var d2 = this.position.clone().sub( c1.position.clone() ).normalize();

      c1.body.lookAt( c1.position.clone().add(d2) );

      c1.body.position.copy( c1.position );
      c1.update();

    }





  }

  Fish.prototype.connect = function(){
    this.connected = true;
  }

  Fish.prototype.disconnect = function(){
    this.connected = false;
  }