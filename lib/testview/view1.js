
var get = SC.get, set = SC.set;

var content = [];

for(i=0; i< 10; i++) {
  content.push( SC.Object.create({name: i + ' ppcano'}) );
}

TestView.View1 = SC.Application.create({});

TestView.View1.contentController = SC.ArrayController.create({
  content: content
});


TestView.View1.ItemView2 = SC.View.extend({

});

ItemView = SC.View.extend({

  classNameBindings: ['selected'],

  _selected: false,

  selected: function() {
    var value = get(this, '_selected');
    return value;
  }.property('_selected').cacheable(), 

  // ----- tap events 
  touchHoldOptions: {
    holdPeriod: 600,
    moveThreshold: 10,
    preventDefaultOnChange: true
  },

  touchHoldEnd: function(recognizer) {

    var value = get(this, '_selected');
    value = !value;
    set(this, '_selected', value);

  }

});

TestView.View1.CollectionView1 = SC.CollectionView.extend({

});

CollectionView = SC.CollectionView.extend({
  
  positionY: 0,

  _availableHeight: 0, 
  _distance: 0,

  _startTimestamp: 0,

  // options
  __animationDuration: 1000,
  __easing: "easeOutExpo",  

  // options elastic
  __velocity: 0.2, 

  panOptions: {
    numberOfRequiredTouches: 1,
    preventDefaultOnChange: true
  },

  didInsertElement: function() {

    // TODO: UIControllerView
    var deviceHeight = $(window).height();  
    var headerHeight = $('#header').outerHeight();  
    var footerHeight = $('#footer').outerHeight();  
    var availableHeight = deviceHeight - headerHeight - footerHeight; 

    this._availableHeight = availableHeight;

  },

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

    var translationY = this.__velocity*distance/time * this.$().outerHeight('');

    this._transformPosition( translationY );

    var op = (translationY < 0)? '-' : '+';
    var value = Math.abs(translationY);
    this.$().animate({
      translateY: '%@=%@'.fmt(op ,value)
    }, this.__animationDuration,  this.__easing);

  },

  // add pixels to current position
  _transformPosition: function(positionY) {

    var result = get(this, 'positionY');
    result+= positionY*(-1);
    set(this,'positionY', result);

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
    var maxHeight = totalHeight - this._availableHeight;

    var positionY = get(this, 'positionY');

    var newPositionY = undefined;
    if (positionY < 0  ) {
      newPositionY = 0;
    } else if ( positionY > maxHeight ) {
      newPositionY = maxHeight;
    }

    if ( newPositionY !== undefined ) {

      this.$().animate({
        translateY: '-%@'.fmt(newPositionY)
      }, this.__animationDuration,  this.__easing);

      set(this,'positionY', newPositionY);

//      console.log( 'correncting.... '+ get(this, 'positionY') );
    } 
    

  },

  _debugRecognizer: function(r) {

    //var change = get(r, 'translation')
 //   console.log( 'x ('+r.translation.x+') y ('+r.translation.y+')' );
    
  },

  itemViewClass:  ItemView.extend({

    classNames:['itemview'],
    templateName: 'sc-uikit/~templates/itemview'

  }) 

});


TestView.View1.CollectionView = CollectionView.extend({
  tagName: 'ul',
  classNames:['listview']
});

/*
// has no sense to be used on html, bug, but seems to be disabled this kind of view creation
TestView.View1.SimpleView = SC.View.extend({
  templateName: 'sc-uikit/~templates/hello'
  //template: SC.Handlebars.compile('Hello ppcanodehuelva.')
});
// that has sense

TestView.View1.simpleView1 = SC.View.create({

  template: SC.Handlebars.compile('Hello ppcanodehuelva.')

});
var view1 = TestView.View1.simpleView1;
SC.run( function() {
  view1.append();
});
console.log( view1.$() );



TestView.View1.simpleView2 = SC.View.create({

  templateName: 'sc-uikit/~templates/hello'

});
var view2 = TestView.View1.simpleView2;
SC.run( function() {
  view2.append();
});
console.log( view2.$() );



// ojo funciona con extend tb
TestView.View1.simpleView3 = SC.View.extend({

  templateName: 'sc-uikit/~templates/hello'

}).create();
var view3 = TestView.View1.simpleView3;
SC.run( function() {
  view3.append();
});
console.log( view3.$() );
*/




