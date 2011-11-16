
var get = SC.get, set = SC.set;

UI.Kit.ScrollableView = SC.CollectionView.extend({
  
  // options
  animationDuration: 1000,
  easing: "easeOutExpo",  

  // must be set ( pixels available) to provide elastic scroll 
  scrollableHeight: 0, 

  // options elastic
  velocity: 0.2, 

  panOptions: {
    numberOfRequiredTouches: 1,
    preventDefaultOnChange: true
  },

  _positionY: 0,
  _distance: 0,
  _startTimestamp: 0,

  panStart: function(recognizer){

    this._debugRecognizer('panStart', recognizer );
    this._restartElasticEffect();

  },

  panEnd: function(recognizer){

    this._debugRecognizer( 'panEnd' , recognizer );

    var translation = recognizer.get('translation');

    this._transformOnChange( translation.y );

    this._applyElasticEffect();

    this._correctPosition();

  },

  panChange: function(recognizer){
   
    this._debugRecognizer( 'panChange' , recognizer );

    var translation = recognizer.get('translation');
    this._transformOnChange( translation.y );

  },
  panCancel: function(recognizer){

    this._debugRecognizer( 'panCancel' , recognizer );

  },

  _applyElasticEffect: function(){

    var time = Date.now() - get(this, '_startTimestamp');
    var distance = get(this, 'distance');

    var translationY = this.velocity*distance/time * this.$().outerHeight('');

    this._transformPosition( translationY );

    var op = (translationY < 0)? '-' : '+';
    var value = Math.abs(translationY);
    this.$().animate({
      translateY: '%@=%@'.fmt(op ,value)
    }, this.animationDuration,  this.easing);

  },

  // add pixels to current position
  _transformPosition: function(positionY) {

    var result = get(this, '_positionY');
    result+= positionY*(-1);
    set(this,'_positionY', result);

    return result;
  },

  _restartElasticEffect: function(){

    set(this, 'distance', 0);
    set(this, '_startTimestamp', Date.now() );
  },

  _transformOnChange: function(positionY) {

    this._transformPosition(positionY);

    var distance = get(this, 'distance');

    // if change direction
    if ( distance*positionY < 0 ) { 

      this._restartElasticEffect();
      distance = get(this, 'distance');
    } 

    distance+= positionY;
    set(this, 'distance', distance);


    var op = (positionY < 0)? '-' : '+';
    var value = Math.abs(positionY);
    this.$().css({
      translateY: '%@=%@'.fmt(op ,value)
    });

    //console.log( ' distance ' + distance + ' positionY ' +positionY );
  },

  _correctPosition: function() {

    var totalHeight = this.$().outerHeight(''); 
    var maxHeight = totalHeight - get(this, 'scrollableHeight');


    var positionY = get(this, '_positionY');

    var newPositionY = undefined;
    if (positionY < 0  ) {
      newPositionY = 0;
    } else if ( positionY > maxHeight ) {
      newPositionY = maxHeight;
    }

    if ( newPositionY !== undefined ) {

      this.$().animate({
        translateY: '-%@'.fmt(newPositionY)
      }, this.animationDuration,  this.easing);

      set(this,'_positionY', newPositionY);

    //console.log( 'correncting.... '+ get(this, 'positionY') );
    } 
    

  },

  _debugRecognizer: function(name, r) {
    //var change = get(r, 'translation')
    //console.log( name+ ' x ('+r.translation.x+') y ('+r.translation.y+')' );
  }

});

