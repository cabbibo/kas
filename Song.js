function Song( controls , id , title , file , geo , mat ){
  
  this.body = new THREE.Mesh( geo , mat );
  this.position = this.body.position;

  controls.add( this.body );

  this.body.hoverOver = this.hoverOver.bind( this );
  this.body.hoverOut  = this.hoverOut.bind( this );
  this.body.select    = this.select.bind( this );
  this.id = id;

  this.hovered = 0;

  this.audio = audio;

  this.texture = textCreator.createTexture( title ,  {
    size: .03
  });

  this.file = file;
  this.title = title;


  var geo = new THREE.PlaneGeometry( 1 , 1 );
  var mat = new THREE.MeshBasicMaterial({
    map:this.texture,
    //blend:

  });

  this.titleBod = textCreator.createMesh( title ,  {
    size: .2
  });//new THREE.Mesh( geo , mat );

  this.titleBod.material.opacity = .3;

}


Song.prototype.update = function(){
  

}

Song.prototype.hoverOver = function(){

  this.hovered = 1;

  hoveredLink = this;

if( activeLink !== this ){
  this.titleBod.material.opacity = .6;
}

}

Song.prototype.hoverOut = function(){

  this.hovered = 0;

  hoveredLink = undefined;
if( activeLink !== this ){
  this.titleBod.material.opacity = .3;

  

  }
  
  
}

Song.prototype.select = function(){

  if( activeLink !== this ){
    var file = "audio/" + this.file + ".mp3";

    uniforms.t_text.value = this.texture;
    uniforms.textRatio.value = this.texture.scaledWidth;

    //uniforms.songVal.value = this.id;
    switchStream( file );

    finalSongVal = this.id;

    activeLink = this;

    this.titleBod.material.opacity = 1.;

  }

  
}