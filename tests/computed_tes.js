
require('sproutcore');

var set = SC.set, get = SC.get;


var max = 100
, i = 0
, name = 'name'
, controller
, content = [];

Item = SC.Object.extend({
  position: null,
  name: null
});


CustomArrayController = SC.ArrayController.extend({

  counter: 0,
  content: [],


  numberOfFiredEvents: function() {

    var counter = get(this, 'counter');
    counter++;
    set(this, 'counter', counter);

    console.log( 'firing .........sorting...');

    return counter;

  }.property('@each.position').cacheable()

});

module("Array Firing test", {

  setup: function() {

    console.group(' - Problem: Setup for new test');

    for(i=0; i<max; i++) {
      content.push(  Item.create( { position: i, name: name , origin:i} ) ); 
    }

    controller = CustomArrayController.create();
    controller.set('content', content );

  },

  teardown: function() {

    content = [];
    console.groupEnd();
  }  

});

test("updating position fires only once", function() {


  equals( controller.get('numberOfFiredEvents'), 1, ' computed property fired because content has been set up ');

  SC.run(function() {

     content.insertAt(0, Item.create( { position: 123123, name: name , origin:1234123} ) );

  });
  
  equals( controller.get('numberOfFiredEvents'), 2, ' counter should only be fired one time more ');

});

test("removing item should remove DOM item", function() {



  equals( controller.get('numberOfFiredEvents'), 1, ' computed property fired because content has been set up ');

  SC.run(function() {

     content.removeAt(0);

  });

  equals( controller.get('numberOfFiredEvents'), 2, ' counter should only be fired one time more ');

});

test("updating position fires only once", function() {



  equals( controller.get('numberOfFiredEvents'), 1, ' computed property fired because content has been set up ');

  SC.run(function() {

     content.objectAt(0).set('position', 1242);

  });

  equals( controller.get('numberOfFiredEvents'), 2, ' counter should only be fired one time more ');

});
