require('sproutcore');
require('sproutcore-ui');

var set = SC.set, get = SC.get;

var max = 100
, i = 0
, name = 'name'
, controller
, items = [];


// TODO: test failing................................. ( found a better solution for the test )
// inspired : runtime/tests/mixin/array_test.js
CustomObserver = SC.Object.extend({

  willCount: 0,
  didCount: 0,

  arrayWillChange: function() {
    this.willCount++;
  },

  arrayDidChange: function() {
    this.didCount++;
  }

});

CustomController = SC.ArrayController.extend({

  content: null,

  sortedContent:null,

  _orderContent: function() {

    var content = get(this, 'content');

    if ( content ) {

      var result = SC.copy( content );

      result = result.sort( function( a, b ) {
        return a.get('position') - b.get('position');
      }); 

      set(this, 'sortedContent',  result );

      // TODO get(this, 'sortedContent')
      // notifyPropertyChange // contentWillChange // contentDidChange

    }

  }.observes('@each.position')

});

Item = SC.Object.extend({
  position: null,
  name: null
});

function _createObject( position ) {
  return Item.create( { position: position, name: name , origin: position} );
}

module("Live Items Controller test", {

  setup: function() {

    console.group(' - Setup for new test');

    for(i=0; i< max; i++) {
      items.push( _createObject(i) );
    }

    SC.run(function() {

      controller = Client.LiveItemsController.create({
        content: items
      }); 

    });

  },

  teardown: function() {

    items = [];

    controller.destroy();
    console.groupEnd();

  }  

});

test(" should notify only once when removed element from the array ", function() {

  var controller1 = CustomController.create({
    content: items
  }); 

  var observer = CustomObserver.create({});
  
  // this observes simulates the view which observes
  controller1.get('sortedContent').addArrayObserver(observer);


  SC.run(function() { 

    items.removeAt(0);

  });

  equals(observer.didCount, 1, " should be notified once");

});


