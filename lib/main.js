
require('sproutcore');
require('sproutcore-ui');
require('sproutcore-touch');


// TODO: move to different package
UI.Kit = {};

// load all the classes in the project, can be used 
// this loading process can be delegated to other files ( blacklisting.... )
require('sc-uikit/controllers/scroll_view_controller');
require('sc-uikit/views/scroll_view');