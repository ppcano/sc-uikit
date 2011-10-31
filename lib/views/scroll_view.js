var get = SC.get, set = SC.set;


UI.Kit.ScrollView = SC.ContainerView.extend({

  controller: null,

  scrollerId: null,
  listId: null,

  content: null,

  itemViewClass: null, 

  _scrollerView: null,
  _listView: null,

  init: function() {

    this._super();

    var controller = get(this, 'controller');

    if (SC.typeOf(controller) === "string") {

      controller = SC.getPath(controller);
      set(this, 'controller', controller); 

    }

    sc_assert('UI.Kit.ScrollView#controller must be assigned to an instance', !!controller);
    
    set(controller, 'controlledView', this);

  },

  didInsertElement: function() {

    //var controller = get(this, 'controller');
    this._initViews();

  },

  _initViews: function() {

    this._createScrollView();
    this._createListCollectionView();
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


    var parentView = get(this, '_scrollerView')
        , view = null 
        , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews


    // TODO....
    view = SC.CollectionView.create({
      tagName: 'ul',
      classNames: ['list-scroll-view'], 
      elementId: this.listId,
      //var content = SC.getPath(this, 'controller.content'); 
      //content: content,  // must pass the object
      content: this.controller.content,  
      itemViewClass: this.itemViewClass
    });


    childViews.pushObject(view);

    this._listView = view;

  },

  toString: function() { return 'UI.Kit.ScrollView'; }

});