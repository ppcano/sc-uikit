
var get = SC.get;
var set = SC.set;


UI.Kit._collectionScrollView = SC.View.extend({
    template: SC.Handlebars.compile('{{content.position}} {{content.name}}')
}); 


UI.Kit.ScrollView = SC.ContainerView.extend({

  controller: null,

  scrollerId: null,
  listId: null,
  content: null,

  _scrollerView: null,
  _listView: null,

  init: function() {

    this._super();

    var controller = get(this, 'controller');

    if (SC.typeOf(controller) === "string") {

      controller = SC.getPath(controller);
      set(this, 'controller', controller); 

    }

    set(controller, 'controlledView', this);

  },

  didInsertElement: function() {

    var controller = get(this, 'controller');
    controller.createViews();

  },

  _createListItemViews: function(content) {

    var item, i;

    console.log( content );

    for( i=0; i<content.length; i++  ) {
      //console.log( content[i].position );
      this.pushItemView( content[i] );

    }

  },

  _createScrollView: function() {

    var parentView = this 
        , view = null 
        , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews

    view = SC.ContainerView.create({
      classNames: ['scroll-scroll-view'], 
      elementId: this.scrollerId
    });

    childViews.pushObject(view);

    this._scrollerView = view;

  },

  _createListCollectionView: function() {

    var controller = get(this, 'controller');
    //var parentView = this._scrollerView
    var parentView = get(this, '_scrollerView')
        , view = null 
        , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews

// TODO....
    view = SC.CollectionView.create({
      tagName: 'ul',
      classNames: ['list-scroll-view'], 
      elementId: this.scrollerId,
      contentBinding: 'App.Coo.contentController',
      itemViewClass: UI.Kit._collectionScrollView
      //template: SC.Handlebars.compile('ppcanodehuelva')
    });

    childViews.pushObject(view);

    this._listView = view;

  },

  _createListView: function() {

    //var parentView = this._scrollerView
    var parentView = get(this, '_scrollerView')
        , view = null 
        , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews

    view = SC.ContainerView.create({
      tagName: 'ul',
      //classNames: ['list-scroll-view'], 
      classNames: null, 
      elementId: this.scrollerId
    });

    childViews.pushObject(view);

    this._listView = view;

  },

  pushItemView: function(item) {
    
    var parentView = get(this, '_listView')
        , childViews = get(parentView, 'childViews')
        , view;

    view = SC.View.create({

      item: item,

      template: SC.Handlebars.compile('<li>{{item.position}}</li>')

    });


    childViews.pushObject(view);

  },

  popView: function(view,animated) {
    
    view.destroy();
  },

  toString: function() { return 'UI.Kit.ScrollView'; }

});
