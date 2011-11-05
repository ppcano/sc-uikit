require('sproutcore');

var set = SC.set, get = SC.get;

CssPropertyBindings = SC.Mixin.create({

  cssPropertyBindings: null,

  didInsertElement: function(r) {
    this._super();

    var bindings = get(this, 'cssPropertyBindings');

    if (!bindings) { return; }

    bindings.forEach(function(property) {

      var objectValue = get(this, property);
      this.$().css(property, objectValue );

    }, this);


  },

  willInsertElement: function() {
    this._super();

    var bindings = get(this, 'cssPropertyBindings');

    if (!bindings) { return; }

    bindings.forEach(function(property) {

      var observer = function() {

        var objectValue = get(this, property);
        this.$().css(property, objectValue);

      };
      
      SC.addObserver(this, property, observer);

    }, this);

  },

});

module("CSS Property Binding Test", {

  setup: function() {
    console.group(' - Setup for new test');
  },

  teardown: function() {
    console.groupEnd();
  }  

});

test("Can binding css height", function() {

  ItemHeightView = SC.View.extend(CssPropertyBindings, {
    cssPropertyBindings: ['height'],

    height: function() {

      var content = get(this, 'content');
      return  content.get('height');

    }.property('content.height').cacheable(),

    content: null,

    template: SC.Handlebars.compile('{{content.height}}')

  });

  var height = 5;

  var item = SC.Object.create({ 
    height: height
  });

  var view = ItemHeightView.create({
    content: item
  });

  SC.run( function() {
    view.append();
  });
  
  equals( view.$().css('height'), height+'px' );

  height = 200;

  SC.run( function() {
    item.set('height', height);
  });

  equals( view.$().css('height'), height +'px' );


  height = 10;

  SC.run( function() {
    item.set('height', height);
  });

  equals( view.$().css('height'), height +'px' );


  view.destroy();

});

