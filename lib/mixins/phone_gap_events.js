var get = SC.get, set = SC.set;

PG.PhoneGapEvents = SC.Mixin.create({

  phoneGapEvents: {
      deviceready: 'deviceReady',  
      pause: 'pause',  
      resume: 'resume',  
      online: 'online',  
      offline: 'offline',  
      backbutton: 'backButton',  
      menubutton: 'menuButton',  
      searchbutton: 'searchButton'
  },

  ready: function(){

    this._super();

    var rootElement = get(this, 'rootElement');
    var phoneGapEvents = get(this, 'phoneGapEvents'); 

    for (event in phoneGapEvents) {
      if (phoneGapEvents.hasOwnProperty(event)) {
        this._setupPhoneGapEventHandler(rootElement, event, phoneGapEvents[event]);
      }
    }
    
  }, 

  _setupPhoneGapEventHandler: function(doc, pgEventName, scEventName){

    var self = this;
    document.addEventListener( pgEventName, function(){
        
        var wasCalled = false;

        var statechart = get(self, 'statechart');
        if ( statechart ) {                      
          var output = statechart.sendAction(scEventName);
          wasCalled = (output!==null);
        } 

        if ( !wasCalled ) {  
          var handler = self[scEventName];
          if (SC.typeOf(handler) === 'function') {
            handler.call();
            wasCalled = true;
          }
        }

    }, false);
  }

});
