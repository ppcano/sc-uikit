
require('sproutcore');
require('sproutcore-ui');
require('sproutcore-touch');
require('sproutcore-statechart');

// importing instead of packages
require('sc-uikit/import/jquery.easing.1.3');

// TODO: move to different package
//UI = {};
UI.Kit = {};

PG = {};
require('sc-uikit/mixins/phone_gap_events');


require('sc-uikit/handlebars/bind_class');
// load all the classes in the project, can be used 
// this loading process can be delegated to other files ( blacklisting.... )
require('sc-uikit/views/scroll_view_controller');
require('sc-uikit/views/scroll_view');
require('sc-uikit/views/scrollable_view');

Client = {};
require('sc-uikit/client/controllers/live_items_controller');

TestView = {};
require('sc-uikit/testview/view1');

//require('sc-uikit/gesture_recognizers/touch_hold');
//require('sc-uikit/gesture_recognizers/scroll');

