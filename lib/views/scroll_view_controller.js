var get = SC.get, set = SC.set;

//UI.Kit.ScrollViewController = UI.ViewController.extend({
UI.Kit.ScrollViewController = SC.Object.extend({

  controlledView: null,

  // observes content and modified it
  // content is a KVO arrayproxy 
  content: null, 

  scrollerBarHeight: 75,
  scrollerBarTranslateY: 200


});


