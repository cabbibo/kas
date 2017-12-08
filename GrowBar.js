function GrowBar( points ){

  this.material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: .4,
    linewidth: 3
  });

  this.object = new THREE.Object3D();

  this.segments = [];

  var lineGeo = new THREE.Geometry();

  for( var i = 0; i < points.length; i++ ){
    lineGeo.vertices.push( points[i] );
  }

  var line = new THREE.Line( lineGeo , this.material );

  this.line = line;
  this.object.add( line );
  this.segments.push( line );

  return line;



}