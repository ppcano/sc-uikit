
require('sproutcore');
require('sproutcore-ui');
require('sc-uikit')

var set = SC.set;
var get = SC.get;

var mainView;

var max = 100
, i = 0
, content = [];


module("ScrollView test", {

  setup: function() {

    console.group('ScrollView Test - Setup for new test');

    // App: must be global var, to be reached via getPath
    App = SC.Application.create({});


    for(i=0; i< max; i++) {
      content.push( SC.Object.create({ position:i, name: 'ppcanodehuelva' } ) );
    }

    App.contentController = SC.ArrayController.create({
      content: content
    });


    SC.run(function() { // require for applying the binding

      App.scrollViewController = UI.Kit.ScrollViewController.create({
        contentBinding: 'App.contentController.content' 
      });

    });

    mainView = UI.Kit.ScrollView.create({
       elementId:"scroll_view",

       itemViewClass:  SC.View.extend({
         template: SC.Handlebars.compile('{{content.position}} {{content.name}}')
       }), 

       controller:"App.scrollViewController"
    });


    SC.run(function() {

      mainView.append();

    });

  },

  teardown: function() {
    mainView.destroy();

    App.destroy();

    console.groupEnd();
  }  

});

test("Properties has been assigned..........", function() {

  console.log( $('#scroll_view div ul li').length );

  equals($('#scroll_view div ul li').length, max, " there are number of li === max");

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
