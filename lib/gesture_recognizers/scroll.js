
var get = SC.get;
var set = SC.set;

SC.ScrollGestureRecognizer = SC.Gesture.extend({

  durationRequired: 500,
  //..................................................
  // Private Methods and Properties

  /** @private */
  gestureIsDiscrete: false,

  /** @private */
  _initialLocation: null,

  /** @private */
  _moveThreshold: 10,

  /** @private */
  _initialTimestamp: null,


  shouldBegin: function() {
    return get(this.touches,'length') === get(this, 'numberOfRequiredTouches');
  },

  didBegin: function() {
    this._initialLocation = this.centerPointForTouches(get(this.touches,'touches'));
    this._initialTimestamp = get(this.touches,'timestamp');
  },

  shouldEnd: function() {
    var currentLocation = this.centerPointForTouches(get(this.touches,'touches'));

    var x = this._initialLocation.x;
    var y = this._initialLocation.y;
    var x0 = currentLocation.x;
    var y0 = currentLocation.y;

    var distance = Math.sqrt((x -= x0) * x + (y -= y0) * y);

    var isValidDistance = (Math.abs(distance) < this._moveThreshold);


    var nowTimestamp = get(this.touches,'timestamp');
    var isValidHoldDuration = (nowTimestamp - this._initialTimestamp ) >= this.durationRequired;


    return  isValidDistance && isValidHoldDuration;
  },

  didEnd: function() {

    this._resetCounters();

  },

  didCancel: function() {

    this._resetCounters();

  },

  _resetCounters: function() {

    this._initialLocation = null;
    this._initialTimestamp = null;

  },

  toString: function() {
    return SC.TouchHoldGestureRecognizer+'<'+SC.guidFor(this)+'>';
  }

});

SC.Gestures.register('scroll', SC.ScrollGestureRecognizer);

