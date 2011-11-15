
var get = SC.get, set = SC.set;

var content = [];

for(i=0; i< 10; i++) {

  content.push( SC.Object.create({name: i + ' ppcano'}) );
}

TestView.View1 = SC.Application.create({});

TestView.View1.contentController = SC.ArrayController.create({
  content: content
});


ItemView = SC.View.extend({

  classNameBindings: ['selected'],

  _selected: false,

  selected: function() {
    var value = get(this, '_selected');
    return value;
  }.property('_selected').cacheable(), 

  // ----- tap events 
  touchHoldOptions: {
    holdPeriod: 600,
    moveThreshold: 10,
    preventDefaultOnChange: true
  },

  touchHoldEnd: function(recognizer) {

    var value = get(this, '_selected');
    value = !value;
    set(this, '_selected', value);

    //SC.getPath('TestView.View1.contentController').removeAt(5);

  }

});


TestView.View1.ViewController = SC.Object.extend({

  view: null,
  tabViews: null,   

  
  _headerView: null,
  _wrapperView: null,
  _footerView: null,

  changeTab: function(i){

    var views = get(this, 'tabViews');
    var view = views[i];

    var wrapperView = get(this, '_wrapperView');
    wrapperView.get('childViews').pushObject(view);

    var headerView = get(this, '_headerView');
    headerView.set('headerName', view.tabName);

  },  

  initViews: function() {

    var footerView, headerView, wrapperView, scrollerView, scrollableView
        , childViews = get( get(this, 'view') , 'childViews'); 
    
    //template: SC.Handlebars.compile('{{content.position}} {{content.name}}')
    headerView = SC.View.create({
        headerName: 'hola...',
        elementId: 'header',
        template: SC.Handlebars.compile('{{headerName}}')
    });
    childViews.pushObject(headerView);
    set(this, '_headerView', headerView);


    wrapperView = SC.ContainerView.create({
        elementId: 'wrapper'
    });
    childViews.pushObject(wrapperView);
    set(this, '_wrapperView', wrapperView);

    footerView = SC.ContainerView.create({
        elementId: 'footer'
    });
    childViews.pushObject(footerView);
    set(this, '_footerView', wrapperView);

    this.changeTab(1);

  }

});


var scrollerView = SC.ContainerView.create({
  tabName: 'scrollView 1',  // mixins
  elementId: 'scroller',
  childViews: ['scrollableView'], 

  scrollableView:  UI.Kit.ScrollableView.extend({
    tagName: 'ul',
    classNames:['listview'],
    contentBinding: "TestView.View1.contentController",

    itemViewClass:  ItemView.extend({

      classNames:['itemview'],
      templateName: 'sc-uikit/~templates/itemview'

    }) 
  }) 

});

var scrollerView2 = SC.ContainerView.create({

  tabName: 'scrollView 2', 
  elementId: 'scroller',
  childViews: ['scrollableView'], 

  scrollableView:  UI.Kit.ScrollableView.extend({
    tagName: 'ul',
    classNames:['listview'],
    contentBinding: "TestView.View1.contentController",

    itemViewClass:  ItemView.extend({

      classNames:['itemview'],
      templateName: 'sc-uikit/~templates/itemview2'

    }) 
  }) 

});


TestView.View1.viewController = TestView.View1.ViewController.create({
  tabViews: [scrollerView, scrollerView2]

});


TestView.View1.View = SC.ContainerView.extend({

  elementId: 'main',
  controller: null,


  init: function() {

    this._super();
//    this._initViews();
    this._initController();

  },

  didInsertElement: function(){

    var deviceHeight = $(window).height();  
    var headerHeight = $('#header').outerHeight();  
    var footerHeight = $('#footer').outerHeight();  
    var availableHeight = deviceHeight - headerHeight - footerHeight; 

    //  var scrollableView = get(this, '_scrollableView');
    //  set( scrollableView, 'scrollableHeight', availableHeight ); 
    

  },

  _initController: function(){

    var controller = get(this, 'controller');

    if (SC.typeOf(controller) === "string") {
      controller = SC.getPath(controller);
      set(this, 'controller', controller); 
    }

    set(controller, 'view', this);
    controller.initViews();

  },



});


/*
TestView.View1.CollectionView = UI.Kit.ScrollableView.extend({
  tagName: 'ul',
  classNames:['listview'],

  itemViewClass:  ItemView.extend({

    classNames:['itemview'],
    templateName: 'sc-uikit/~templates/itemview'

  }) 

});
*/

/*
// has no sense to be used on html, bug, but seems to be disabled this kind of view creation
TestView.View1.SimpleView = SC.View.extend({
  templateName: 'sc-uikit/~templates/hello'
  //template: SC.Handlebars.compile('Hello ppcanodehuelva.')
});
// that has sense

TestView.View1.simpleView1 = SC.View.create({

  template: SC.Handlebars.compile('Hello ppcanodehuelva.')

});
var view1 = TestView.View1.simpleView1;
SC.run( function() {
  view1.append();
});
console.log( view1.$() );



TestView.View1.simpleView2 = SC.View.create({

  templateName: 'sc-uikit/~templates/hello'

});
var view2 = TestView.View1.simpleView2;
SC.run( function() {
  view2.append();
});
console.log( view2.$() );



// ojo funciona con extend tb
TestView.View1.simpleView3 = SC.View.extend({

  templateName: 'sc-uikit/~templates/hello'

}).create();
var view3 = TestView.View1.simpleView3;
SC.run( function() {
  view3.append();
});
console.log( view3.$() );
*/




