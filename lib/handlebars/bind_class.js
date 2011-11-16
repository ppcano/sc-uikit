
SC.Handlebars.registerHelper('bindClass', function(options) {

  var attrs = options.hash;

  var view = options.data.view;
  var ret = [];

  var dataId = ++jQuery.uuid;


  var classBindings = attrs['bind'];
  if (classBindings !== null && classBindings !== undefined) {
    var classResults = SC.Handlebars.bindClasses(this, classBindings, view, dataId);
     
    var class = attrs['class'];

    var item = 'class="';
    if (class !== null && class !== undefined && class.length > 0) {
      var classes = [];
      if (  typeof class === 'string' ) {
        classes.push( class );
      } else {
        classes = class;
      }

      item+=classes.join(' ')+' ';
    }

    item+=classResults.join(' ')+'"';

    ret.push(item);
  }else{

    sc_assert("You must specify bind attribute to bindClass", false);

  }

  ret.push('data-handlebars-id="' + dataId + '"');
  return new SC.Handlebars.SafeString(ret.join(' '));

});
