require('sproutcore');

var set = SC.set, get = SC.get;

var max = 100
, i = 0
, name = 'name'
, controller
, content = [];

Item = SC.Object.extend({
  position: null,
  enabled: true,
  voted: true,
  name: null
});

ItemView = SC.View.extend({

  classNameBindings: ['isEnabled', 'isVoted'],
  content: null,

  isEnabled: function() {

    var content = get(this, 'content');
    return  content.get('enabled');

  }.property('content.enabled').cacheable(),

  isVoted: function() {

    var content = get(this, 'content');
    return  content.get('voted');

  }.property('content.voted').cacheable(),

  template: SC.Handlebars.compile('{{content.position}} {{content.name}}')

});


module("Array Firing test", {

  setup: function() {
    console.group(' - Problem: Setup for new test');
  },

  teardown: function() {
    console.groupEnd();
  }  

});

test("updating position fires only once", function() {

  var item = Item.create({ 
    position: 5, 
    name: name , 
    voted: true,
    enabled: true
  });

  var view = ItemView.create({
    tagName: 'li',
    content: item
  });

  view.createElement();

  ok( view.$().hasClass('is-voted') );
  ok( view.$().hasClass('is-enabled') );

  SC.run( function(){

      item.set('enabled', false );

      item.set('voted', false );

  });

  ok( !view.$().hasClass('is-voted') );
  ok( !view.$().hasClass('is-enabled') );

  view.destroy();

});

