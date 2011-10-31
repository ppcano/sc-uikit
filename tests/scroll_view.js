
require('sproutcore');
require('sproutcore-ui');
require('sc-uikit')

var set = SC.set;
var get = SC.get;


var max = 100
, i = 0
, content = [];


module("ScrollView test", {

  setup: function() {

    console.group(' - Setup for new test');

    // App: must be global var, to be reached via getPath
    App = SC.Application.create({});

    for(i=0; i< max; i++) {
      content.push( SC.Object.create( { position: i, name: 'ppcanodehuelva' } ) );

    }

    App.contentController = SC.ArrayController.create({
      content: content
    });


    SC.run(function() { // require for applying the binding

      App.scrollViewController = UI.Kit.ScrollViewController.create({
        contentBinding: 'App.contentController.content' 
      });

    });

    App.mainView = UI.Kit.ScrollView.create({
       elementId:"scroll_view",

       itemViewClass:  SC.View.extend({
         template: SC.Handlebars.compile('{{content.position}} {{content.name}}')
       }), 

       controller:"App.scrollViewController"
    });


    SC.run(function() {

      App.mainView.append();

    });

  },

  teardown: function() {

    content = [];

    //App.contentController.destroy();
    //App.scrollViewController.destroy();

    App.mainView.destroy();
    App.destroy();

    console.groupEnd();
  }  

});

test("should render a li element for each item in content", function() {

  //console.log( App.mainView.$('div ul li') );

  equals($('#scroll_view div ul li').length, max, " there are number of li === max");

  equals(App.mainView.$('div ul li').length, max, " there are number of li === max");

});

test("should remove an item in DOM when removed an item from the content ", function() {


  //equals(SC.getPath('App.mainView._listView.content').length, max, " there are items === max");

  equals(SC.getPath('App.scrollViewController.content').length, max, " there are items === max");
  equals(App.mainView.$('div ul li').length, max, " there are number of li === max");


  SC.run(function() { 

      content.insertAt(1, SC.Object.create( { position: 100, name: 'ppcanodehuelva' } ) );

  });


  equals(SC.getPath('App.scrollViewController.content').length, max+1, " there are items === max");

  equals(App.mainView.$('div ul li').length, max+1, " there are number of li === max");


});

test("should remove an item in DOM when removed an item from the content ", function() {


  equals(SC.getPath('App.scrollViewController.content').length, max, " there are items === max");

  equals(App.mainView.$('div ul li').length, max, " there are number of li === max");


  SC.run(function() { // require for applying the binding

    content.removeAt(1);

  });


  equals(SC.getPath('App.scrollViewController.content').length, max-1, " there are items === max");

  equals(App.mainView.$('div ul li').length, max-1, " there are number of li === max");


});



/*
TODO: test on this way 
    mainView = SC.View.create(UI.LayoutSupport, {
      elementId: 'mainview',
      anchorTo: 'remainingSpace',
      template: SC.Handlebars.compile('{{#view UI.Kit.ScrollView elementId="scroll_view" controller="App.scrollViewController"}}\
                                       {{/view}}')

    });
*/
