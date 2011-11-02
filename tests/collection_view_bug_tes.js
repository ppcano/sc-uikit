
require('sproutcore');
require('sproutcore-ui');

var set = SC.set, get = SC.get;


var max = 100
, i = 0
, name = 'ppcanodehuelva'
, content = [];


Item = SC.Object.extend({
  position: null,
  name: null
});

function _createObject( position ) {
  return Item.create( { position: position, name: name , origin: position} );
}

// belongs the content and provides new properties for the views
CustomArrayController = SC.ArrayController.extend({

  content: null,

  sortedContent:null,

  _orderContent: function() {

    var content = get(this, 'content');

    if ( content ) {

      var result = SC.copy( content );
      var currentSortedContent = get(this, 'sortedContent') 

      if (!currentSortedContent) currentSortedContent = [];

      var i=0 
        , currentMax = currentSortedContent.length
        , max = result.length;

      for ( i=0; i<currentMax; i++) {
          currentSortedContent.popObject();  
      }
      
      for ( i=0; i<max; i++) {
          currentSortedContent.pushObject( result[i] );  
      }

      set(this, 'sortedContent',  result );

    }

  }.observes('@each.position')

});


module("Bug: Ordered ScrollView test", {

  setup: function() {

    console.group(' - Setup for new test');


    for(i=0; i< max; i++) {

      content.push( _createObject(i) );

    }


  },

  teardown: function() {

    content = [];

 //   if (App.view ) App.view.destroy();
    //App.destroy();

    console.groupEnd();
  }  

});

test(" collectionview with div tagName updates DOM when content changes ", function() {

    // implements sortedContent
   var controller = CustomArrayController.create({
     content: content
   }); 

  var view = SC.CollectionView.create({
    //elementId: 'id',
    //contentBinding: 'App.controller.sortedContent'
    content: controller.get('sortedContent')
  });

  SC.run(function() {

    view.append();
  
  });

  console.log( view.$('') );
  console.log( view.$('div').length );
 // console.log( view.$('div').length );

  SC.run(function() { 
    
    content.removeAt(0);

  });

  console.log( view.$('div').length );


  SC.run(function() { 
    
    controller.destroy(); 
    view.destroy();

  });
});

test(" collectionview with ul tagName updates DOM when content changes ", function() {

    // implements sortedContent
  var controller = CustomArrayController.create({
    content: content
  }); 

  var view = SC.CollectionView.create({
    tagName: 'ul',
    content: controller.get('sortedContent')
  });

  SC.run(function() {

    view.append();
  
  });

  console.log( view.$('li').length );

  SC.run(function() { 
    
    content.removeAt(0);

  });

  console.log( view.$('li').length );

  SC.run(function() { 
    controller.destroy(); 
    view.destroy();

  });

});
