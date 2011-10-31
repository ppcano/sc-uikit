
var get = SC.get, set = SC.set;

UI.Kit.ScrollViewController = UI.ViewController.extend({

  controlledView: null,
  content: null,

  _scrollerView: null,
  _listView: null,

  _itemViews: null,


  init: function() {

    this._stack = [];
    this._itemViews = [];

    if ( !this.scrollerClass ) this.scrollerClass = 'scroller';

  },


  createViews: function() {

    this.controlledView._createScrollView();
    this.controlledView._createListCollectionView();
    //this.controlledView._createListItemViews(this.content);

    //var scrollerView = get(this.controlledView, '_scrollerView');
    //var scrollerView = this.controlledView._scrollerView;
    
   // console.log( scrollerView );
    //console.log('ppcanodehuelva');

  },

  pushView: function(newView,animated) {
    //console.log('UI.NavigationController#pushView'); 

    if (SC.View.detect(newView) === false) {
      throw new Error("UI.NavigationController#pushView only takes SC.View objects");
    }

    var contView = get(this,'controlledView');
    
    // Create instance and append it to DOM
    newView = contView.pushView(newView, animated);

    this._stack.push(newView);
  },

  popView: function(animated) {
    //console.log('UI.NavigationController#popView'); 
    var poppedView = this._stack.pop();
    
    var contView = get(this,'controlledView');
    contView.popView(poppedView,animated);

    return poppedView;
  },

  views: function(key, value) {
    if (value !== undefined) { return; }
    return this._stack.slice(0);
  }.property(),

  destroy: function() {
    var contView = get(this,'controlledView'),
        stack = this._stack,
        len = stack.length;

    for (var i=len-1; i>=0; i--) {
      contView.popView(stack[i],false);
    }

    return this._super();
  }
});


