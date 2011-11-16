var get = SC.get, set = SC.set;

var content = [];

for(i=0; i< 10; i++) {

  content.push( SC.Object.create({name: i + ' ppcano', selected: false, id: i }) );

}

TestView.View1 = SC.Application.create({});
TestView.View1.statechart = SC.Statechart.create({
      
  //monitorIsActive: YES,
  initialState: 'startState',

  startState: SC.State.extend({

    enterState: function(){
      console.log('enter State...');
    },
    selectedItem: function(id){
      console.log('selected item...'+id);
    },
    exitState: function(){
      console.log('enter State...');
    }  

  })
  
});
    
TestView.View1.statechart.initStatechart();

TestView.View1.contentController = SC.ArrayController.create({
  content: content
});

ItemView = SC.View.extend({

  classNameBindings: ['selected'],
/*
  _selected: false,

  selected: function() {
    var value = get(this, '_selected');
    return value;
  }.property('_selected').cacheable(), 
*/
  selectedBinding: 'content.selected',

  // ----- tap events 
  touchHoldOptions: {
    holdPeriod: 600,
    moveThreshold: 10,
    preventDefaultOnChange: true
  },

  touchHoldEnd: function(recognizer) {

    //var value = get(this, '_selected');
    //value = !value;
    //set(this, '_selected', value);

    var id = get(this, 'content').id;
    //console.log(get(this, 'elementId') );
    TestView.View1.statechart.sendAction('selectedItem', id);
  }

});

TestView.View1.footerController = SC.ArrayController.create({
  content: content
});


TestView.View1.ViewController = SC.Object.extend({

  view: null,
  tabViews: null,   
  
  _tabItems: null,
  _currentTabItem: null, 

  _headerView: null,
  _wrapperView: null,
  _footerView: null,

  changeTab: function(i){

    var views = get(this, 'tabViews');
    sc_assert('tabViews has not been configured ', !!views );

    var view = views[i]; 
    sc_assert(' changing to not existing tab', !!view );

    var wrapperView = get(this, '_wrapperView');
    wrapperView.get('childViews').pushObject(view);

    var headerView = get(this, '_headerView');
    headerView.set('headerName', view.tabName);

    var tabItems = get(this, '_tabItems');
    tabItems[i].set('selected', true);

    var currentTabItem = get('this', '_currentTabItem');
    if ( currentTabItem ) {
      currentTabItem[i].set('selected', false);
    }

    set(this, '_currentTabItem', currentTabItem);
  },  

  initViews: function() {

    var footerView, headerView, wrapperView, scrollerView, scrollableView;

    var view = get(this, 'view');
    var childViews = get(view, 'childViews'); 
    var self = this;   

    SC.addObserver(view, 'isInsertedElement' ,function() { 

        var deviceHeight = $(window).height();  
        var headerHeight = $('#header').outerHeight(); 
        var footerHeight = $('#footer').outerHeight(); 
        var availableHeight = deviceHeight - headerHeight - footerHeight; 

        var tabs = get(self, 'tabViews'); 
        tabs.forEach( function(item ) {
          
          set( item, 'contentHeight', availableHeight ); 

        });

        var deviceWidth =  $(window).width();

        // TODO: perhaps better do it on other CSSPropertyBinding on View
        var footer = get(self, '_footerView'); 
        var element = $('#footer ul li'); 

        var borderLeft = element.css('border-left-width'); 
        var borderRight = element.css('border-right-width'); 

        borderLeft = parseInt( borderLeft, 10);
        borderRight = parseInt( borderRight, 10);

        var tabWidth = (deviceWidth/tabs.length)-borderLeft-borderRight; 

        element.width(tabWidth);
    
    });

    headerView = SC.View.create({
        headerName: null,
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

    TabItem = SC.Object.extend({
      name: null,
      selected: false
    });

    var items = [];
    var tabViews = get(this, 'tabViews');
    tabViews.forEach( function( item ) {

      items.pushObject( TabItem.create({name: item.tabName}) );

    });
    set(this, '_tabItems', items);

    footerView = SC.ContainerView.create({
        tagName: 'nav', 
        elementId: 'footer',
        //content: items, 
        //template: SC.Handlebars.compile('<ul>{{#each content}}<li><div {{bindClass class="name" bind="selected" }}>{{name}}</div><div {{bindClass class="img" bind="selected"}}>{{name}}</div></li>{{/each}}</ul>')
        childViews: ['child'],
        child: SC.CollectionView.extend({
          tagName: 'ul', 
          content: items,
          itemViewClass: SC.View.extend({

            touchHoldOptions: {
              holdPeriod: 100
            },

            touchHoldEnd: function(recognizer) {

              console.log( 'touch Hold on view items');

            },

            template: SC.Handlebars.compile('{{#with content}}<div {{bindClass class="name" bind="selected" }}>{{name}}</div><div {{bindClass class="img" bind="selected"}}>{{name}}</div>{{/with}}')

          })
        })
    });

    childViews.pushObject(footerView);
    set(this, '_footerView', wrapperView);

    this.changeTab(0);

  }

});

TabView = SC.Mixin.create({
  tabName: null,  
  contentHeight: 0 

});

var scrollerView = SC.ContainerView.create(TabView, {
  tabName: 'scrollView 1',  
  contentHeight: 0, 

  elementId: 'scroller',
  childViews: ['scrollableView'], 

  

  scrollableView:  UI.Kit.ScrollableView.extend({
    tagName: 'ul',
    classNames:['listview'],
    contentBinding: "TestView.View1.contentController",
    scrollableHeightBinding: 'parentView.contentHeight', 

    itemViewClass:  ItemView.extend({

      classNames:['itemview'],
      templateName: 'sc-uikit/~templates/itemview'

    }) 
  }) 

});

var scrollerView2 = SC.ContainerView.create(TabView, {
  tabName: 'scrollView 2', 
  contentHeight: 0, 

  elementId: 'scroller',
  childViews: ['scrollableView'], 

  scrollableView:  UI.Kit.ScrollableView.extend({
    tagName: 'ul',
    classNames:['listview'],
    contentBinding: "TestView.View1.contentController",
    scrollableHeightBinding: 'parentView.contentHeight', 

    itemViewClass:  ItemView.extend({

      classNames:['itemview'],
      templateName: 'sc-uikit/~templates/itemview2'

    }) 
  }) 

});


TestView.View1.viewController = TestView.View1.ViewController.create({
  tabViews: [scrollerView, scrollerView2, scrollerView ]

});



ControlledView = SC.Mixin.create({
  isInsertedElement: false,

  didInsertElement: function(){
    set(this, 'isInsertedElement', true);
  }

});

TestView.View1.View = SC.ContainerView.extend(ControlledView, {

  elementId: 'main',
  controller: null,

  pepe: null, 


  init: function() {

    this._super();
    this._initController();

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




