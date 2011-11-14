
// testing because issue on sproutcore-touch
require('sproutcore');
require('sproutcore-touch');

var set = SC.set, get = SC.get;
var tapEndWasCalled = true;

module("Touching handlebars tests", {

  setup: function() {
    console.group(' - Setup for new test');
    tapEndWasCalled = false
  },

  teardown: function() {
    console.groupEnd();
  }  

});

test("View do not respond when child has not ", function() {

  var application = SC.Application.create();
  var view = SC.CollectionView.create({

    content: [1,2,3,4,6],


    itemViewClass:  SC.View.extend({

      tapOptions: {
        numberOfRequiredTouches: 1
      },

      tapEnd: function(recognizer) {

        tapEndWasCalled = true;

      },
      template: SC.Handlebars.compile('<span> {{content}} </span>')
    })

  });

  SC.run(function(){
    view.append();
  });

  // look for the span element
  var id =view.$().children()[0].id;
  var element = view.$('#'+id +' span');

  var touchEvent;

  touchEvent = new jQuery.Event();
  touchEvent.type='touchstart';
  touchEvent['originalEvent'] = {
    targetTouches: [{
      identifier: 0,
      pageX: 0,
      pageY: 10
    }]
  };

  element.trigger(touchEvent);


  touchEvent = new jQuery.Event();
  touchEvent.type='touchend';
  touchEvent['originalEvent'] = {
    changedTouches: [{ 
      identifier: 0,
      pageX: 0, 
      pageY: 10 
    }]
  };

  element.trigger(touchEvent);

  ok(tapEndWasCalled, 'tap end should have been called');

  view.destroy();
  application.destroy();

});

