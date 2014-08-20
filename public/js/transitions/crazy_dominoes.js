Physics(function( world ){
  var viewWidth = (window.innerWidth/10)*9
      ,viewHeight = (window.innerHeight/10)*9
      // bounds of the window
      ,viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
      ,renderer
      ;

  renderer = Physics.renderer('canvas', {
    el: 'viewport'
    ,width: viewWidth
    ,height: viewHeight
  });
  world.add( renderer );

  // render on each step
  world.on('step', function () {
      world.render();
  });

  var dominoes = [];
    for ( var i = 0, l = 35; i < l; ++i ){

      dominoes.push( Physics.body('rectangle', {
        width: 10
        ,height: 70
        ,x: (i*25) + (viewWidth/3)
        ,y: viewHeight - 40
        ,vx: 0
        ,mass: 5
        ,cof: 0
        ,restitution: 3
        ,styles: {
            fillStyle: '#000000'
            ,angleIndicator: '#FFFFFF'
        }
      }));
    };

  world.add( dominoes );


  var circle = Physics.body('circle', {
    x: 50,
    y: viewHeight-200,
    vx: .08,
    radius: 20
  });

  world.add( circle );
  // setup ticker
  Physics.util.ticker.on(function( time, dt ){
    world.step( time );
  });
  // start the ticker
  Physics.util.ticker.start();

  // Add gravity
  world.add( Physics.behavior('constant-acceleration') );
  world.add( Physics.behavior('body-impulse-response') );
  world.add( Physics.behavior('body-collision-detection') );
  world.add( Physics.behavior('sweep-prune') );

  world.add( Physics.behavior('edge-collision-detection', {
    aabb: viewportBounds,
    restitution: 0.3
  }) );

  // // Move to next event
  setTimeout(function() {
    $('canvas').remove();
    Physics.util.ticker.stop();
    // console.log("finished with crazy dominoes")
    $(document).trigger('next');
  },10000);

})
