require('sproutcore');

var set = SC.set, get = SC.get;


var max = 100
, i = 0
, name = 'name'
, content = [];


Item = SC.Object.extend({
  position: null,
  name: null

});


CustomArrayController = SC.ArrayController.extend({

  content: null,

  sortedContent:null,

  _orderContent: function() {

    var content = get(this, 'content');

    if ( content ) {

      console.log(' sorting........');
      var result = SC.copy( content );

      result = result.sort( function( a, b ) {
        return a.get('position') - b.get('position');
      }); 

      set(this, 'sortedContent',  result);
      
    }

  }.observes('@each.position')

});


module("Problem ScrollView test", {

  setup: function() {

    console.group(' - Problem: Setup for new test');

  
    App = SC.Application.create({});

    App.arrayController = CustomArrayController.create();
    for(i=0; i<max; i++) {

      // origin for debuggin purpose
      content.push(  Item.create( { position: i, name: name , origin:i} ) ); 
 
    }
    App.arrayController.set('content', content );


    SC.run(function() {

      App.view = SC.CollectionView.create({
        tagName: 'ul',
        contentBinding:'App.arrayController.sortedContent',
        //content: content,
        itemViewClass:  SC.View.extend({
          template: SC.Handlebars.compile('{{content.position}} {{content.name}}')
        })
      });

   });

    SC.run(function() {

      App.view.append();
      console.log( App.view );
    });

  },

  teardown: function() {

    content = [];
    App.view.destroy();
    App.destroy();

    console.groupEnd();
  }  

});


test("adding item should add DOM item", function() {

  var last_position = 1000;

  equals( App.view.$('li').length, max, ' length = max ' );

  console.log(' operation.......');
  SC.run(function() {

     content.insertAt(0, Item.create( { position: last_position, name: name , origin:last_position} ) );

  });

  equals( App.view.$('li').length, max+1, ' length = max+1 ' );
  equals( App.view.$('li').last().text(), last_position+" "+name );

});

test("removing item should remove DOM item", function() {


  equals( App.view.$('li').length, max, ' length = max ' );


  console.log(' operation.......');
  SC.run(function() {

     content.removeAt(0);

  });
  equals( App.view.$('li').length, max-1, ' length = max-1 ' );

});

test("should sort elements view when position changes", function() {

  var last_position = 1000;

  equals( App.view.$('li').length, max, ' length = max ' );
  equals( App.view.$('li').first().text(), "0 "+name );
// this will trigger CollectionView._contentWillChange() and
  // CollectionView._contentDidChange() to rerender the DOM;  

  console.log(' operation.......');
  SC.run(function() {

     content.objectAt(0).set('position', last_position);

  });

//  console.log( SC.getPath('App.arrayController').get('content') );
//  console.log( SC.getPath('App.arrayController').get('sortedContent') );
//  console.log( App.view.$('li') );
  
  equals( App.view.$('li').length, max, ' length = max ' );

  equals( App.view.$('li').first().text(), "1 "+name );
  equals( App.view.$('li').last().text(), last_position+" "+name );


});
