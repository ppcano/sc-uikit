require('sproutcore');
require('sproutcore-ui');
require('sc-uikit');

var set = SC.set, get = SC.get;

var max = 100
, i = 0
, name = 'object_name'
, content = [];

Item = SC.Object.extend({
  position: null,
  name: null
});

function _createObject( position ) {
  return Item.create( { position: position, name: name , origin: position} );
}


module("CollectionView with LiveItemController test", {

  setup: function() {

    console.group(' - Setup for new test');

    for(i=0; i< max; i++) {
      content.push( _createObject(i) );
    }

  },

  teardown: function() {

    content = [];
    console.groupEnd();

  }  

});

test(" collectionview  updates DOM when added content ", function() {

  var controller = Client.LiveItemsController.create({
    content: content
  }); 

  var view = SC.CollectionView.create({
    tagName: 'ul',
    content: controller.get('sortedContent')
  });

  SC.run(function() {

    view.append();
  
  });

  equals( view.$('li').length, max );

  SC.run(function() { 
    
    content.insertAt(_createObject(1000));

  });

  equals( view.$('li').length, max+1 );

  SC.run(function() { 
    controller.destroy(); 
    view.destroy();

  });

});

test(" collectionview with ul tagName updates DOM when removing item ", function() {

    // implements sortedContent
  var controller = Client.LiveItemsController.create({
    content: content
  }); 

  var view = SC.CollectionView.create({
    tagName: 'ul',
    content: controller.get('sortedContent')
  });

  SC.run(function() {

    view.append();
  
  });

  equals( view.$('li').length, max );

  SC.run(function() { 
    
    content.removeAt(0);

  });

  equals( view.$('li').length, max-1 );

  SC.run(function() { 
    controller.destroy(); 
    view.destroy();

  });

});


test(" collectionview  sorts position when updates position", function() {

  var controller = Client.LiveItemsController.create({
    content: content
  }); 

  var view = SC.CollectionView.create({
    tagName: 'ul',
    content: controller.get('sortedContent'),

    itemViewClass:  SC.View.extend({
      template: SC.Handlebars.compile('{{content.position}} {{content.name}}')
    }) 

  });

  SC.run(function() {

    view.append();
  
  });

  equals( view.$('li').first().text(), "0 "+name );


  var position = 1000;
  SC.run(function() { 
    
    content.objectAt(0).set('position', position);

  });


  equals( view.$('li').first().text(), "1 "+name );
  equals( view.$('li').last().text(), position+" "+name );


  SC.run(function() { 
    controller.destroy(); 
    view.destroy();

  });

});

