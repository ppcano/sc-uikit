require('sproutcore');
require('sproutcore-ui');
require('sc-uikit')

var set = SC.set, get = SC.get;

var max = 100
, i = 0
, name = 'name'
, controller
, items = [];

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

test(" should notify only once when removed element from the list ", function() {

  var controller1 = Client.LiveItemsController.create({
    content: items
  }); 

  var observer = CustomObserver.create({});
  controller1.get('sortedContent').addArrayObserver(observer);


  SC.run(function() { 

    items.removeAt(0);

  });


  equals(observer.didCount, 1, " should be notified once");

});

test("should sort elements view when position changes", function() {




});


test("should add an item in DOM when added an item from the content ", function() {



});

