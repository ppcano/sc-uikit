var get = SC.get, set = SC.set;


UI.Kit.ScrollView = SC.ContainerView.extend({

  controller: null,

  // must be a string
  content: null,

  
  
  scrollerId: null,
  listId: null,

  itemViewClass: null, 

  _scrollerView: null,
  _scrollerBarView: null,
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

    this._initViews();
  },

  didInsertElement: function() {

    //var controller = get(this, 'controller');
    //this._initViews();

  },

  _initViews: function() {

    this._createScrollView();
    this._createListCollectionView();
//    this._createScrollerBar();
  },



  _createScrollView: function() {

    var parentView = this 
        , view = null 
        , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews

    view = SC.ContainerView.create({

    });

    childViews.pushObject(view);

    set(this, '_scrollerView', view);

  },

  _createListCollectionView: function() {

    var parentView = get(this, '_scrollerView')
        , view = null 
        , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews

    var controller = get(this, 'controller');
    
    var content = get(this, 'content' );
    if (SC.typeOf(content) === "string") {

      content = SC.getPath(content);
      set(this, 'content', content); 

    }
    
    //var content =  get(this, 'itemViewContent') ;
    view = SC.CollectionView.create({
      tagName: 'ul',
      itemViewClass: get(this, 'itemViewClass')
    });

    view.set( 'content', content );

    childViews.pushObject(view);

    set(this, '_listView', view);

  },


  _createScrollerBar: function() {

    var parentView = this 
        , view = null 
        , childViews = get(parentView, 'childViews'); // otherwise return null when parentView.childViews

    view = SC.View.create({

      classNames: ['scrollerbar-scroll-view'],
      height: this.controller.scrollerBarHeight,
      translateY: this.controller.scrollerBarTranslateY,

      // pointer-events: object is no target of mouse event
      template: SC.Handlebars.compile('<div style="pointer-events: none; -webkit-transition-property: -webkit-transform; -webkit-transition-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1); -webkit-transition-duration: 0ms; height: {{this.height}}px; -webkit-transform: translate3d(0px, {{this.translateY}}px, 0px); "></div>')
       

    });

    childViews.pushObject(view);


    this._scrollerBarView = view;

  },
  log: function() {

    console.log( this );
    console.log( get(this, '_listView') );

  }, 

  toString: function() { return 'UI.Kit.ScrollView'; }

});
