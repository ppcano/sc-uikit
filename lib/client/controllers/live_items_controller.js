
var set = SC.set, get = SC.get;


Client.LiveItemsController = SC.ArrayController.extend({

  content: null,

  sortedContent:null,

  _orderContent: function() {

    var content = get(this, 'content');

    if ( content ) {

      var result = SC.copy( content );

      result = result.sort( function( a, b ) {
        return a.get('position') - b.get('position');
      }); 

      var currentSortedContent = get(this, 'sortedContent') 
      if (!currentSortedContent) currentSortedContent = [];

      var i=0 
        , currentMax = currentSortedContent.length
        , max = result.length;

      for ( i=0; i<currentMax; i++) {
          currentSortedContent.popObject();  
      }
      
      for ( i=0; i<max; i++) {
          currentSortedContent.pushObject( result[i] );  
      }

      set(this, 'sortedContent',  currentSortedContent );
      // TODO
      // notifyPropertyChange
      //set(this, 'sortedContent',  result );
      //var current = get(this, 'sortedContent');
      //if ( current ) current.notifyPropertyChange('[]')

    }

  }.observes('@each.position')

});

// TODO: tests
