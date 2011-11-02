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

CustomView = SC.ContainerView.extend({

    _wrapperView:null, 

    init: function() {

      this._super();
      this._createContainerView();
      this._createChildView(); 
    },

    _createContainerView: function(){

      var parentView = this 
          , view = null 
          , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews

      var view = SC.ContainerView.create({
      });

      childViews.pushObject(view);

      set(this, '_wrapperView', view);
    },

    _createChildView: function(){

      //var parentView = this 
      var parentView = get(this, '_wrapperView')
          , view = null 
          //, content = get(this, 'content')
          , content = SC.getPath( get(this, 'myContent' ) )
          , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews

      var view = SC.CollectionView.create({
      });
      view.set('content', content);
      //view.set('content', SC.geth(this, 'myContent') );

      childViews.pushObject(view);

    }
});


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

      console.log( 'sorting...... ' +result.length );
      //this.enumerableContentWillChange(null, null);
      //sortedContent.contentWillChange();
      
      //set(this, 'sortedContent',  currentSortedContent );
      set(this, 'sortedContent',  result );

      //sortedContent.contentDidChange();
      
      //this.enumerableContentDidChange(null, null);

    }

  }.observes('@each.position')

});

module("ScrollView test", {

  setup: function() {

    console.group(' - Setup for new test');

    App = SC.Application.create({});
    // App: must be global var, to be reached via getPath

    for(i=0; i< max; i++) {

      content.push( _createObject(i) );

    }

    App.controller = CustomArrayController.create({
      content: content
    }); 


    App.view = CustomView.create({
      //myContent: 'App.controller.content'
      myContent: 'App.controller.sortedContent'
      //content: 'App.controller.content'
      //content: content
    });


    SC.run(function() {

      App.view.append();
    
    });

  },

  teardown: function() {

    content = [];


    App.view.destroy();
    App.destroy();

    console.groupEnd();
  }  

});

test("should remove an item in DOM when removed an item from the content ", function() {


  //console.log( App.view.$() );
  console.log( App.view.$('div div').length );
  console.log( 'before modigyg.........here' );

  SC.run(function() { 
    
    var c = content;
    c.removeAt(0);

  });

  console.log( 'after modigyg.........here' );

  //console.log( App.view.$() );
  console.log( App.view.$('div div').length );


});
