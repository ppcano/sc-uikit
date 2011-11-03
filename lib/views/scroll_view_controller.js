var get = SC.get, set = SC.set;

UI.Kit.ScrollViewController = UI.ViewController.extend({

  controlledView: null,

  // observes content and modified it
  // content is a KVO arrayproxy 
  content: null, 

  scrollerBarHeight: 75,
  scrollerBarTranslateY: 200


});


