
require('sproutcore');
require('sproutcore-ui');
require('sc-uikit')

var set = SC.set, get = SC.get;


var max = 100
, i = 0
, name = 'ppcanodehuelva'
, content = [];




CustomArrayController = SC.ArrayController.extend({

  content: null,

  sortedContent:null,

  _orderContent: function() {

    var content = get(this, 'content');

    if ( content ) {

      var result = SC.copy( content );

      result = result.sort( function( a, b ) {
        return a.get('position') - b.get('position');
      }); 

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

      set(this, 'sortedContent',  currentSortedContent );

// TODO
//      notifyWillChange
//      set(this, 'sortedContent',  result );
//      notifyDidChange

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




    //SC.run(function() {

      App.scrollViewController = UI.Kit.ScrollViewController.create({
        //contentBinding: 'App.controller.sortedContent' 
        //contentBinding: 'App.contentController' 
      });

    //});


    //App.view = CustomView.create({
    App.view = UI.Kit.ScrollView.create({
       elementId:"scroll_view",
       myContent: 'App.controller.sortedContent', 
       //itemViewContent: SC.getPath('App.controller.sortedContent'), 
       itemViewClass:  SC.View.extend({
         template: SC.Handlebars.compile('{{content.position}} {{content.name}}')
       }), 

       controller:"App.scrollViewController"
    });

    SC.run(function() {

      App.view.append();

      console.log( App.view );

    });

  },

  teardown: function() {

    content = [];

    //App.contentController.destroy();
    //App.scrollViewController.destroy();

    App.view.destroy();
    App.destroy();

    console.groupEnd();
  }  

});

test("should remove an item in DOM when removed an item from the content ", function() {

  equals(App.view.$('div ul li').length, max, " there are number of li === max");

  SC.run(function() { 

    var c = content;
    c.removeAt(0);

  });


  equals(App.view.$('div ul li').length, max-1, " there are number of li === max");


});

test("should sort elements view when position changes", function() {

  var last_position = 1000;

  equals( App.view.$('div ul li').length, max, ' length = max ' );
  equals( App.view.$('div ul li').first().text(), "0 "+name );

  SC.run(function() {

     content.objectAt(0).set('position', last_position);

  });


  equals( App.view.$('div ul li').length, max, ' length = max ' );
  equals( App.view.$('div ul li').first().text(), "1 "+name );
  equals( App.view.$('div ul li').last().text(), last_position+" "+name );



});

test("should render a li element for each item in content", function() {


  equals(App.view.$('div ul li').length, max, " there are number of li === max");

});

test("should add an item in DOM when added an item from the content ", function() {


  //equals(SC.getPath('App.view._listView.content').length, max, " there are items === max");

  equals(App.view.$('div ul li').length, max, " there are number of li === max");


  SC.run(function() { 
    
      var c = content;
      c.insertAt(1, _createObject(100) );

  });



  equals(App.view.$('div ul li').length, max+1, " there are number of li === max");


});

/*
test("should insert scrollbar", function() {

  console.log( $('#scroll_view ') );

    var value = 1000;
    SC.run(function() {
      
      
      App.scrollViewController.set('scrollerBarHeight', value);
      App.scrollViewController.set('scrollerBarTranslateY', value);

    });

    console.log( $('#scroll_view .scrollerbar-scroll-view').css('-webkit-transition-property') );
});




*/



/*
TODO: test on this way 
    mainView = SC.View.create(UI.LayoutSupport, {
      elementId: 'mainview',
      anchorTo: 'remainingSpace',
      template: SC.Handlebars.compile('{{#view UI.Kit.ScrollView elementId="scroll_view" controller="App.scrollViewController"}}\
                                       {{/view}}')

    });
*/
